import React, { useEffect, useMemo, useState } from 'react'
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import toast from 'react-hot-toast';
import HttpClient from '../../utils/HttpClient';
import { useNavigate } from 'react-router-dom';

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"

}

const AddSubtopic = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const initAddMore = { topicName: "" }
    const initValue = {
        topicId: "",
        type: "",
        title: "",
        subtitle: "",
        addMore: [initAddMore],
        topicName: ""
    }

    const [selectedTopicId, setSelectedTopicId] = useState("")
    const [formValue, setFormValue] = useState(initValue);
    const [mainTopicData, setMainTopicData] = useState([]);
    const [subTopicData, setSubTopicData] = useState([]);
    const [chatType, setChatType] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");
    const [isEdit, setIsEdit] = useState("");
    const [singleTopicData, setSingleTopicData] = useState({});
    const [topicTitle, setTopicTitle] = useState("");



    console.log("topicTitle", topicTitle)


    // returns type
    // const typeMemo = useMemo(() => {
    //     if (subTopicData?.length === 0) {
    //         return ""
    //     } else {
    //         if (subTopicData?.[0]?.type === "Answer") {
    //             return "Answer"
    //         } else {
    //             return "Topic"
    //         }
    //     }
    // }, [subTopicData])


    // validate
    const validate = () => {
        if (!formValue?.topicId) {
            toast.error("Please Select Topic");
            return true
        }
        if (!formValue?.type) {
            toast.error("Please Select Topic");
            return true
        }
        if (formValue?.addMore?.length === 0) {
            toast.error("Please Provide Some Subtopics");
            return true
        }

        return false
    }

    // other inputs change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue(prev => ({ ...prev, [name]: value }));
    }


    //Submit topic data
    const handleSubmitTopic = async (e) => {
        // console.log("valuesdd");
        // console.log("formValue",formValue);
        e.preventDefault();

        if (validate()) {
            return
        }

        const data = {
            "ref": formValue?.topicId,
            "type": formValue?.type,
            "title": formValue?.title,
            "data": formValue?.addMore
        }

        setIsLoading(true);
        const res = await HttpClient.requestData("add-chat-bot-topic", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Data Added Successfully");
            getSubTopic(formValue?.topicId)

            setFormValue(initValue);
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    };

    //Submit topic data
    const handleSubmitAnswer = async (e) => {
        // console.log("valuesdd");
        // console.log("formValue",formValue);
        e.preventDefault();

        // if (validate()) {
        //     return
        // }

        const data = {
            "ref": formValue?.topicId,
            "type": formValue?.type,
            "title": formValue?.subtitle,
            "topicName": formValue?.title
        }

        setIsLoading(true);
        const res = await HttpClient.requestData("add-chat-bot-topic", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Data Added Successfully");
            getSubTopic(formValue?.topicId)

            setFormValue(initValue);
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    };


    // onchange of addMore
    const handleChangeAddMore = (e, ind) => {
        const { name, value } = e.target;
        // console.log("namee", name, value)
        const addedArr = formValue?.addMore?.map((item, i) => {
            if (i === ind) {
                return { ...item, [name]: value }
            } else {
                return item
            }
        })
        setFormValue(prev => ({ ...prev, addMore: addedArr }))

        // setAddMoreData(prev => prev.map((item, i) => {
        //     if (i === ind) {
        //         return { ...item, [name]: value }
        //     } else {
        //         return item
        //     }
        // }));
    }

    // go to sub sub topic
    const goToSubSubTopic = (item) => {
        navigate(`/add-sub-subtopic`, {
            state: {
                data: JSON.stringify([item?._id]),
                topicName: JSON.stringify([selectedTopic, item?.topicName])
            }
        })
    }

    // edit topic click
    const editSubTopic = (item) => {
        console.log("itemedit", item)
        setIsEdit(true)
        setSingleTopicData(item);
        setFormValue((prev) => ({
            ...prev,
            topicName: item?.topicName
        }))
    }

    // edit topic submit
    const TopicEdtiSubmit = async () => {
        if (!formValue.topicName) {
            toast.error("Name of Topic is Required")
            return
        }
        const data = {
            ref: singleTopicData?.ref,
            topicName: formValue?.topicName
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("update-chatbot/" + singleTopicData?._id, "PUT", data)
        // console.log("Deltt", res)
        if (res && res?.status) {
            toast.success("Data Edited Successfully")
            getSubTopic(singleTopicData?.ref)
            setIsLoading(false);
            setFormValue(initValue)
            setIsEdit(false)
        } else {
            toast.error(res?.message || "Something Wrong")
            setIsLoading(false);
        }
    }

    // edit Answer click
    const editAns = () => {
        setIsEdit(true)
        setFormValue((prev) => ({
            ...prev,
            title: subTopicData?.[0]?.chatans?.topicName,
            subtitle: subTopicData?.[0]?.chatans?.title
        }))
    }

    // edit Answer submit
    const ansEdtiSubmit = async () => {
        if (!formValue.topicName) {
            toast.error("Name of Topic is Required")
            return
        }
        const data = {
            ref: singleTopicData?.ref,
            topicName: formValue?.topicName,
            title: formValue?.title
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("update-chatbot/" + singleTopicData?._id, "PUT", data)
        // console.log("Deltt", res)
        if (res && res?.status) {
            toast.success("Data Edited Successfully")
            getSubTopic(singleTopicData?.ref)
            setIsLoading(false);
            setFormValue(initValue)
            setIsEdit(false)
        } else {
            toast.error(res?.message || "Something Wrong")
            setIsLoading(false);
        }
    }


    // delete subtopic
    const deleteSubtopic = async (item) => {
        setIsLoading(true);
        const res = await HttpClient.requestData("delete-main-topic/" + item?._id, "DELETE")
        // console.log("Deltt", res)
        if (res && res?.status) {
            toast.success("Data Deleted Successfully")
            getSubTopic(item?.ref)
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong")
            setIsLoading(false);
        }
    }

    //get main topic  data
    const getMainTopic = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-chat-bot", "POST", {});
        // console.log("resGetCat", res)
        if (res && res?.status) {
            setIsLoading(false);
            setMainTopicData(res?.data)

        } else {
            setIsLoading(false);
        }
    }


    // get Sub topic data
    const getSubTopic = async (id) => {
        const data = {
            "topicID": id
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("view-chat-bot", "POST", data);
        console.log("resGetCatsub", res)

        if (res && res?.status) {
            const resData = res?.data
            setIsLoading(false);
            setSubTopicData(resData);
            setChatType(() => res?.data1 ? res?.data1 : "")
            setIsEdit(false)
            setTopicTitle(res?.title)
        } else {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getMainTopic();
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
                            Add Subtopic
                        </div>

                        <form>
                            <div className="row">

                                {/* Select Topic */}
                                <div className="col-6">
                                    <label htmlFor="formGroupExampleInput">Select Topic</label>
                                    <select
                                        class="form-control"
                                        aria-label="Default select example"
                                        name="topicId"
                                        value={selectedTopicId}
                                        onChange={(e) => {
                                            handleChange(e);
                                            getSubTopic(e.target.value);
                                            const fltData = mainTopicData?.find((ele) => ele?._id === e.target.value)
                                            setSelectedTopic(fltData?.topicName)
                                            setSelectedTopicId(e.target.value)
                                            setFormValue(prev => ({ ...prev, type: "" }))
                                        }}
                                    >
                                        <option value={""} disabled>Select Topic</option>
                                        {mainTopicData?.map((item, i) =>
                                            <option key={i} value={item?._id}>{item?.topicName}</option>
                                        )
                                        }
                                    </select>
                                </div>

                                {/* Select Type */}
                                {
                                    // isAnySubTopic === false && 
                                    chatType === "" &&
                                    <div className="col-6">
                                        <label htmlFor="formGroupExampleInput">Select Type</label>
                                        <select
                                            class="form-control"
                                            aria-label="Default select example"
                                            name="type"
                                            value={formValue.type}
                                            onChange={handleChange}
                                        >

                                            <option value={""} disabled>Select Type</option>
                                            <option value={"Answer"} >Answer</option>
                                            <option value={"Topic"} >Topic</option>

                                        </select>
                                    </div>
                                }
                            </div>

                            {/* Edit Topic Name */}
                            <section>
                                {
                                    (isEdit && chatType === "Topic") &&
                                    <div className="col-6 mt-5 ">
                                        <label htmlFor="formGroupExampleInput">Edit Name of Topic</label>
                                        <div className='d-flex justify-content-between'>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Write The Title Here"
                                                name="topicName"
                                                value={formValue.topicName}
                                                onChange={handleChange}
                                            />
                                            <button
                                                type='button'
                                                className='btn btn-primary ml-1'
                                                onClick={() => TopicEdtiSubmit()}
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                }
                            </section>

                            {/* Edit Answer Name */}
                            <section>
                                {
                                    (isEdit && chatType === "Answer") &&
                                    <div className='mt-5'>
                                        <div className="col-6">
                                            <label htmlFor="formGroupExampleInput">Edit Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Write The Title Here"
                                                name="title"
                                                value={formValue.title}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="formGroupExampleInput">Edit Subtitle</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Write The Subtitle Here"
                                                name="subtitle"
                                                value={formValue.subtitle}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <button
                                            type='button'
                                            className='btn btn-primary ml-3 mt-1 '
                                            onClick={() => TopicEdtiSubmit()}
                                        >
                                            Update
                                        </button>
                                    </div>
                                }
                            </section>

                            {/*if select Answer*/}
                            <section>
                                {
                                    formValue?.type === "Answer" &&
                                    <div className='addMoreBorder'>
                                        <div className='row'>
                                            {/* Title */}
                                            <div className="col mt-3">
                                                <label htmlFor="formGroupExampleInput">Title</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Write The Title Here"
                                                    name="title"
                                                    value={formValue.title}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        {/*Sub title */}
                                        <div className='row'>
                                            <div className="col mt-3">
                                                <label htmlFor="formGroupExampleInput">Subtitle</label>
                                                <textarea
                                                    rows="3"
                                                    className="form-control"
                                                    placeholder="Write The Subtitle Here"
                                                    name="subtitle"
                                                    value={formValue.subtitle}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                }
                            </section>


                            {/*if select topic*/}
                            <section>
                                {
                                    formValue.type === "Topic" &&
                                    <div className='addMoreBorder'>
                                        <div className='row'>
                                            <div className="col mt-2">
                                                <label htmlFor="formGroupExampleInput">Title</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Title"
                                                    name="nameOfInitaitive"
                                                    value={formValue.nameOfInitaitive}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        {/* add more */}
                                        <div>
                                            <button
                                                type='button'
                                                className='btn btn-primary mt-3'
                                                onClick={() => {
                                                    setFormValue(prev => ({ ...prev, addMore: [...formValue?.addMore, initAddMore] }))
                                                }}
                                            >
                                                +
                                            </button>
                                            {
                                                formValue?.addMore?.map((item, i, arr) =>

                                                    <div className='row' key={i}>
                                                        <div className="col mt-2  d-flex justify-content-around align-items-center  ">
                                                            {
                                                                arr.length !== 1 &&
                                                                <div
                                                                    style={{ color: "red", fontSize: "20px", width: "3%", cursor: "pointer" }}
                                                                    onClick={() => {
                                                                        const delArr = formValue?.addMore.filter((ele, ind) => ind !== i);
                                                                        setFormValue(prev => ({ ...prev, addMore: delArr }))

                                                                    }}
                                                                >
                                                                    X
                                                                </div>
                                                            }
                                                            <div style={{ width: "97%" }}>
                                                                <label htmlFor="formGroupExampleInput">Name Of Topic</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Name Of Topic"
                                                                    name="topicName"
                                                                    value={item?.topicName}
                                                                    onChange={(e) => handleChangeAddMore(e, i)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>

                                    </div>
                                }
                            </section>

                            {/* if type is topic */}
                            <section className='mt-5'>
                                {
                                    chatType === "Topic" &&
                                    <div>
                                        {topicTitle && <p>
                                            <strong>Title: </strong><span>{topicTitle}</span>
                                        </p>
                                        }
                                        {
                                            subTopicData?.map((item, i) => {
                                                return (
                                                    <div className='mt-4' key={i}>
                                                        <h5>{item?.topicName}</h5>
                                                        <button
                                                            type='button'
                                                            className='btn btn-success chatBotButton'
                                                            onClick={() => {
                                                                goToSubSubTopic(item)
                                                            }}
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            type='button'
                                                            className='btn btn-warning ml-1 chatBotButton'
                                                            onClick={() => {
                                                                editSubTopic(item)
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            type='button'
                                                            className='btn btn-danger ml-1 chatBotButton'
                                                            onClick={() => {
                                                                deleteSubtopic(item)
                                                            }}
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </section>

                            {/* if type is Answer */}
                            <section className='mt-5'>
                                {/* {
                                    chatType === "Answer" &&
                                    <div>
                                        <p>
                                            <span><strong>Title:</strong> {subTopicData?.[0]?.chatans?.topicName}</span>
                                        </p>
                                        <p>
                                            <span><strong>Subtitle:</strong> {subTopicData?.[0]?.chatans?.title}</span>
                                        </p>
                                    </div>

                                } */}
                                {
                                    chatType === "Answer" &&
                                    <div>

                                        {subTopicData?.[0]?.chatans?.topicName &&
                                            <p>
                                                <span><strong>Title:</strong> {subTopicData?.[0]?.chatans?.topicName}</span>
                                            </p>
                                        }
                                        {
                                            subTopicData?.[0]?.chatans?.title &&
                                            <p>
                                                <span><strong>Subtitle:</strong> {subTopicData?.[0]?.chatans?.title}</span>
                                            </p>
                                        }

                                        {
                                            subTopicData?.[0]?.chatans?.length === 0 &&
                                            <p>No Answer found</p>
                                        }

                                        {/* {
                                            (subTopicData?.[0]?.chatans?.length !== 0) &&
                                            <div>
                                                <button
                                                    type='button'
                                                    className='btn btn-warning ml-1 chatBotButton'
                                                    onClick={() => {
                                                        editAns()
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        } */}
                                    </div>
                                }
                            </section>

                            {/* submit button */}
                            {
                                chatType === "" &&
                                <div class="col-12 d-flex justify-content-end ">
                                    <button
                                        type="submit"
                                        onClick={(e) => {
                                            if (formValue?.type === "Topic") {
                                                handleSubmitTopic(e)
                                            } else if (formValue?.type === "Answer") {

                                                handleSubmitAnswer(e)
                                            }
                                        }}
                                        class="btn btn-primaryb mt-3"
                                        style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                    >
                                        Add Subtopic
                                    </button>
                                </div>
                            }

                        </form>

                    </section>

                </div>
            </div >



        </div >
    )
}

export default AddSubtopic