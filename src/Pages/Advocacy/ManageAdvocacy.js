// import { Box, Button, Select, TextField, SelectChangeEvent, InputLabel, Skeleton } from "@mui/material";

import { useEffect, useState } from "react";
import HttpClient, { IMAGE_URL } from "../../utils/HttpClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import CustomLoader from "../../CustomComponents/loader/CustomLoader";
import DataTable from 'react-data-table-component';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';

const customStyles = {
    // rows: {
    //     style: {
    //         minHeight: '48px', // override the row height
    //     },
    // },
    headCells: {
        style: {
            // paddingLeft: '8px', // override the cell padding for head cells
            // paddingRight: '8px',
            backgroundColor: '#cee0eb', // set the background color for head cells
        },
    },
    // cells: {
    //     style: {
    //         paddingLeft: '8px', // override the cell padding for data cells
    //         paddingRight: '8px',
    //     },
    // },
};

const ManageAdvocacy = ({ handleEdit }) => {
    const [isLoading, setIsLoading] = useState(false);

    const [catName, setCatName] = useState()
    const [catData, setCatData] = useState([]);
    const [AllData, setAllData] = useState([]);
    const [imageLoader, setImgLoader] = useState(false);
    const [catID, setCatID] = useState("");
    const [isDelete, setIsDelete] = useState(true);

    console.log(catID, "CatID")


    // other inputs change
    const handleChange = (e) => {
        setCatID(e.target.value)
        e.target.value && getCategoryWiseData(e.target.value)

    }

    // get category data
    const getCategoryData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-advocacy-category", "GET", {});
        console.log("resCat", res);
        if (res && res?.status) {
            setIsLoading(false);
            setCatData(res?.data);
        } else {
            setIsLoading(false);
            toast(res?.message)
        }
    }


    const getCategoryWiseData = async (id) => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-advocacy/" + id, "GET", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({
                id: i + 1,
                sl: i + 1,
                name: item?.AdvocacyName,
                image: <img src={item?.image} style={{ height: "100px", width: "100px", margin: "5px" }} />,
                action: <EditDeleteIcon
                    onClickEdit={(e) => handleEdit(item)}
                    onClickDelete={(e) => handleDelete(item?._id)}
                />
            }));
        } else {
            setIsLoading(false);
        }
        setAllData(apiData);
    }


    // delete
    const handleDelete = (id) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-advocacy/" + id, "DELETE")
            if (res && res?.status) {
                setIsDelete(prev => !prev);
                toast.success("Advocacy Deleted Successfully");
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }

    // column
    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
            width:"6rem"
        },
        {
            name: 'Advocacy Name',
            selector: row => row.name,
            width:"40rem"
        },
        {
            name: 'Image ',
            selector: row => row.image,
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];

    useEffect(() => {
        getCategoryData();
    }, [])

    useEffect(() => {
        getCategoryWiseData(catID);
    }, [isDelete, catID])




    return (
        <div className="d-flex justify-content-end">
            <div className="form-header">

                <CustomLoader loading={isLoading} />
                <div className="three mb-1">
                    <h5>View & Manage Advocacy</h5>
                </div>
                <section className="piechartsBox_area">

                    <form>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="formGroupExampleInput">Select Category</label>
                                <select
                                    class="form-control"
                                    aria-label="Default select example"
                                    name="catID"
                                    value={catID}
                                    onChange={handleChange}
                                >   const [imageFile, setimageFile] = useState("")
                                    <option value={""} disabled>Select Category</option>
                                    {catData.map((item, i) =>
                                        <option key={i} value={item?._id}>{item?.categoryName}</option>
                                    )
                                    }
                                </select>
                            </div>

                        </div>

                        <br />
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
                    </form>
                </section>
            </div>
        </div>

    );
};

export default ManageAdvocacy
