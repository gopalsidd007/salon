

import React, { useEffect, useState } from 'react'
import CustomLoader from '../../../CustomComponents/loader/CustomLoader';
import toast from 'react-hot-toast';
import HttpClient from '../../../utils/HttpClient';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { FaStarOfLife } from 'react-icons/fa';
const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "15px",
    fontWeight: "bold"

}

const AddHr = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    //const [EmpData, setEmpData] = useState([]);
    const initValue = {
        firstName: "",
        lastName: "",
        designation: "",
        email: "",
        password: "",
        phoneNo: "",

    }
    const [formValue, setFormValue] = useState(initValue);
    const [options, setOptions] = useState([]); // Options for the dropdown
    const [selectedIds, setSelectedIds] = useState([]); // Selected IDs
    const animatedComponents = makeAnimated();
    // console.log(selectedIds, "selectedIds");
    const [hrData, setHrData] = useState([]); // Options for the dropdown
    const [HrId, setHrid] = useState(null); // Selected IDs
    console.log(HrId, hrData, "selectedIds");

    const validate = () => {
        if (!formValue?.firstName) {
            toast.error("firstName is required");
            return true
        }
        if (!formValue?.lastName) {
            toast.error("lastName is required");
            return true
        }

        if (!formValue?.email) {
            toast.error("email is required");
            return true
        }
        if (!formValue?.password) {
            toast.error("password is required");
            return true
        }
        if (!formValue?.phoneNo) {
            toast.error("phoneNo is required");
            return true
        }


        return false
    }

    //Fetch Emp Data
    const getManagerData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("companyAdmin-view-card", "POST", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.managerData?.map((item, i) => ({
                label: `${item.firstName} ${item.lastName}`,
                value: item._id,

            }));
        } else {
            setIsLoading(false);
        }
        setOptions(apiData);
    }
    // get HR Data
    const getHrData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("companyAdmin-view-card", "POST", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.hrData?.map((item, i) => ({
                label: `${item.firstName} ${item.lastName}`,
                value: item._id,

            }));
        } else {
            setIsLoading(false);
        }
        setHrData(apiData);
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue(prev => ({ ...prev, [name]: value }));
    }
    const handleSelectChange = selectedOption => {
        // Update the selected IDs array
        setSelectedIds(selectedOption ? selectedOption.value : null);
    }
    const handleSelectHrID = selectedOption => {
        // Update the selected IDs array
        setHrid(selectedOption ? selectedOption.value : null);
    }


    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (validate()) {
            return
        }

        const data = {
            "companyCode": 66853136,
            "firstName": formValue?.firstName,
            "lastName": formValue?.lastName,
            "userType": "Admin",
            "email": formValue?.email,
            "password": formValue?.password,
            "contact": parseInt(formValue?.phoneNo),

        }

        setIsLoading(true);
        const res = await HttpClient.requestData("companyAdmin-register-HR", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Added Successfully");
            setFormValue(initValue);
            // navigate('/manage-category');
            setSelectedIds([])
            setHrid(null)
            setIsLoading(false);
            console.log(data, "apiData")
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getManagerData();
        getHrData();
    }, [])

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
                            Add Hr
                            <hr/>
                        </div>
                        <form>
                            <div className="row">



                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">First Name<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="First Name"
                                        name="firstName"
                                        value={formValue.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Last Name<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={formValue.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Designation<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Designation"
                                        name="designation"
                                        value={formValue.designation}
                                        onChange={handleChange}
                                    />
                                </div> */}
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Email<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="email"
                                        name="email"
                                        autocomplete="off"
                                        value={formValue?.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Password<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="password"
                                        name="password"
                                        value={formValue?.password}
                                        autocomplete="off"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Contact No<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Contact Number"
                                        name="phoneNo"
                                        value={formValue?.phoneNo}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* <div className="col-12 mt-3">
                                    <label htmlFor="formGroupExampleInput">Select Hr Name<span className="text-danger">&nbsp;*</span></label>

                                    <Select
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}

                                        options={hrData}
                                        onChange={handleSelectHrID}
                                        value={hrData.find(option => option.value === HrId)}
                                    />
                                </div> */}
                                {/* <div className="col-12 mt-3">
                  <label htmlFor="formGroupExampleInput">Managed By (Manager)</label>

                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}

                    options={options}
                    onChange={handleSelectChange}
                    value={options.find(option => selectedIds === option.value)}
                  />
                </div> */}

                            </div>





                            {/* Button */}
                            <div class="col-12 d-flex justify-content-end">
                                {
                                    !isEdit
                                        ?
                                        <button
                                            type="submit"
                                            onClick={(e) => handleSubmit(e)}
                                            class="btn btn-primaryb mt-3"
                                            style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                        >
                                            Add Data
                                        </button>
                                        :
                                        <button
                                            type="submit"
                                            // onClick={(e) => handleEditSubmit(e)}
                                            class="btn btn-primaryb mt-3"
                                            style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                        >
                                            Update Checklist
                                        </button>
                                }
                            </div>
                        </form>

                    </section>
                </div>
            </div >




        </div >
    )
}

export default AddHr