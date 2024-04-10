import React, { useState, useEffect } from 'react'
import HttpClient from '../../utils/HttpClient';
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import toast from 'react-hot-toast';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import DataTable from 'react-data-table-component';
import { ImCross } from "react-icons/im";
import { useNavigate } from 'react-router-dom';

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

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"

}

const AddCheckListDay = () => {
    const [catName, setCatName] = useState()
    const [isLoading, setIsLoading] = useState(false);

    //view table data
    const [tableData, setTableData] = useState([]);

    //Edit data state
    const [editData, setEditData] = useState({})
    console.log("editData", editData)
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate()

    //Add data
    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (!catName) {
            return toast.error("Category Name is Required");
        }

        const data = {
            name: catName
        }
        // console.log(data);
        // return false
        setIsLoading(true);
        const res = await HttpClient.requestData("add-checklist-day", "POST", data);
        // console.log("resCat", res)
        // return false
        if (res && res?.status) {
            toast.success("Checklist Day Added Successfully");
            setCatName("");
            // navigate('/manage-category');
            setIsLoading(false);
            navigate("/add-checklist")
        } else {
            toast.error(res?.message);
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        // console.log("pallab", e.target.value)
        setCatName(e.target.value)
    }

    //View ,edit delete

    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
        },
        {
            name: 'Day Name',
            selector: row => row.name,
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];

    // fetch Category DAta
    const getCategoryData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData('view-checklist-day', "GET", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({
                id: i + 1,
                sl: i + 1,
                name: item?.name,
                action: <EditDeleteIcon
                    onClickEdit={(e) => handleEdit(item)}
                    onClickDelete={(e) => handleDelete(item?._id)}
                />
            }));
        } else {
            setIsLoading(false);
        }
        setTableData(apiData);
    }

    // edit
    const handleEdit = (item) => {
        //navigate("/edit-checklist-day", { state: item })
        setEditData(item);
        setIsEdit(true)
        setCatName(item?.name)
    }

    const handleisEditSubmit = async (e) => {
        e.preventDefault();

        if (!catName) {
            return toast.error("Category Name is Required");
        }

        const data = {
            name: catName
        }

        setIsLoading(true);
        const res = await HttpClient.requestData(`update-checklist-day/${editData?._id}`, "PUT", data);
        if (res && res?.status) {
            toast.success("Category Updated Successfully")

            setIsLoading(false);
            setIsEdit(false)
            setCatName("")
            getCategoryData()
        } else {
            toast.error(res?.message)
            setIsLoading(false);
        }

    };
    const handleisCancelSubmit = (e) => {
        setIsEdit(false);
        setCatName("")
    }
    // delete
    const handleDelete = (id) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-checklist-day/" + id, "DELETE")
            if (res && res?.status) {
                setIsLoading(false);
                getCategoryData();

                toast.success("Work Deleted Successfully");
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }


    useEffect(() => {
        getCategoryData();
    }, [])

    return (
        <div>

            <div className="d-flex justify-content-end ">


                <CustomLoader loading={isLoading} />

                {/* form */}
                <div className="form-header">
                    <section className="piechartsBox_area">
                        <div
                            style={headLineStyle}
                            className="page-headline"
                        >
                            Add & Manage Checklist
                        </div>

                        <form class="row g-3 m-2 ">

                            <div class="col-9">
                                <label for="inputEmail4"  className={isEdit ? "edit-tag" : "form-label"}>
                                    Name
                                </label>
                                <span style={{ color: "red" }}>*</span>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Checklist Name"
                                    onChange={handleChange}
                                    value={catName}
                                    name="category"
                                    id="inputEmail4"
                                />
                            </div>

                            <div class="col-3 mt-3 ">
                                {isEdit ? <>
                                    <div className="d-flex ">
                                        <button
                                            type="submit"
                                            onClick={(e) => handleisEditSubmit(e)}
                                            className="btn  mt-3 btn-grad"
                                        //style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                        >
                                            Update List
                                        </button>
                                        <ImCross onClick={(e) => handleisCancelSubmit(e)} style={{ fontSize: "26px", cursor: "pointer" }} className=" mx-3 mt-4 text-danger " />
                                    </div>

                                </>
                                    : <button
                                        type="submit"
                                        onClick={(e) => handleSubmit(e)}
                                        class="btn btn-primaryb mt-3"
                                        style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                    >
                                        Add list
                                    </button>}

                            </div>
                        </form>
                    </section>
                </div>

            </div>


            {/* table */}
            <div className="datatable-view ">

                <div
                    style={headLineStyle}
                    className="page-headline"
                >
                    View & Manage Checklist
                </div>

                <DataTable
                    columns={columns}
                    data={tableData}
                    pagination
                    striped
                    customStyles={customStyles}
                />
            </div>

        </div>
    )
}

export default AddCheckListDay;