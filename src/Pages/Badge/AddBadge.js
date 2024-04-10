
import React, { useEffect, useState } from 'react'
import CustomLoader from '../../CustomComponents/loader/CustomLoader'
import HttpClient from '../../utils/HttpClient';
import toast from 'react-hot-toast';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import DataTable from 'react-data-table-component';
import { ImCross } from 'react-icons/im';
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
const AddBadge = () => {
    const [catName, setCatName] = useState()
    const [themeColor, setThemeColor] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [updateID, setupdateID] = useState('');

    console.log(themeColor, "themeColor")

    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (!catName) {
            return toast.error("Please put your Badge Name");
        }
        if (!themeColor) {
            return toast.error("Please put your Badge color");
        }

        const data = {
            badgename: catName,
            color: themeColor
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("badge-create-by-company-admin", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Badge Added Successfully");
            setCatName("");
            // navigate('/manage-category');
            setIsLoading(false);
            getCategoryData()
        } else {
            toast.error(res?.message);
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        // console.log("pallab", e.target.value)
        setCatName(e.target.value)
    }

    //View badge data
    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
        },
        {
            name: 'Badge Name',
            selector: row => row.link,
        },
        {
            name: 'Color Code',
            selector: row => row.colorCode,
        },
        {
            name: 'Badge Color',
            selector: row => row.color,

        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];

    // fetch Category DAta
    const getCategoryData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData('view-all-badge', "GET", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({

                sl: i + 1,
                link: item?.badgename,
                colorCode: item?.color,
                color: <div className=" mt-2 mb-2 rounded mx-2" style={{ width: "25px", height: "25px", background: item?.color, display: "flex", fontWeight: "bolder" }}>
                </div>,
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
    //Delete
    const handleDelete = (id) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-badge-by-company-admin/" + id, "DELETE")
            if (res && res?.status) {
                setIsEdit(false)
                getCategoryData();
                toast.success("Link Deleted Successfully");
                getCategoryData()
                setCatName('')
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }
    //Edit
    const handleEdit = async (item) => {
        console.log(item, "UpdatedLink")
        setIsEdit(true);
        setupdateID(item?._id)
        setCatName(item?.badgename)
        setThemeColor(item?.color)
    }
    //submit edit
    const handleEditSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (!catName) {
            return toast.error("Please put your Badge Name");
        }
        if (!themeColor) {
            return toast.error("Please put your Badge color");
        }

        const data = {
            badgename: catName,
            color: themeColor
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("update-badge-by-company-admin/" + updateID, "PUT", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Badge Updated Successfully");
            setCatName("");
            setIsEdit(false)
            setIsLoading(false);
            getCategoryData()
        } else {
            toast.error(res?.message);
            setIsLoading(false);
        }
    };

    //Delete update
    const handleisCancelSubmit = (e) => {
        setIsEdit(false);
        setCatName("")
        setThemeColor("")
    }
    useEffect(() => {
        getCategoryData()
    }, []);
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
                            Add/Manage Badge
                        </div>
                        <form>
                            <div className="row mb-2">



                                <div className="col-11 mt-3 ">
                                    <label htmlFor="formGroupExampleInput"
                                        className={isEdit ? "edit-tag" : ""}>Badge Name<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Badge Name'
                                        onChange={handleChange}
                                        value={catName}
                                        name="category"
                                    />
                                </div>

                                <div className="col-5 mt-3 d-flex " >
                                    <label htmlFor="formGroupExampleInput">Select your theme Color<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="color"
                                        className="form-control"
                                        style={{ height: "130px", width: "45%", cursor: "pointer" }}
                                        placeholder="Choose color"
                                        value={themeColor}
                                        onChange={(e) => setThemeColor(e.target.value)}
                                    />
                                    <label htmlFor="formGroupExampleInput" className=" mt-2 p-2">Selected color code : <span style={{ color: themeColor, fontWeight: "bold" }}>{themeColor}</span></label>
                                </div>

                                <div class="col-12 d-flex justify-content-end ">

                                    {!isEdit ? <button
                                        type="submit"
                                        onClick={(e) => handleSubmit(e)}
                                        className="form-control btn btn-primaryb mt-3"
                                        style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff", width: "125px", marginRight: "30px" }}
                                    >
                                        Add Badge
                                    </button> :

                                        <div className='d-flex '>
                                            <button
                                                type="submit"
                                                onClick={(e) => handleEditSubmit(e)}
                                                className="form-control btn-grad"
                                            //style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                            >
                                                Update Badge
                                            </button>
                                            <ImCross onClick={(e) => handleisCancelSubmit(e)} style={{ fontSize: "30px", cursor: "pointer" }} className=" mx-3 mt-1 text-danger " />
                                        </div>}

                                </div>



                            </div>

                            {/* Button */}

                        </form>
                        <div>
                            <DataTable
                                columns={columns}
                                data={tableData}
                                pagination
                                striped
                                customStyles={customStyles}
                            />
                        </div>
                    </section>
                </div>
            </div >




        </div >
    )
}

export default AddBadge