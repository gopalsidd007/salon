import React, { useEffect, useState } from 'react'
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import toast from 'react-hot-toast';
import HttpClient from '../../utils/HttpClient';
import ManageCheckList from './ManageCheckList';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import { ImCross } from 'react-icons/im';

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "11px",
    fontWeight: "bold"

}

const CheckList = () => {
    const [isLoading, setIsLoading] = useState(false);

    const initValue = {
        catID: "",
        title: "",
        inputField: [{
            "subquestion": "",
        }]
    }
    const [formValue, setFormValue] = useState(initValue);
    const [catData, setCatData] = useState([]);
    const [imageFile, setimageFile] = useState("");
    const [checkListData, setCheckListData] = useState([]);


    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState({})

    console.log(formValue, "formValuedf")

    console.log("formValueddf", formValue?.inputField)

    // other inputs change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue(prev => ({ ...prev, [name]: value }));
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
            "checklistDayID": formValue.catID,
            "checklist": formValue.title,
            "subquestionData": formValue.inputField,

        }
        setIsLoading(true);
        const res = await HttpClient.requestData("add-checklist", "POST", data);
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

    //add input field
    const handleMore = async () => {
        if (isEdit) {
            const data = {
                "checklistID": editData?._id,
                "subquestion": ""
            }
            const res = await HttpClient.requestData("add-checklist-subquestion", "POST", data);
            // console.log("ressAddf", res)
            if (res && res?.status) {
                viewSingleMainData()
            }
        } else {
            setFormValue({ ...formValue, inputField: [...formValue.inputField, { "subquestion": "" }] })
        }
    }

    // click on edit icon
    const handleEdit = (item) => {
        // navigate("/edit-advocacy", { state: item })
        // window.alert(5)
        window.scrollTo(0, 0)

        console.log("itemsd", item)

        setEditData(item);
        setIsEdit(true);
        setFormValue({
            catID: item?.checklistDayID,
            title: item?.checklist,
            inputField: item?.survey
        })

    }

    // Edit submit
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            return
        }

        const data = {
            checklistDayID: formValue.catID,
            checklist: formValue.title,
            subquestionData: formValue.inputField?.map((item) => ({
                "subquestion": item?.subquestion,
                "subquestionID": item?._id
            })),
        }
        console.log("datasadsax", data)
        setIsLoading(true);
        const res = await HttpClient.requestData("update-checklist/" + editData._id, "PUT", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Checklist Data Added Successfully");
            setFormValue(initValue);
            // navigate('/manage-category');
            setIsLoading(false);
            setIsEdit(false);
            getCategoryData(editData?._id);

        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    }

