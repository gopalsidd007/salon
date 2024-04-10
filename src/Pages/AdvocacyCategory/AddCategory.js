

import { useEffect, useState } from "react";
import HttpClient from "../../utils/HttpClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CustomLoader from "../../CustomComponents/loader/CustomLoader";
import DataTable from 'react-data-table-component';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"

}
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


const AddAdvocacyCategory = () => {

    const [catName, setCatName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);



    //Edit
    const [editData, setEditData] = useState({})
    console.log("editData", editData)
    const [isEdit, setIsEdit] = useState(false);


    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (!catName) {
            return toast.error("Category Name is Required");
        }

        const data = {
            categoryName: catName
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("add-advocacy-category", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Category Added Successfully");
            setCatName("");
            // navigate('/manage-category');
            setIsLoading(false);
            getCategoryData()
        } else {
            toast.error("Advocacy Category already exists");
            setIsLoading(false);
        }
    };

    //Update submit
    const handleisEditSubmit = async (e) => {
        e.preventDefault();

        if (!catName) {
            return toast.error("Category Name is Required");
        }

        const data = {
            categoryName: catName
        }

        setIsLoading(true);
        const res = await HttpClient.requestData(`update-advocacy-category/${editData?._id}`, "PUT", data);
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
    }
    //cancel edit
    const handleCancel = (e) => {
        setIsEdit(false);
        setCatName('')
    }

    const handleChange = (e) => {
        // console.log("pallab", e.target.value)
        setCatName(e.target.value)
    }

    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
        },
        {
            name: 'Advocacy Category',
            selector: row => row.name,
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];

    // fetch Category DAta
    const getCategoryData = async () => {
        // alert("fjdfds")
        setIsLoading(true);
        const res = await HttpClient.requestData('view-advocacy-category', "GET",);
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({
                id: i + 1,
                sl: i + 1,
                name: item?.categoryName,
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
        window.scrollTo(0, 0)
        //console.log(item)
        setEditData(item)
        setIsEdit(true)
        setCatName(item?.categoryName)

    }

    // delete
    const handleDelete = (id) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-advocacy-category/" + id, "DELETE")
            if (res && res?.status) {
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
        <div >

            <div className="d-flex justify-content-end ">


                <CustomLoader loading={isLoading} />

                {/* form */}
                <div className="form-header">
                    <section className="piechartsBox_area">
                        <div
                            style={headLineStyle}
                            className="page-headline"
                        >
                            Add Advocacy Category
                        </div>

                        <form class="row m-2">
                            <div class="col-9">
                                <label for="inputEmail4" className={isEdit ? "edit-tag" : "form-label"}>
                                    Name
                                </label>
                                <span style={{ color: "red" }}>*</span>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Category Name"
                                    onChange={handleChange}
                                    value={catName}
                                    name="category"
                                    id="inputEmail4"
                                />
                            </div>

                            <div class="col-3 mt-3 d-flex justify-content-end ">
                                {isEdit ? <div className=" d-flex ">
                                    <button
                                        type="submit"
                                        onClick={(e) => handleisEditSubmit(e)}
                                        className="btn btn-primaryb mt-3 btn-grad"
                                    //style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                    >
                                        Update list
                                    </button>  <button
                                        type="submit"
                                        onClick={(e) => handleCancel(e)}
                                        className="btn btn-danger mt-3 btn-grad-cancel px-2 mx-4"
                                    //style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                    > Cancel
                                    </button>
                                </div> : <button
                                    type="submit"
                                    onClick={(e) => handleSubmit(e)}
                                    className="btn btn-primaryb mt-3"
                                    style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                >
                                    Submit
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
                    View & Manage Advocacy Category
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
    );
};


export default AddAdvocacyCategory;
