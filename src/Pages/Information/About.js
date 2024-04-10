import React, { useEffect, useState } from 'react'
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import HttpClient from '../../utils/HttpClient';
import toast from 'react-hot-toast';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"
}


const About = () => {
    const initValue = {
        LearnMore: "",
        Contactinfo: "",

    }
    const [formValue, setFormValue] = useState(initValue);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [AboutCompany, setAboutCompany] = useState([]);
    const [updatedID, setupdatedID] = useState('');

    console.log(formValue, "AboutCompany")


    // other inputs change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue(prev => ({ ...prev, [name]: value }));
    }
    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (!formValue?.Contactinfo || !formValue?.LearnMore) {
            return toast.error("Please put some data");
        }

        const data = {
            about: formValue.LearnMore,
            contact: formValue.Contactinfo
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("add-about", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {

            toast.success("Data Added Successfully");
            setFormValue(initValue);
            setIsLoading(false);
            getdata();

        } else {
            toast.error(res?.message);
            setIsLoading(false);
        }
    };

    //get data
    const getdata = async () => {
        setIsLoading(true)
        const res = await HttpClient.requestData("view-about-company", "GET", {})
        // console.log(res, "resdata")
        if (res && res?.status) {
            setIsLoading(false);
            setAboutCompany(res?.data)

        }
        else {
            setIsLoading(false);
        }
    }
    //Edit data state
    const handleEdit = (item) => {
        setFormValue({
            ...formValue, LearnMore: item?.about,
            Contactinfo: item?.contact
        })
        setupdatedID(item?._id)
        setIsEdit(true)
    }
    //Delete data
    const handleDelete = (id) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-about/" + id, "PUT")
            if (res && res?.status) {

                toast.success("data Deleted Successfully");
                getdata();
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }
    //editsubmit
    const handleEditSubmit = async (e) => {

        e.preventDefault();

        if (!formValue?.Contactinfo || !formValue?.LearnMore) {
            return toast.error("Please put some data");
        }

        const data = {
            about: formValue.LearnMore,
            contact: formValue.Contactinfo
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("edit-about/" + updatedID, "PUT", data);
        // console.log("resCat", res)
        if (res && res?.status) {

            toast.success("Data Edited Successfully");
            setFormValue(initValue);
            setIsLoading(false);
            setIsEdit(false)
            getdata();

        } else {
            toast.error(res?.message);
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getdata();
    }, []);
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
                            Add/Manage Information
                        </div>
                        <form>
                            <div className="row ">
                                <div className="col-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput" className='edit-tag'>Learn More <span className="text-danger">&nbsp;*</span></label>
                                    <textarea
                                        type="text"
                                        className="form-control "
                                        placeholder='Link'
                                        onChange={handleChange}
                                        value={formValue.LearnMore}
                                        name="LearnMore"
                                    />
                                </div>
                                <div className="col-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput" className='edit-tag'>Contact Information<span className="text-danger">&nbsp;*</span></label>
                                    <textarea
                                        className="form-control"
                                        placeholder='Description'
                                        onChange={handleChange}
                                        value={formValue.Contactinfo}
                                        name="Contactinfo"
                                    />
                                </div>
                            </div>
                            {/* Button */}
                            <div class="row mt-2">
                                <div className='col-10'>

                                </div>
                                <div className='col-2'>
                                    <div className=' d-flex justify-content-end '>
                                        {AboutCompany?.length === 0 ? <button
                                            type="submit"
                                            onClick={(e) => handleSubmit(e)}
                                            className="form-control "
                                            style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                        >
                                            Add information
                                        </button> : ""}
                                        {isEdit ? <button
                                            type="submit"
                                            onClick={(e) => handleEditSubmit(e)}
                                            className="form-control "
                                            style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                        >
                                            Edit information
                                        </button> : ""}
                                    </div>
                                </div>


                            </div>

                        </form>
                        <form>
                            {AboutCompany?.map((item, i) => {
                                return (
                                    <>
                                        <section key={item?._id}>
                                            <div className="container py-3">
                                                <div className='row d-flex justify-content-center'>
                                                    <div className="card col-12 mb-3">
                                                        <div className="row">
                                                            <div className="col-md-12 px-3" >
                                                                <div className="card-block px-3 m-2 d-flex flex-column justify-content-between">
                                                                    <div className=' d-flex justify-content-between '>
                                                                        <h4 className="card-title text-danger">Learn More About (Your Company)</h4>
                                                                        <EditDeleteIcon
                                                                            onClickEdit={(e) => handleEdit(item)}
                                                                            onClickDelete={(e) => handleDelete(item?._id)}
                                                                        />
                                                                    </div>

                                                                    <div>
                                                                        <p className="card-text mt-2 mb-2">
                                                                            {item?.about}
                                                                        </p>
                                                                    </div>
                                                                    <hr />
                                                                    <div className=' d-flex justify-content-between mt-2'>
                                                                        <h4 className="card-title text-success ">Contact Information</h4>
                                                                    </div>
                                                                    <div className=''>
                                                                        <p className="">
                                                                            {item?.contact}
                                                                        </p>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </section>
                                    </>
                                )
                            })
                            }
                        </form>





                    </section>
                </div>
            </div >




        </div >
    )
}

export default About