//cancel edit
const handleCancel=(e)=>{
    setFormValue(initValue);
   
    setIsEdit(false);
}
    // //delete Sub question
    // const handleDel = (id, idx) => {
    //     if (!isEdit) {
    //         formValue.inputField.splice(idx, 1)
    //         // setinputField([...inputField])
    //         setFormValue({ ...formValue })
    //     }
    //     else {
    //         const del = async () => {
    //             setIsLoading(true);
    //             const res = await HttpClient.requestData("delete-subquestion/" + id, "DELETE");
    //             // console.log("dellchh", res)
    //             if (res && res?.status) {
    //                 viewSingleMainData()
    //                 toast.success("Deleted Successfully");
    //                 setIsLoading(false);
    //             } else {
    //                 toast.error(res?.message || "Something Wrong");
    //             }
    //         }

    //         DeleteConfirmModal(del);
    //     }

    // }

    //view single main data
    const viewSingleMainData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-single-main-ques/" + editData?._id, "GET", {});
        // console.log("resGetsingg", res?.data)

        if (res && res?.status) {
            setIsLoading(false);
            setFormValue({ ...formValue, inputField: res?.data?.[0]?.Subquestion })

        } else {
            setIsLoading(false);
        }
    }

    const handleAddMore = (e, idx) => {
        let inputData = [...formValue.inputField]
        inputData[idx][e.target.name] = e.target.value
        // setinputField(inputData)
        setFormValue({ ...formValue, inputField: inputData })
    }


    const getCategoryData = async (id) => {
        // console.log("idddd", id, day)
        let data = {
            checklistDayID: id
        }
        setIsLoading(true);
        const res = await HttpClient.requestData(`get-checklist`, "POST", data);
        console.log("resGetCatchh", res)

        let apiData = []
        if (res && res?.status) {

            setCheckListData(res?.data1)

            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
        // setTableData(apiData);
    }

    // get day data
    const getDayData = async () => {
        // setCatLoader(true)
        const res = await HttpClient.requestData("view-checklist-day", "GET", {});
        console.log("resCat", res);
        if (res && res?.status) {
            // setCatLoader(false)
            setCatData(res?.data);

        } else {
            // setCatLoader(false);
            toast(res?.message)
        }
    }
    //cancel update
    // const handleisCancelSubmit = (e) => {
    //     setIsEdit(false);

    // }

    useEffect(() => {
        getDayData();
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
                            Add & Manage Checklist
                        </div>
                        <form>
                            <div className="row">

                                <div className="col-6">
                                    <label htmlFor="formGroupExampleInput"
                                        className={isEdit ? "edit-tag" : ""}>Select your category
                                        <span
                                            className=' text-danger '>*</span></label>
                                    <select
                                        class="form-control"
                                        aria-label="Default select example"
                                        name="catID"
                                        value={formValue.catID}
                                        onChange={handleChange}
                                    >
                                        <option value={""} disabled>Show Category</option>
                                        {catData.map((item, i) =>
                                            <option key={i} value={item?._id}>{item?.name}</option>
                                        )
                                        }
                                    </select>
                                </div>

                                <div className="col-6">
                                    <label htmlFor="formGroupExampleInput"
                                        className={isEdit ? "edit-tag" : ""}>Question ?
                                        <span
                                            className=' text-danger '>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your question (e.g.,'How can we help?')"
                                        name="title"
                                        value={formValue.title}
                                        onChange={handleChange}
                                    />
                                </div>


                                {/* <div className="col mt-3">
                                    <div className="formSubQuDiv">
                                        <label htmlFor="formGroupExampleInput">Subquestion</label> <br />

                                    </div>

                                    {formValue?.inputField?.map((ite, idx) => {
                                        return (<div className="dynInpDel d-flex mt-1">
                                            {
                                                idx !== 0
                                                    ?
                                                    <button
                                                        type="button"
                                                        className=" rounded mx-4 px-2 text-danger"
                                                        onClick={() => { handleDel(ite?._id, idx) }}
                                                    >
                                                        <i class="fa-solid fa-trash-can"></i>
                                                    </button>
                                                    :
                                                    ""
                                            }
                                            <input
                                                type="text"
                                                className="form-control "
                                                placeholder="Subtitle"
                                                name="subquestion"
                                                value={ite.subquestion}
                                                onChange={(e) => handleAddMore(e, idx)}

                                            />
                                        </div>)
                                    })}

                                </div> */}
                                {/* <div className="col-12 formSubQuDiv justify-content-end ">

                                    <button class="btn btn-primaryb mb-1 mt-2"
                                        style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                        type="button" onClick={handleMore}>
                                        Add More Field
                                    </button>
                                </div> */}

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
                                                Add Checklist
                                            </button>

                                            :
                                            <div className="d-flex ">
                                                <button
                                                    type="submit"
                                                    onClick={(e) => handleEditSubmit(e)}
                                                    className="btn btn-primaryb mt-3 btn-grad"
                                                //style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                                >
                                                    Update Checklist
                                                </button>
                                                <button
                                                    type="submit"
                                                    onClick={(e) => handleCancel(e)}
                                                    className="btn btn-danger mt-3 btn-grad-cancel px-2 mx-4"
                                                //style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                                > Cancel
                                                </button>
                                                {/* <ImCross onClick={(e) => handleisCancelSubmit(e)} style={{ fontSize: "26px", cursor: "pointer" }} className=" mx-3 mt-4 text-danger " /> */}
                                            </div>

                                    }
                                </div>

                            </div>
                        </form>
                    </section>
                </div>
            </div >

            {/* <div className="datatable-view ">
                <div
                    style={headLineStyle}
                    className="page-headline "
                >
                    View & Manage Checklist
                </div>
            </div> */}


            <ManageCheckList
                handleEdit={handleEdit}
                getCategoryData={getCategoryData}
                checkListData={checkListData}
            />

        </div >

    )
}


export default CheckList