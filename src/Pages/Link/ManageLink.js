import React, { useEffect, useState } from 'react'
import CustomLoader from '../../CustomComponents/loader/CustomLoader'
import HttpClient from '../../utils/HttpClient';
import toast from 'react-hot-toast';
import DataTable from 'react-data-table-component';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
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
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
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

const ManageLink = () => {
    const [catName, setCatName] = useState();
    const [description, setDescription] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [updateID, setupdateID] = useState('');

    //get data
    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
            width: "6rem"

        },
        {
            name: 'Link',
            selector: row => row.link,
            width: "14rem"
        },
        {
            name: 'Description',
            selector: row => row.description,
            width: "25rem"
        },
        {
            name: 'Image',
            cell: row => (row.image ? <img alt='no image' src={row.image} style={{ height: "100px", width: "100px", margin: "5px" }} /> : null),
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];

    // fetch Category DAta
    const getCategoryData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData('view-section', "GET", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({

                sl: i + 1,
                link: item?.link,
                description: item?.description,
                image: item?.image,
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
            const res = await HttpClient.requestData("delete-section/" + id, "DELETE")
            if (res && res?.status) {
                getCategoryData();
                toast.success("Link Deleted Successfully");
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
        setCatName(item?.link)
        setDescription(item?.description)
        window.scrollTo(0, 0)
    }
    //edit submit
    const handleSubmit = async (e) => {

        // console.log("valuesdd");
        e.preventDefault();

        if (!catName) {
            return toast.error("Please put your link");
        }

        const data = {
            link: catName,
            description: description,
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("edit-section/" + updateID, "PUT", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Link Updated Successfully");
            setCatName("");
            // navigate('/manage-category');
            setIsLoading(false);
            setIsEdit(false)
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
    useEffect(() => {
        getCategoryData();
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
                            View & Manage Link
                        </div>
                        {isEdit ? <><form className="mb-2">
                            <div className="row">



                                <div className="col-10 ">
                                    <label htmlFor="formGroupExampleInput" className='edit-tag'>Your Link<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Link'
                                        onChange={handleChange}
                                        value={catName}
                                        name="category"
                                    />
                                </div>
                                <div className="col-10 ">
                                    <label htmlFor="formGroupExampleInput" className='edit-tag'>Your Link<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Link'
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        name="description"
                                    />
                                </div>


                                <div class="col-2 d-flex " style={{ marginTop: "31px" }}>

                                    <button
                                        type="submit"
                                        onClick={(e) => handleSubmit(e)}
                                        className="form-control btn-grad"
                                    //style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                    >
                                        Update Link
                                    </button>
                                    <ImCross
                                        onClick={(e) => setIsEdit(false)}
                                        style={{ fontSize: "30px", cursor: "pointer" }} className=" mx-3 mt-1 text-danger " />

                                </div>


                            </div>
                            {/* Button */}

                        </form></> : ""}
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

export default ManageLink