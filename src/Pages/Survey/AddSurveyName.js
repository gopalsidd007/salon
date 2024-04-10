import React, { useEffect, useState } from 'react'
import { ImCross } from "react-icons/im";
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import toast from 'react-hot-toast';
import HttpClient from '../../utils/HttpClient';
import DataTable from 'react-data-table-component';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import moment from 'moment';



const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"

}

const AddSurveyName = () => {
    const [catName, setCatName] = useState()
    const [editData, setEditData] = useState({})
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [surveyStartDate, setsurveyStartDate] = useState('');
    const [surveyEndDate, setsurveyEndDate] = useState('');
    const [tableData, setTableData] = useState([]);
    console.log(surveyStartDate, surveyEndDate, "Date")
    console.log("editData", editData)
    console.log("Data", surveyStartDate, surveyEndDate)


    //catName value
    const handleChange = (e) => {
        // console.log("supriti", e.target.value)
        setCatName(e.target.value)
    }
    //Submit add data
    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();
        const startDate = new Date(surveyStartDate);
        const endDate = new Date(surveyEndDate);

        if (!catName) {
            return toast.error("Survey Name is Required");
        }
        if (!surveyStartDate) {
            return toast.error("Enter Start Date");
        }
        if (!surveyEndDate) {
            return toast.error("Enter End Date");
        }
        if (startDate > endDate) {
            return toast.error("End date cannot be before the start date");
             
        }
        


        const data = {
            name: catName,
            surveyStartDate: moment(surveyStartDate).format("DD/MM/YYYY"),
            surveyEndDate: moment(surveyEndDate).format("DD/MM/YYYY")
            // surveyNameId: surveyNameId
        }
        // console.log(data);
        // return false
        setIsLoading(true);
        const res = await HttpClient.requestData("add-survey-Name", "POST", data);
        // console.log("resCat", res)
        // return false
        if (res && res?.status) {
            toast.success("survey name Added Successfully");
            setCatName("");
            setsurveyStartDate('')
            setsurveyEndDate('')
            // navigate('/manage-category');
            getCategoryData();
            setIsLoading(false);
        } else {
            toast.error(res?.message);
            setIsLoading(false);
        }
    };

    //*************VIEW SURVEY DATA**************//

    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
            width:"6rem"
        },
        {
            name: 'Survey Name',
            selector: row => row.name,
            width:"26rem"
        },
        ,
        {
            name: 'Start Date',
            selector: row => row.StartDate,
        },
        ,
        {
            name: 'End Date',
            selector: row => row.EndDate,
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];

    // fetch Category DAta
    const getCategoryData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData('view-survey-Name', "GET", {});
        // console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({
                id: i + 1,
                sl: i + 1,
                name: item?.name,
                StartDate: item?.surveyStartDate,
                EndDate: item?.surveyEndDate,
                action: <EditDeleteIcon
                    onClickEdit={(e) => handleEdit(item)}
                    onClickDelete={(e) => handleDelete(item?._id)}
                />
            }));
        } else {
            setIsLoading(false);
        }
        setTableData(apiData.reverse());
    }

    // edit
    const handleEdit = (item) => {
        setIsEdit(true)
        //navigate("/edit-category/" + id)
        window.scrollTo(0, 0)
        console.log(item, "itemmm", moment(item?.surveyStartDate).format(""), moment(item?.surveyEndDate).format("YYYY-MM-DD"))
        setEditData(item);
        setCatName(item?.name);
        setsurveyStartDate(moment(item?.surveyStartDate, "DD/MM/YYYY").format("YYYY-MM-DD"));
        setsurveyEndDate(moment(item?.surveyEndDate, "DD/MM/YYYY").format("YYYY-MM-DD"));

    }
    //edit submit
    const handleEditSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (!catName) {
            return toast.error("Survey Name is Required");
        }
        if (!surveyStartDate) {
            return toast.error("Enter Start Date");
        }
        if (!surveyEndDate) {
            return toast.error("Enter End Date");
        }


        const data = {
            name: catName,
            surveyStartDate: moment(surveyStartDate).format("DD/MM/YYYY"),
            surveyEndDate: moment(surveyEndDate).format("DD/MM/YYYY")
            // surveyNameId: surveyNameId
        }
        // console.log(data);
        // return false
        setIsLoading(true);
        const res = await HttpClient.requestData("update-survey-Name/" + editData?._id, "PUT", data);
        // console.log("resCat", res)
        // return false
        if (res && res?.status) {
            toast.success("survey name Added Successfully");
            setCatName("");
            setsurveyStartDate('')
            setsurveyEndDate('')
            // navigate('/manage-category');
            getCategoryData();
            setIsLoading(false);
            setIsEdit(false)
        } else {
            toast.error(res?.message);
            setIsLoading(false);
        }
    };

    // delete
    const handleDelete = (id) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-survey-Name/" + id, "DELETE")
            if (res && res?.status) {
                getCategoryData();
                toast.success("Deleted Successfully");
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }

    const handleisCancelSubmit = (e) => {
        setIsEdit(false);
        setCatName("")
        setsurveyStartDate('')
        setsurveyEndDate('')
    }

    useEffect(() => {
        getCategoryData();
    }, [])

    return (
        <div>

            <div className="d-flex justify-content-end">


                <CustomLoader loading={isLoading} />

                {/* form */}
                <div className="form-header">
                    <section className="piechartsBox_area">
                        <div
                            style={headLineStyle}
                            className="page-headline"
                        >
                            Add Survey Name
                        </div>

                        <form class="row g-3 m-2">
                            <div class="col-md-12">
                                {isEdit ? <label for="inputEmail4" className="form-label edit-tag">
                                    Survey Name
                                </label> : <label for="inputEmail4" className="form-label ">
                                    Survey Name
                                </label>}
                                <span style={{ color: "red" }}>*</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Survey Name"
                                    onChange={handleChange}
                                    value={catName}
                                    name="catName"
                                />
                            </div>
                            <div class="col-md-6">
                                {isEdit ? <label for="inputEmail4" className="form-label edit-tag">
                                    Start Date
                                </label> : <label for="inputEmail4" className="form-label ">
                                    Start Date
                                </label>}

                                <span style={{ color: "red" }}>*</span>
                                <input
                                    type="date"
                                    className="form-control"

                                    onChange={(e) => setsurveyStartDate(e.target.value)}
                                    value={surveyStartDate}

                                />
                            </div>
                            <div class="col-md-6">
                                {isEdit ? <label for="inputEmail4" className="form-label edit-tag">
                                    End Date
                                </label> : <label for="inputEmail4" className="form-label ">
                                    End Date
                                </label>}

                                <span style={{ color: "red" }}>*</span>
                                <input
                                    type="date"
                                    className="form-control"

                                    onChange={(e) => setsurveyEndDate(e.target.value)}
                                    value={surveyEndDate}

                                />
                            </div>

                            <div class="col-12 d-flex justify-content-end ">
                                {isEdit ? <>
                                    <div className="d-flex ">

                                        <button
                                            type="submit"
                                            onClick={(e) => handleEditSubmit(e)}
                                            className="btn btn-primaryb mt-3 btn-grad"
                                        //style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                        >
                                            Update Survey Name
                                        </button>
                                        <ImCross onClick={(e) => handleisCancelSubmit(e)} style={{ fontSize: "25px", cursor: "pointer" }} className=" mx-3 mt-4 text-danger " />

                                    </div>


                                </>
                                    : <button
                                        type="submit"
                                        onClick={(e) => handleSubmit(e)}
                                        class="btn btn-primaryb mt-3"
                                        style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                    >
                                        Add Survey Name
                                    </button>}
                            </div>
                        </form>
                    </section>
                </div>

            </div>


            <div className="datatable-view ">

                <div
                    style={headLineStyle}
                    className="page-headline"
                >
                    View & Manage Survey List
                </div>

                <DataTable
                    columns={columns}
                    data={tableData}
                    pagination
                    striped
                />
            </div>

        </div>
    )
}

export default AddSurveyName