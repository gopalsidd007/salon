import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import CustomLoader from '../../CustomComponents/loader/CustomLoader'
import HttpClient from '../../utils/HttpClient'
import toast from 'react-hot-toast'

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "15px",
    fontWeight: "bold"

}

const EditJob = () => {
    const location = useLocation()
    console.log("nbvg5465", location?.state._id)
    const [isLoading, setIsLoading] = useState(false);
    // const [isEdit, setIsEdit] = useState(false);
    //const [EmpData, setEmpData] = useState([]);
    const initValue = {
        "jobTitle": location?.state?.jobTitle,
        "designation": location?.state?.designation,
        "description": location?.state?.designation,
        "employmentType": location?.state?.employmentType,
        "keySkills": location?.state?.keySkills,
        "role": location?.state?.role,
        "jobLocation": location?.state?.jobLocation,
        "qualification": location?.state?.qualification,
        "experience": location?.state?.experience,
        "salary": location?.state?.salary,
        "openings": location?.state?.openings

    }
    const [formValue, setFormValue] = useState(initValue);
    const [workmode, setWorkmode] = useState(location?.state?.workMode);
    const navigate = useNavigate()



    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'salary' && parseInt(value) < 0) {
            // If the entered value for salary is less than 1, set it to 1
            setFormValue(prev => ({ ...prev, [name]: '0' }));
        } else {
            setFormValue(prev => ({ ...prev, [name]: value }));
        }
    }
    const handleWorkmodeChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            if (workmode.length >= 2) {
                // If already two checkboxes are selected, prevent further selection
                toast.error("You can't select more than two options.");
                e.preventDefault(); // Prevent checkbox from being checked
            } else {
                setWorkmode((prevWorkmode) => [...prevWorkmode, value]);
            }
        } else {
            setWorkmode((prevWorkmode) => prevWorkmode.filter((mode) => mode !== value));
        }
    };

    // VALIDATION
    const validate = () => {
        if (!formValue?.jobTitle) {
            toast.error("Job Title is required");
            return true
        }
        if (!formValue?.designation) {
            toast.error("designation is required");
            return true
        }
        if (!formValue?.description) {
            toast.error("description is required");
            return true
        }


        if (!formValue?.employmentType) {
            toast.error("Employment Type is required");
            return true
        }
        if (!formValue?.keySkills) {
            toast.error("keySkills is required");
            return true
        }
        if (!formValue?.role) {
            toast.error("role is required");
            return true
        }
        if (workmode?.length === 0) {
            toast.error("workmode is required");
            return true
        }
        // if (!formValue?.jobLocation) {
        //     toast.error("jobLocation is required");
        //     return true
        // }
        if (!formValue?.qualification) {
            toast.error("qualification is required");
            return true
        }
        if (!formValue?.experience) {
            toast.error("experience is required");
            return true
        }
        if (!formValue?.salary) {
            toast.error("salary is required");
            return true
        }
        if (!formValue?.openings) {
            toast.error("openings is required");
            return true
        }



        return false
    }

    //SUBMIT THE DATA
    const handleSubmit = async (e) => {
        e.preventDefault();
        //check validation
        if (validate()) {
            return
        }


        const data = {
            "jobTitle": formValue?.jobTitle,
            "designation": formValue?.designation,
            "description": formValue?.description,
            "employmentType": formValue?.employmentType,
            "keySkills": formValue?.keySkills,
            "role": formValue?.role,
            "workMode": workmode,
            "jobLocation": formValue?.jobLocation,
            "qualification": formValue?.qualification,
            "experience": formValue?.experience,
            "salary": formValue?.salary,
            "openings": formValue?.openings,
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("edit-job/" + location?.state._id, "PUT", data);
        if (res && res?.status) {
            toast.success("Added Successfully");
            setFormValue(initValue);
            setIsLoading(false);
            navigate("/view-job")
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }

    }
    return (
        <div>

            <CustomLoader loading={isLoading} />


            <div className="d-flex justify-content-end">

                <div className="form-header">
                    <section className="piechartsBox_area">
                        <div
                            style={headLineStyle}
                            className="page-headline"
                        >
                            Edit Job description <hr />
                        </div>




                        <form>
                            <div className="row">



                                <div className="col-md-6 mt-2 ">
                                    <label htmlFor="formGroupExampleInput">Job title :<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Title"
                                        name="jobTitle"
                                        value={formValue.jobTitle}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6 mt-2 ">
                                    <label htmlFor="formGroupExampleInput">Designation :<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Designation name"
                                        name="designation"
                                        value={formValue.designation}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Position Description :<span className="text-danger">&nbsp;*</span></label>
                                    <textarea
                                        type="text"
                                        rows="4"
                                        className="form-control"
                                        placeholder="description of the job"
                                        name="description"
                                        autocomplete="off"
                                        value={formValue?.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* RADIO */}
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Employment Type (select one) :<span className="text-danger">&nbsp;*</span></label>

                                    <div className=' d-flex'>
                                        <div>
                                            <input
                                                type="checkbox"
                                                id="FullTime"
                                                name="employmentType"
                                                value="FullTime"
                                                checked={formValue.employmentType === 'FullTime'}
                                                autoComplete="off"
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="FullTime" className='mx-1'>Full Time</label>
                                        </div>

                                        <div className=' mx-4'>
                                            <input
                                                type="checkbox"
                                                id="PartTime"
                                                name="employmentType"
                                                value="PartTime"
                                                checked={formValue.employmentType === 'PartTime'}
                                                autoComplete="off"
                                                onChange={handleChange}
                                            />
                                            <label htmlFor="partTime" className='mx-1'>Part Time</label>
                                        </div>
                                    </div>
                                </div>
                                {/* keySkills */}
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Skills :<span className="text-danger">&nbsp;*</span></label>
                                    <textarea
                                        type="number"
                                        className="form-control"
                                        placeholder="Skill set"
                                        name="keySkills"
                                        value={formValue?.keySkills}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* role */}
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Responsibilities :<span className="text-danger">&nbsp;*</span></label>
                                    <textarea

                                        className="form-control"
                                        placeholder='Job roles/responsibilities'
                                        name="role"
                                        value={formValue?.role}
                                        onChange={handleChange}
                                    />

                                </div>
                                {/* Workmode radio */}
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Workmode (select max two) :<span className="text-danger">&nbsp;*</span></label>
                                    <div className=' d-flex '>
                                        <div >
                                            <input
                                                type="checkbox"
                                                id="Work From Home"
                                                name="Workmode"
                                                value="Work From Home"
                                                checked={workmode.includes('Work From Home')}
                                                autoComplete="off"
                                                onChange={handleWorkmodeChange}
                                            />
                                            <label htmlFor="WorkFromHome" className='mx-1'>Work from home</label>
                                        </div>

                                        <div className="mx-3">
                                            <input
                                                type="checkbox"
                                                id="On Site"
                                                name="Workmode"
                                                value="On Site"
                                                checked={workmode.includes('On Site')}
                                                autoComplete="off"
                                                onChange={handleWorkmodeChange}
                                            />
                                            <label htmlFor="onSite" className='mx-1'>On site</label>
                                        </div>

                                        <div className="mx-3">
                                            <input
                                                type="checkbox"
                                                id="Hybrid"
                                                name="Workmode"
                                                value="Hybrid"
                                                checked={workmode.includes('Hybrid')}
                                                autoComplete="off"
                                                onChange={handleWorkmodeChange}
                                            />
                                            <label htmlFor="hybrid" className='mx-1'>Hybrid</label>
                                        </div>
                                    </div>

                                </div>
                                {/* location */}
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Job location :</label>
                                    <textarea

                                        className="form-control"
                                        placeholder="Location"
                                        name="jobLocation"
                                        value={formValue?.jobLocation}
                                        onChange={handleChange}
                                    />

                                </div>
                                {/* location */}
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Qualifications :<span className="text-danger">&nbsp;*</span></label>
                                    <textarea
                                        rows="3"
                                        className="form-control"
                                        placeholder="Qualification (Good to have)"
                                        name="qualification"
                                        value={formValue?.qualification}
                                        onChange={handleChange}
                                    />

                                </div>
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Experience :<span className="text-danger">&nbsp;*</span></label>
                                    <textarea

                                        className="form-control"
                                        placeholder="Year/Month of experience"
                                        name="experience"
                                        value={formValue?.experience}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Salary :<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type='number'
                                        className="form-control"
                                        placeholder="salary"
                                        name="salary"
                                        value={formValue?.salary}
                                        onChange={handleChange}
                                    />

                                </div>
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Openings :<span className="text-danger">&nbsp;*</span></label>
                                    <textarea

                                        className="form-control"
                                        placeholder="openings"
                                        name="openings"
                                        value={formValue?.openings}
                                        onChange={handleChange}
                                    />

                                </div>




                            </div>


                            {/* Button */}
                            <div className="col-12 d-flex justify-content-end ">


                                <button
                                    type="submit"
                                    onClick={(e) => handleSubmit(e)}
                                    class="btn btn-primaryb mt-3"
                                    style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                >
                                    Submit
                                </button>


                            </div>
                        </form>

                    </section>
                </div>
            </div >




        </div >
    )
}

export default EditJob