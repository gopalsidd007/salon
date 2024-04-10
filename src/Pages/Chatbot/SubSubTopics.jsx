import React, { useEffect, useMemo, useState } from 'react'
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import toast from 'react-hot-toast';
import HttpClient from '../../utils/HttpClient';
import DataTable from 'react-data-table-component';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import { useLocation, useNavigate } from 'react-router-dom';

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"

}

const customStyles = {
    rows: {
        style: {
            minHeight: '48px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            backgroundColor: '#cee0eb', // set the background color for head cells
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};


const SubSubTopics = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const locationData = location?.state?.data ? JSON.parse(location?.state?.data) : []
    const locationTopicName = location?.state?.topicName ? JSON.parse(location?.state?.topicName) : []

    console.log("locationTopicName", locationTopicName)

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

    const [formValue, setFormValue] = useState(initValue);
    const [subTopicData, setSubTopicData] = useState([]);
    const [isAnySubTopic, setIsAnySubTopic] = useState(false);
    const [chatType, setChatType] = useState("");
    const [isEdit, setIsEdit] = useState("");
    const [singleTopicData, setSingleTopicData] = useState({});
    const [topicTitle, setTopicTitle] = useState("");


    console.log("subTopicData", subTopicData)


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

    // add more validation
    const validateAddMore = () => {
        return formValue?.addMore?.every((item) => item?.topicName !== "")
    }
    console.log("validateAddMore", validateAddMore())


    // validate
    const validateTopic = () => {
        if (!formValue?.type) {
            toast.error("Please Select a Type");
            return true
        }
        if (!formValue?.title) {
            toast.error("Title is Required");
            return true
        }
        if (!validateAddMore()) {
            toast.error("Topic Name is Required");
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
        e.preventDefault();

        if (validateTopic()) {
            return
        }

        const data = {
            "ref": locationData[locationData?.length - 1],
            "type": formValue.type,
            "title": formValue.title,
            "data": formValue.addMore
        }

        setIsLoading(true);
        const res = await HttpClient.requestData("add-chat-bot-topic", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Data Added Successfully");
            setFormValue(initValue);
            getSubTopic(locationData[locationData?.length - 1])
            // navigate(-1)
            // navigate('/manage-category');
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    };

    // Submit Answer data
    const handleSubmitAnswer = async () => {
        // if (validateTopic()) {
        //     return
        // }

        const data = {
            "ref": locationData[locationData?.length - 1],
            "type": formValue.type,
            "title": formValue.subtitle,
            "topicName": formValue.title
        }

        setIsLoading(true);
        const res = await HttpClient.requestData("add-chat-bot-topic", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Data Added Successfully");
            setFormValue(initValue);
            getSubTopic(locationData[locationData?.length - 1])
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    }

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
            setSubTopicData(resData)
            setChatType(() => res?.data1 ? res?.data1 : "")
            setTopicTitle(res?.title)
        } else {
            setIsLoading(false);
        }
    }

    // go to sub sub topic
    const goToSubSubTopic = (item) => {
        navigate(`/add-sub-subtopic`, {
            state: {
                data: JSON.stringify([...locationData, item?._id]),
                topicName: JSON.stringify([...locationTopicName, item?.topicName])
            }
        })
    }

    // edit topic click
    const editSubTopic = (item) => {
        // console.log("itemedit", item)
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
        // console.log("itemedit", item)
        // setIsEdit(true)
        // setSingleTopicData(item);
        // setFormValue((prev) => ({
        //     ...prev,
        //     topicName: item?.topicName
        // }))
    }

    // edit Answer submit
    const ansEdtiSubmit = async () => {
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


    useEffect(() => {
        if (locationData?.length !== 0) {
            getSubTopic(locationData[locationData?.length - 1]);
        }
    }, [location])


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
                            Add Sub-Subtopics
                        </div>

                        <div>
                            <button
                                className='btn btn-secondary'
                                onClick={() => navigate(-1)}
                            >
                                <i class="fa-solid fa-arrow-left-long"></i> back
                            </button>
                        </div>

                        <div className='mb-3'>
                            {
                                locationTopicName?.map((item, i, arr) =>
                                    <span key={i}>
                                        {item + " "}
                                        {i !== arr?.length - 1 &&
                                            <span className='mx-1' style={{ fontSize: "22px" }}>{" > "}</span>
                                        }
                                    </span>
                                )
                            }
                        </div>

                        <form>
                            <div className="row">

                                {/* Select Topic */}
                                {/* <div className="col-6">
                                    <label htmlFor="formGroupExampleInput">Select Topic</label>
                                    <select
                                        class="form-control"
                                        aria-label="Default select example"
                                        name="topicId"
                                        value={formValue.topicId}
                                        onChange={(e) => {
                                            handleChange(e);
                                            getSubTopic(e.target.value);
                                        }}
                                    >
                                        <option value={""} disabled>Select Topic</option>
                                        {mainTopicData?.map((item, i) =>
                                            <option key={i} value={item?._id}>{item?.topicName}</option>
                                        )
                                        }
                                    </select>
                                </div> */}


                                {/* Select Type */}
                                {
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

                            {/* Edit Topic title */}
                            <section>
                                {
                                    (isEdit && chatType !== "") &&
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


                            {/* if Select Answer */}
                            <section>
                                {
                                    formValue?.type === "Answer"
                                    &&
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

                                        {/*Subtitle */}
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
                                    formValue.type === "Topic"
                                    &&
                                    <div className='addMoreBorder'>
                                        <div className='row'>
                                            <div className="col mt-2">
                                                <label htmlFor="formGroupExampleInput">Title</label>
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
                            <section>
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
                                                        <h6>{item?.topicName}</h6>
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
                                            !subTopicData?.[0]?.chatans?.length === 0 &&
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
                            <div class="col-12 d-flex justify-content-end ">
                                {
                                    chatType === "" &&
                                    <button
                                        type="button"
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
                                        Add Sub-Subtopics
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

export default SubSubTopics