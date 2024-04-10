import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import HttpClient from '../../utils/HttpClient';
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import ManageSurvey from './ManageSurvey';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"

}

const AddSurvey = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [catName, setCatName] = useState()
    const initValue = {
        catID: "",
        title: "",
        subTitle: "",
        priority: "",
        description: "",
        video: "",
        image: [],
        inputField: [{
            "subquestion": "",
        }]
    }
    const [formValue, setFormValue] = useState(initValue);
    const [catData, setCatData] = useState([]);
    const [catLoadet, setCatLoader] = useState(false)
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState({})
    const [checkListData, setCheckListData] = useState([])


    console.log(editData, "editDataff")


    // console.log("formValueddf", formValue)

    // other inputs change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue(prev => ({ ...prev, [name]: value }));
    }

    // get category data
    const getDayData = async () => {
        setCatLoader(true)
        const res = await HttpClient.requestData("view-survey-Name", "GET", {});
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
            toast.error("Survey Name is required");
            return true
        }
        if (!formValue?.title) {
            toast.error("Title is required");
            return true
        }
        // if (!formValue?.subTitle) {
        //     toast.error("Subtitle is required");
        //     return true
        // }
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
        e.preventDefault();

        if (validate()) {
            return
        }

        const data = {
            surveyNameId: formValue.catID,
            survey: formValue.title,
            subQuestionData: formValue.inputField,

        }
        setIsLoading(true);
        const res = await HttpClient.requestData("add-survey", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Survey Data Added Successfully");
            setFormValue(initValue);
            // navigate('/manage-category');
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    };

    const handleMore = async () => {
        if (isEdit) {
            const data = {
                "surveyID": editData?._id,
                "subquestion": ""
            }
            const res = await HttpClient.requestData("add-survey-subquestion", "POST", data);
            // console.log("ressAddf", res)
            if (res && res?.status) {
                viewSingleMainData()
            }
        } else {
            setFormValue({ ...formValue, inputField: [...formValue.inputField, { "subquestion": "" }] })
        }
    }

    const handleDel = (id, idx) => {
        if (!isEdit) {
            formValue.inputField.splice(idx, 1)
            // setinputField([...inputField])
            setFormValue({ ...formValue })
        } else {
            const del = async () => {
                setIsLoading(true);
                const res = await HttpClient.requestData("delete-survey-subquestion/" + id, "DELETE");
                // console.log("dellchh", res)
                if (res && res?.status) {
                    viewSingleMainData()
                    toast.success("Deleted Successfully");
                    setIsLoading(false);
                } else {
                    toast.error(res?.message || "Something Wrong");
                }
            }

            DeleteConfirmModal(del);
        }
    }

    //view single main data
    const viewSingleMainData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-singlw-survey-main-question/" + editData?._id, "GET", {});
        // console.log("resGetsingg", res?.data)

        if (res && res?.status) {
            setIsLoading(false);
            setFormValue({ ...formValue, inputField: res?.data?.[0]?.Subquestion })

        } else {
            setIsLoading(false);
        }
    }

    const handleAddMore = async (e, idx) => {

        let inputData = [...formValue.inputField]
        inputData[idx][e.target.name] = e.target.value
        // setinputField(inputData)
        setFormValue({ ...formValue, inputField: inputData })

    }

    //EDIT
    const handleEdit = (item) => {
        window.scrollTo(0, 0);
        // console.log(item, "itemmmm")
        setEditData(item)
        setIsEdit(true)
        setFormValue({
            catID: item?.surveyNameId,
            title: item?.survey,
            // inputField: item?.surveys
        })

    }

    // Edit submit
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            return
        }

        const data = {
            surveyNameId: formValue.catID,
            survey: formValue.title,
            // subQuestionData: formValue.inputField?.map((item) => ({
            //     "subquestion": item?.subquestion,
            //     "subquestionID": item?._id
            // })),
        }
        // console.log("datasadsax", data)
        setIsLoading(true);
        const res = await HttpClient.requestData("update-survey/" + editData._id, "PUT", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Checklist Data Added Successfully");
            setFormValue(initValue);
            // navigate('/manage-category');
            setIsLoading(false);
            setIsEdit(false);
            getCategoryData(editData?.surveyNameId);

        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    }
    //cancel update
    const handleCancel = (e) => {
        setFormValue(initValue);
        setIsEdit(false);
    }

    const getCategoryData = async (id) => {
        // console.log("idddd", id, day)
        let data = {
            surveyNameId: id
        }
        setIsLoading(true);
        const res = await HttpClient.requestData(`get-survey`, "POST", data);
        console.log("resGetCat", res)
        console.log(res?.data1, "CHeckList")
        let apiData = []
        if (res && res?.status) {

            setCheckListData(res?.data1)

            setIsLoading(false);
            // apiData = res?.data1?.map((item, i) => ({
            //     id: i + 1,
            //     sl: i + 1,
            //     name: item?.checklist,
            //     // name: item?.name,
            //     action: <EditDeleteIcon
            //         // onClickEdit={(e) => handleEdit(item)}
            //         onClickDelete={(e) => handleDelete(item?._id)}
            //     />
            // }));
        } else {
            setIsLoading(false);
        }
        // setTableData(apiData);
    }


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
                            Add & Manage Survey
                        </div>
                        <form>
                            <div className="row">

                                <div className="col">
                                    <label htmlFor="formGroupExampleInput"
                                        className={isEdit ? "edit-tag" : ""}>Select Survey Name
                                        <span className=
                                            "text-danger">*</span></label>
                                    <select
                                        class="form-control"
                                        aria-label="Default select example"
                                        name="catID"
                                        value={formValue.catID}
                                        onChange={handleChange}
                                    >
                                        <option value={""} disabled>Select Survey</option>
                                        {catData?.map((item, i) =>
                                            <option key={i} value={item?._id}>{item?.name}</option>
                                        )
                                        }
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="formGroupExampleInput"
                                        className={isEdit ? "edit-tag" : ""}>Questions
                                        <span className=
                                            "text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Questions ?"
                                        name="title"
                                        value={formValue.title}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* <div className="row">
                                <div className="col">
                                    <div className="formSubQuDiv">
                                        <label htmlFor="formGroupExampleInput">Subquestion</label> <br />

                                    </div>

                                    {
                                        formValue?.inputField?.map((ite, idx) => {
                                            return (<div className="dynInpDel d-flex mt-1">
                                                {
                                                    idx !== 0 ?
                                                        <button
                                                            type="button"
                                                            className="rounded mx-4 px-2 text-danger"
                                                            onClick={() => { handleDel(ite?._id, idx) }}
                                                        >
                                                            <i class="fa-solid fa-trash-can"></i>
                                                        </button>
                                                        :
                                                        ""
                                                }

                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Subtitle"
                                                    name="subquestion"
                                                    value={ite.subquestion}
                                                    onChange={(e) => handleAddMore(e, idx)}
                                                />
                                            </div>)
                                        })}
                                </div>
                            </div> */}


                            {/* <div className='col'>
                                <div className="formSubQuDiv">

                                    <button type="button" onClick={handleMore}
                                        className="addMoreBtn btn btn-primaryb mt-2 mb-1"
                                        style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                    >Add More Field</button>
                                </div>
                            </div> */}


                            {/* Button */}
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
                                            Add Data
                                        </button>
                                        :
                                        <div className=' d-flex '>
                                            <button
                                                type="submit"
                                                onClick={(e) => handleEditSubmit(e)}
                                                class="btn btn-primaryb mt-3 btn-grad"
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
                                        </div>
                                }
                            </div>
                        </form>

                    </section>
                </div>
            </div >


            <ManageSurvey
                handleEdit={handleEdit}
                getCategoryData={getCategoryData}
                checkListData={checkListData}
            />


        </div >
    )
}

export default AddSurvey