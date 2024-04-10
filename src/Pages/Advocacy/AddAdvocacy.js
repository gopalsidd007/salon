import React, { useEffect, useState } from 'react'
import HttpClient from '../../utils/HttpClient';
import toast from 'react-hot-toast';
import ManageAdvocacy from './ManageAdvocacy';
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import { ImCross } from 'react-icons/im';

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"

}

const AddAdvocacy = () => {

    const [isLoading, setIsLoading] = useState(false);

    const initValue = {
        catID: "",
        title: "",
        description: "",
        subTitle: "",
        priority: "",
        description: "",
        video: "",
        image: "",
        pdf: "",
        inputField: [{
            "subquestion": "",
        }]
    }
    const [formValue, setFormValue] = useState(initValue);
    const [catData, setCatData] = useState([]);
    const [imageLoader, setImgLoader] = useState(false);
    const [catLoadet, setCatLoader] = useState(false)
    const [imageFile, setimageFile] = useState("");

    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState({})



    // console.log("formValueddf", formValue)

    // other inputs change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue(prev => ({ ...prev, [name]: value }));
    }

    // get category data
    const getCategoryData = async () => {
        setCatLoader(true)
        const res = await HttpClient.requestData("view-advocacy-category", "GET", {});
        console.log("resCat", res);
        if (res && res?.status) {
            setCatLoader(false)
            setCatData(res?.data);
        } else {
            setCatLoader(false);
            toast(res?.message)
        }
    }



    // validate
    const validate = () => {
        if (!formValue?.catID) {
            toast.error("Category Name is required");
            return true
        }
        if (!formValue?.title) {
            toast.error("Title is required");
            return true
        }
        if (!formValue?.image) {
            toast.error("Image is required");
            return true
        }
        // if (!formValue?.priority) {
        //     toast.error("Priority is required");
        //     return true
        // }
        // if (!formValue?.description) {
        //     toast.error("Description is required");
        //     return true
        // }
        // if (!formValue?.video) {
        //     toast.error("Video Link is required");
        //     return true
        // }
        // if (formValue?.inputField.length === 0) {
        //     toast.error("Sub questions is required");
        //     return true
        // }

        return false
    }

    // submit
    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        // console.log("formValue",formValue);
        e.preventDefault();

        if (validate()) {
            return
        }

        const data = {
            "AdvocacyName": formValue.title,
            "advocacyCatId": formValue.catID,
            "image": formValue.image,
            "desc": formValue.description,
            "material": formValue.pdf

        }
        setIsLoading(true);
        const res = await HttpClient.requestData("add-advocacy", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Advocacy Data Added Successfully");
            setFormValue(initValue);
            setimageFile("")
            // navigate('/manage-category');
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    };


    useEffect(() => {
        getCategoryData();
    }, [])

    console.log(formValue);

    const handleImage = async (e) => {
        // console.log("e",e.target.files);
        setimageFile(URL.createObjectURL(e.target.files[0]))
        let formData = new FormData()

        formData.append("image", e.target.files[0])
        // setIsLoading(true);
        const res = await HttpClient.fileUplode("image-upload", "POST", formData);
        // console.log("image", res)
        // let img = "https://elites3bkt.s3.ap-south-1.amazonaws.com/image/c0cd7570-6e55-11ee-b35b-6f74a2fba80f.png"
        // setFormValue({...formValue,image:img})
        if (res && res?.status) {
            toast.success(" Image Uploaded Successfully");
            setFormValue({ ...formValue, image: res.image })
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }


    }


    const handlePdf = async (e) => {
        let formData = new FormData()

        formData.append("image", e.target.files[0])
        // setIsLoading(true);
        const res = await HttpClient.fileUplode("image-upload", "POST", formData);
        // console.log("image", res)
        // let img = "https://elites3bkt.s3.ap-south-1.amazonaws.com/image/c0cd7570-6e55-11ee-b35b-6f74a2fba80f.png"
        // setFormValue({...formValue,image:img})
        if (res && res?.status) {
            toast.success("Document Uploaded Successfully");
            setFormValue({ ...formValue, pdf: res.image })
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    }

    // click on edit
    const handleEdit = (item) => {
        // navigate("/edit-advocacy", { state: item })
        // window.alert(5)
        window.scrollTo(0, 0)

        console.log("itemsd", item)

        setEditData(item);
        setIsEdit(true);
        setFormValue({
            catID: item?.advocacyCatId,
            title: item?.AdvocacyName,
            description: item?.desc,
            image: item?.image,
            pdf: item?.material,
        })
        setimageFile(item?.image)
    }

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            return
        }

        const data = {
            "AdvocacyName": formValue.title,
            "advocacyCatId": formValue.catID,
            "image": formValue.image,
            "desc": formValue.description,
            "material": formValue.pdf

        }
        setIsLoading(true);
        const res = await HttpClient.requestData("update-advocacy/" + editData?._id, "PUT", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Advocacy Data Added Successfully");
            setFormValue(initValue);
            setimageFile("")
            setimageFile(null)
            setIsLoading(false);
            getCategoryData();
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    }
    //cancel edit
    const handleisCancelSubmit = (e) => {
        setIsEdit(false)
        setFormValue(initValue)
        setimageFile("")
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
                            Add Advocacy
                        </div>
                        <form>
                            <div className="row">

                                <div className="col">
                                    <label htmlFor="formGroupExampleInput"
                                        className={!isEdit ? "" : "edit-tag"}>Select Category <span className="text-danger">*</span></label>
                                    <select
                                        className="form-control"
                                        aria-label="Default select example"
                                        name="catID"
                                        value={formValue.catID}
                                         onChange={handleChange}
                                    >
                                        <option value={""} disabled>Select Category</option>
                                        {catData.map((item, i) =>
                                            <option key={i} value={item?._id}>{item?.categoryName}</option>
                                        )
                                        }
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="formGroupExampleInput"
                                        className={!isEdit ? "" : "edit-tag"}>Name <span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Title"
                                        name="title"
                                        value={formValue.title}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <div className="row mt-1">
                                <div className="col-md-12">
                                    <label htmlFor="formGroupExampleInput"
                                        className={!isEdit ? "" : "edit-tag"}>Description <span className="text-danger">*</span></label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        placeholder="Description"
                                        name="description"
                                        value={formValue.description}
                                        onChange={handleChange}
                                        rows="5"
                                        cols="5"
                                    >{formValue.description}</textarea>
                                </div>

                            </div>

                            <div className="row" style={{ marginTop: "10px" }}>
                                <div className="col">
                                    <label htmlFor="formGroupExampleInput" className={!isEdit ? "" : "edit-tag"}>Image</label>
                                    <input
                                        type="file"
                                        onChange={handleImage}
                                    />
                                    <br></br>
                                    {imageFile && (
                                        <div>
                                            <img
                                                alt="not found"
                                                width={"250px"}
                                                src={imageFile}
                                            />
                                            <br />
                                            {/* <div>
                                                <button onClick={() => setimageFile(null)}
                                                    className="btn btn-danger mt-1 btn-grad-cancel remove">Remove</button>
                                            </div> */}

                                        </div>
                                    )}
                                </div>


                                <div className="col">
                                    <label htmlFor="formGroupExampleInput">Material</label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={handlePdf}
                                    />
                                </div>
                            </div>

                            <div class="col-12 d-flex justify-content-end ">
                                {
                                    !isEdit
                                        ?
                                        <button
                                            type="submit"
                                            onClick={(e) => handleSubmit(e)}
                                            class="btn btn-primaryb mt-3"
                                            style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                        >
                                            Add Advocacy
                                        </button>
                                        :
                                        <div className="d-flex ">
                                            <button
                                                type="submit"
                                                onClick={(e) => handleEditSubmit(e)}
                                                className="btn  mt-3 btn-grad"
                                            //style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                            >
                                                Update List
                                            </button>
                                            <ImCross onClick={(e) => handleisCancelSubmit(e)} style={{ fontSize: "26px", cursor: "pointer" }} className=" mx-3 mt-4 text-danger " />
                                        </div>
                                }
                            </div>


                        </form>
                    </section>
                </div>
            </div >

            <ManageAdvocacy
                handleEdit={handleEdit}

            />

        </div >

    )
}

export default AddAdvocacy