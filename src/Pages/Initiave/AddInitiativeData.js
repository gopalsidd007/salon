import React, { useEffect, useState } from 'react'
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import toast from 'react-hot-toast';
import HttpClient from '../../utils/HttpClient';
import moment from 'moment';

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"

}

const AddInitiativeData = () => {
    const [isLoading, setIsLoading] = useState(false);

    const initValue = {
        initiativeTypeID: "",
        nameOfInitaitive: "",
        description: "",
        startDate: "",
        endDate: "",
        rewardPoints: "",

    }
    const [formValue, setFormValue] = useState(initValue);
    const [initiativeType, setInitiativeType] = useState()
    console.log(formValue, "rr")

    //checking form validaion
    // validate
    const validate = () => {
        const startDate = new Date(formValue.startDate);
        const endDate = new Date(formValue.endDate);

        if (!formValue?.initiativeTypeID) {
            toast.error("Inititative type is required");
            return true
        }
        if (!formValue?.nameOfInitaitive) {
            toast.error("name of initiative is required");
            return true
        }

        if (!formValue?.startDate) {
            toast.error("Start date required");
            return true
        }
        if (!formValue?.endDate) {
            toast.error("End date required");
            return true
        }
        if (startDate > endDate) {
            toast.error("End date cannot be before the start date");
            return true;
        }
        if (!formValue?.description) {
            toast.error("description required");
            return true
        }
        if (!formValue?.rewardPoints) {
            toast.error("Reward point required");
            return true
        }


        return false
    }

    // other inputs change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue(prev => ({ ...prev, [name]: value }));
    }

    // get initiative type data
    const getInitiativeTypeData = async () => {
        setIsLoading(true)
        const res = await HttpClient.requestData("view-initiative-type", "GET", {});
        console.log("resCat", res);
        if (res && res?.status) {
            setIsLoading(false);
            setInitiativeType(res?.data);
        } else {
            setIsLoading(false);
            toast.error(res?.message);
        }
    }

    //Submit data
    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        // console.log("formValue",formValue);
        e.preventDefault();

        if (validate()) {
            return
        }

        const data = {
            "initiativeTypeID": formValue.initiativeTypeID,
            "nameOfInitaitive": formValue.nameOfInitaitive,
            "description": formValue.description,
            "startDate": moment(formValue.startDate).format("DD-MM-YYYY"),
            "endDate": moment(formValue.endDate).format("DD-MM-YYYY"),
            "rewardPoints": formValue.rewardPoints

        }
        setIsLoading(true);
        const res = await HttpClient.requestData("add-initiative", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Data Added Successfully");
            setFormValue(initValue);

            // navigate('/manage-category');
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    };


    useEffect(() => {
        getInitiativeTypeData();
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
                            Add Initiative
                        </div>
                        <form>
                            <div className="row">

                                <div className="col-12">
                                    <label htmlFor="formGroupExampleInput">Select Initiative Type</label>
                                    <select
                                        class="form-control"
                                        aria-label="Default select example"
                                        name="initiativeTypeID"
                                        value={formValue.initiativeTypeID}
                                        onChange={handleChange}
                                    >
                                        <option value={""} disabled>Select Category</option>
                                        {initiativeType?.map((item, i) =>
                                            <option key={i} value={item?._id}>{item?.initiativetype}</option>
                                        )
                                        }
                                    </select>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="formGroupExampleInput">Name Of Initiative</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name Of Initiative"
                                        name="nameOfInitaitive"
                                        value={formValue.nameOfInitaitive}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-6 mt-2">
                                    <label htmlFor="formGroupExampleInput">Start Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="startDate"
                                        value={formValue.startDate} mt-2
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-6 mt-2">
                                    <label htmlFor="formGroupExampleInput">End Date</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="endDate"
                                        value={formValue.endDate}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <div className="row mt-2">
                                <div className="col-6">
                                    <label htmlFor="formGroupExampleInput">Description</label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        placeholder="Description of Initiative."
                                        name="description"
                                        value={formValue.description}
                                        onChange={handleChange}
                                        rows="5"
                                        cols="5"
                                    >{formValue.description}</textarea>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="formGroupExampleInput">Reward Points</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Add Reward Point (e.g. Number : '10'/'20' etc.)"
                                        name="rewardPoints"
                                        value={formValue.rewardPoints}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>




                            <div class="col-12 d-flex justify-content-end ">

                                <button
                                    type="submit"
                                    onClick={(e) => handleSubmit(e)}
                                    class="btn btn-primaryb mt-3"
                                    style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                >
                                    Add Initiative
                                </button>

                            </div>


                        </form>
                    </section>
                </div>
            </div >



        </div >
    )
}

export default AddInitiativeData