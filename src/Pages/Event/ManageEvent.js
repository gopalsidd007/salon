import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import toast from 'react-hot-toast';
import DataTable from 'react-data-table-component';
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import HttpClient from '../../utils/HttpClient';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "11px",
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

const ManageEvent = () => {
    const [formValue, setFormValue] = useState({ eventName: '', companyName: '', image: '' });
    const [EventDate, setEventDate] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState({})
    const [imageFile, setimageFile] = useState("");

    const [AllData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    console.log("EventDate", EventDate)

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
            toast.success("Image Uploaded Successfully");
            setFormValue({ ...formValue, image: res.image })
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }


    }
    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
            //width: "3.4rem"
        },
        {
            name: 'Event Date',
            selector: row => row.eventDate,
            //width: "9.6rem"
        },

        {
            name: 'Event Name',
            selector: row => row.eventname,
            //width: "8.9rem"
        },
        {
            name: 'Hosted by',
            selector: row => row.hostedBy,
            // width: "8.9rem"
        },
        {
            name: 'image',
            cell: row => (row.image ? <img alt='no image' src={row.image} style={{ height: "100px", width: "100px", margin: "5px" }} /> : null),
            // width: "8.9rem"
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];
    const getCategoryWiseData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-event", "GET", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({

                sl: i + 1,
                eventDate: moment(item?.eventDate).format("DD-MM-YYYY"),
                eventname: item?.eventName ? item?.eventName : '-',
                hostedBy: item?.hostedBy,
                image: item?.image,
                action: <EditDeleteIcon
                    onClickEdit={(e) => handleEdit(item)}
                    onClickDelete={(e) => handleDelete(item?._id)}
                />
            }));
        } else {
            setIsLoading(false);
        }
        const filteredData = apiData?.filter(item =>
            item?.eventname?.toLowerCase()?.includes(searchInput?.toLowerCase()) ||
            item?.hostedBy?.toLowerCase()?.includes(searchInput?.toLowerCase())


        );
        setAllData(filteredData);
    }
    //Delete event
    const handleDelete = (id) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-event/" + id, "DELETE")
            if (res && res?.status) {
                setIsLoading(false);
                getCategoryWiseData();

                toast.success("Event Deleted Successfully");
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }

    //Edit data
    // click on edit
    const handleEdit = (item) => {
        // navigate("/edit-advocacy", { state: item })
        // window.alert(5)
        window.scrollTo(0, 0)



        setEditData(item);
        setIsEdit(true);
        setFormValue({ ...formValue, eventName: item?.eventName, companyName: item?.hostedBy })
        setEventDate(moment(item?.eventDate).format("YYYY-MM-DD"));
        setimageFile(item?.image)
        console.log("itemsd", item)

    }

    //input change
    // other inputs change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue(prev => ({ ...prev, [name]: value }));
    }
    //Edit submit
    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        // console.log("formValue",formValue);
        e.preventDefault();



        const data = {
            "eventName": formValue.eventName,
            "image": formValue.image,
            "hostedBy": formValue.companyName,
            "eventDate": moment(EventDate).format("YYYY-MM-DD"),


        }
        setIsLoading(true);
        const res = await HttpClient.requestData("update-event/" + editData?._id, "PUT", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Event Data Updated Successfully");
            setFormValue({ eventName: '', companyName: '', image: '' });
            setimageFile("")
            setEventDate('')
            setIsEdit(false)
            setIsLoading(false);
            getCategoryWiseData();
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCategoryWiseData();
    }, [searchInput])
    return (
        <>
            <div className=''>
                <div className="d-flex justify-content-end">
                    <div className="form-header">

                        <CustomLoader loading={isLoading} />
                        {
                            isEdit ? <>
                                <form className=" mb-2 ">
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="formGroupExampleInput" className='edit-tag'>
                                                Event Name</label>
                                            <span style={{ color: "red" }}>*</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Event Name"
                                                name="eventName"
                                                value={formValue.eventName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="formGroupExampleInput" className='edit-tag'>
                                                Company Name
                                                <span style={{ color: "red" }}>*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Company Name"
                                                name="companyName"
                                                value={formValue.companyName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div class="col-12 mt-2">
                                            <label for="inputEmail4" class="form-label edit-tag" >
                                                Event Date
                                            </label>
                                            <span style={{ color: "red" }}>*</span>
                                            <input
                                                type="date"
                                                className="form-control w-50"

                                                onChange={(e) => setEventDate(e.target.value)}
                                                value={moment(EventDate).format("YYYY-MM-DD")}

                                            />
                                        </div>

                                    </div>


                                    <div className="row" style={{ marginTop: "10px" }}>
                                        <div className="col">
                                            <label htmlFor="formGroupExampleInput" className='edit-tag'>Image:</label>
                                            <input
                                                type="file"
                                                onChange={handleImage}
                                            />
                                            <br></br>
                                            {imageFile && (
                                                <div >
                                                    <img
                                                        alt="not found"
                                                        width={"250px"}
                                                        src={imageFile}
                                                    />
                                                    <br />
                                                    <button className=" mt-1 btn-danger p-1 rounded" style={{ marginLeft: "180px" }} onClick={() => setimageFile(null)}>Remove</button>
                                                </div>
                                            )}
                                        </div>

                                    </div>

                                    <div class="col-12 d-flex justify-content-end ">

                                        <button
                                            type="submit"
                                            onClick={(e) => handleSubmit(e)}
                                            className="btn btn-primaryb mt-3 rounded btn-grad"
                                        //style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                        >
                                            Update Event
                                        </button>
                                        <button
                                            type="submit"
                                            onClick={(e) => setIsEdit(false)}
                                            className="btn btn-danger mt-3 mx-2 rounded "

                                        >
                                            Cancel
                                        </button>


                                    </div>


                                </form>
                            </> : ''
                        }
                        <section className="piechartsBox_area">
                            <div
                                style={headLineStyle}
                                className="page-headline"
                            >
                                Event Data
                            </div>
                            <div className=" d-flex justify-content-end mb-2" >
                                <div className="Search_box">
                                    <form className="form-inline">
                                        <input
                                            className="form-control h-75"
                                            type="search"
                                            placeholder="Search"
                                            aria-label="Search"
                                            value={searchInput}
                                            onChange={(e) => setSearchInput(e.target.value)}
                                        />
                                        <div className="Search_icon">
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <form >

                                <div className=' container '>

                                    <DataTable

                                        columns={columns}
                                        data={AllData}
                                        pagination
                                        striped
                                        className="rounded your-data-table"
                                        customStyles={customStyles}
                                    />
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageEvent