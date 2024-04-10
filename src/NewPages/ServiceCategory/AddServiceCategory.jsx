import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import CustomLoader from '../../CustomComponents/loader/CustomLoader'
import toast from 'react-hot-toast'
import DataTable from 'react-data-table-component'
import PieChartsBox from '../../View/Home/PieChartsBox'

import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon'
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal'
import HttpClient from '../../utils/HttpClient'
import { computeHeadingLevel } from '@testing-library/react'

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"

}
const customStyles = {

    headCells: {
        style: {
            // paddingLeft: '8px', // override the cell padding for head cells
            // paddingRight: '8px',
            backgroundColor: '#cee0eb', // set the background color for head cells
        },
    },

};

const AddServiceCategory = () => {
    const [AllData, setAllData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [checked, setChecked] = useState('')
    const [EditID, setEditID] = useState('')
    const [question, setQuestion] = useState("")
    const [questionAnswerData, setquestionAnswerData] = useState(['', '']);

    // const [data, setdata] = useState({
    //     Eventname: "",
    //     HostedBy: "",
    //     Date: "",
    //     image: ""
    // })

    const [data,setData]=useState({
        category:"",
        description:""
    })
    

    // console.log(data)

    const validate=()=>{
        if (!data?.category) {
            toast.error("Category is required");
            return true
        }
        if (!data?.description) {
            toast.error("Description is required");
            return true
        }

        return false
    }


    // useEffect(() => {
    //     getCategoryData();
    // }, [])

    // >>>Data Table Column<<<
    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
            width: "3.4rem"
        },
        {
            name: 'Question',
            selector: row => row.surveyQuestion,
            width: "35.7rem"
        },
        {
            name: 'Ans-1',
            selector: row => row.A,
            width: "7.4rem"
        },
        {
            name: 'Ans-2',
            selector: row => row.B,
            width: "7.4rem"
        },
        {
            name: 'Ans-3',
            selector: row => row.C,
            width: "7.4rem"
        },
        {
            name: 'Ans-4',
            selector: row => row.D,
            width: "7.4rem"
        },
        {
            name: 'Action',
            selector: row => row.action,
            width: "7.4rem"
        },

    ];

    // fetch Category DAta
    const getCategoryData = async () => {
        // alert("fjdfds")
        // setIsLoading(true);
        const res = await HttpClient.requestData('get-login-survey', "GET",);
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            // setIsLoading(false);
            apiData = res?.data?.reverse()?.map((item, i) => ({
                id: i + 1,
                sl: i + 1,
                surveyQuestion: item?.surveyQuestion,
                A: item?.A,
                B: item?.B,
                C: item?.C ? item?.C : "N/A",
                D: item?.D ? item?.D : "N/A",
                action: <EditDeleteIcon
                    onClickEdit={(e) => handleEdit(item)}
                    onClickDelete={(e) => handleDelete(item?._id)}
                />
            }));
        } else {
            // setIsLoading(false);
        }
        setAllData(apiData);
    }

    // >>>Handle Edit Data<<<
    const handleEdit = (item) => {
        console.log(item, "itemEdit")
        setIsEdit(true);
        setQuestion(item?.surveyQuestion)
        setEditID(item?._id)

    }

    //handle delete question
    const handleDelete = async (id) => {
        const del = async () => {

            const res = await HttpClient.requestData("delete-login-survey/" + id, "PUT")
            if (res && res?.status) {
                getCategoryData()
                toast.success("Question Deleted Successfully");
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }
        DeleteConfirmModal(del);
    }



    // onchange
    const handleOutput = (e) => {
        // e.preventDefault()
        setData({ ...data, [e.target.name]: e.target.value })
        // console.log(e.target.value)


    }
    

    // console.log(data)

    // const handleSubmit = async () => {



    //     const SubmitData = {
    //         "eventName": data?.Eventname,
    //         "image": "https://elites3bkt.s3.ap-south-1.amazonaws.com/image/70c55680-5d28-11ee-8f63-351316ec0e51.jpg",
    //         "hostedBy": data?.HostedBy,
    //         "eventDate": data?.Date
    //     }

    //     console.log("subDAta", SubmitData)
    // }

const handleSubmit=(e)=>{
    e.preventDefault();

    if (validate()) {
        return 
    }

    console.log("data",data)
    
}


  

    return (
        <div>
            <div className="d-flex justify-content-end">

                {/* <CustomLoader loading={isLoading} /> */}
                <div className="form-header">
                    <section className="piechartsBox_area">
                        <div
                            style={headLineStyle}
                            className="page-headline"
                        >
                            {/* {isEdit ? "Edit Question & Answer" : "Add Question & Answer"} */}

                            "Add Service Category"
                        </div>



                        <form class="row g-3 m-2">

                            {/* category */}
                            <div class="col-md-6">
                                <label for="inputEmail4" className="form-label edit-tag">
                                    Category
                                </label>

                                <span style={{ color: "red" }}>*</span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="EventName"
                                    // onChange={(e) => setQuestion(e.target.value)}
                                    onChange={handleOutput}
                                    value={data.category}
                                    name="category"
                                />

                            </div>

                            {/* description*/}
                            <div class="col-md-6">
                                <label for="inputEmail4" className={`form-label ${isEdit ? 'edit-tag' : ''}`}   >
                                    Description
                                </label>

                                <span style={{ color: "red" }}>*</span>
                                <div className=' d-flex '>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder=''
                                        // onChange={(e) => handleChange(e)}
                                        onChange={handleOutput}
                                        value={data.description}
                                        name="description"
                                    />
                                </div>

                            </div>




                            {/*Date*/}
                            {/* <div class="col-md-6">
                                <label for="inputEmail4" className={`form-label ${isEdit ? 'edit-tag' : ''}`}   >
                                    Date
                                </label>

                                <span style={{ color: "red" }}>*</span>
                                <div className=' d-flex '>
                                    <input
                                        type="date"
                                        className="form-control"
                                        placeholder=''
                                        // onChange={(e) => handleChange(e, index)}
                                        onChange={handleOutput}
                                        value={data.Date}
                                        name="Date"
                                    />
                                </div>

                            </div> */}

                            {/*Image*/}

                            <div class="col-md-6">
                                <label for="inputEmail4" className={`form-label ${isEdit ? 'edit-tag' : ''}`}   >
                                    Image
                                </label>

                                <span style={{ color: "red" }}>*</span>
                                <div className=' d-flex '>
                                    <input
                                        type="file"
                                        accept='image/png,image/jpeg,image/jpg'
                                        className="form-control"
                                        placeholder=''
                                        // onChange={(e) => handleChange(e, index)}
                                        //  value={}
                                        name="answer1"
                                    />
                                </div>

                            </div>
                        </form>





                        <div class="col-12 d-flex justify-content-between  ">

                            {/* button */}
                            <div>
                                <button
                                    onClick={(e) => handleSubmit(e)}

                                    class="btn btn-primaryb mt-3"
                                    style={{ background: "linear-gradient(195deg, rgb(150, 86, 44), rgb(25, 25, 25))", color: "#fff" }}
                                >
                                    Add Service
                                </button>
                            </div>

                        </div>

                    </section>


                    {/* datatable */}
                    <section>
                        <div
                            style={headLineStyle}
                            className="page-headline"
                        >
                            View Question & Answer
                        </div>
                        <div>
                            <DataTable
                                columns={columns}
                                data={AllData}
                                pagination
                                striped
                                className=" rounded "
                                customStyles={customStyles}
                            />
                        </div>
                    </section>
                </div>


            </div>

        </div>
    )
}

export default AddServiceCategory