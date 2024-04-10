import React, { useCallback, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import HttpClient from '../../utils/HttpClient';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import toast from 'react-hot-toast';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
const customStyles = {
    rows: {
        style: {
            minHeight: '18px', // override the row height
        },
    },
    headCells: {
        style: {
            // paddingLeft: '8px', // override the cell padding for head cells
            // paddingRight: '8px',
            backgroundColor: '#cee0eb', // set the background color for head cells
        },
    },
    cells: {
        style: {
            paddingLeft: '18px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};

const ManageCheckList = ({ handleEdit, getCategoryData, checkListData }) => {



    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [catData, setCatData] = useState([])
    const [day, setDay] = useState("");
    console.log(checkListData, "checkListData")

    console.log("dayddff", checkListData)


    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
            width: "4.6rem"
        },
        {
            name: 'Checklist Name',
            selector: row => row.name,
            width: "50rem"
            
        },
        {
            name: 'Action',
            selector: row => row.action,
            
        }
    ];

    // fetch Category DAta
    // const getCategoryData = async (id) => {
    //     // console.log("idddd", id, day)
    //     let data = {
    //         id: id
    //     }
    //     setIsLoading(true);
    //     const res = await HttpClient.requestData(`get-checklist`, "POST", data);
    //     console.log("resGetCat", res)

    //     let apiData = []
    //     if (res && res?.status) {

    //         setCheckListData(res?.data1)

    //         setIsLoading(false);
    //     } else {
    //         setIsLoading(false);
    //     }
    //     // setTableData(apiData);
    // }


    useEffect(() => {
        // if (checkListData.length !== 0) {
        const apiData = checkListData?.map((item, i) => ({
            id: i + 1,
            sl: i + 1,
            name: item?.checklist,
            // name: item?.name,
            action: <EditDeleteIcon
                onClickEdit={(e) => handleEdit(item)}
                onClickDelete={(e) => handleDelete(item?._id)}
            />
        }));
        setTableData(apiData);

        // }
    }, [checkListData, day])


    // edit
    // const handleEdit = (item) => {
    //     //navigate("/edit-checklistdata", { state: item })
    //     // console.log(item, "itemedit")
    // }

    // delete
    const handleDelete = useCallback((did) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-checklist/" + did, "DELETE");
            // console.log("dellchh", res)
            if (res && res?.status) {
                getCategoryData(day);
                toast.success("Deleted Successfully");
                setIsLoading(false);
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }, [day])

    const getDayData = async () => {
        // setCatLoader(true)
        const res = await HttpClient.requestData("view-checklist-day", "GET", {});
        console.log("resCat", res);
        if (res && res?.status) {
            // setCatLoader(false)
            setCatData(res?.data);

        } else {
            // setCatLoader(false);
            toast(res?.message)
        }
    }

    const handleChange = (e) => {
        setDay(e.target.value);
        getCategoryData(e.target.value)
    }

    useEffect(() => {
        getDayData();
    }, [])



    return (
        <div className="d-flex justify-content-end">
            <div className="form-header">
                <CustomLoader loading={isLoading} />

                <div className="three mb-1">
                    <h5>View & Manage Checklist</h5>
                </div>
                <section className="piechartsBox_area">
                    <form>
                        <div className="row" style={{ marginBottom: "10px" }}>
                            <div className="col">
                                <label htmlFor="formGroupExampleInput">Select Day</label>
                                <select
                                    class="form-control"
                                    aria-label="Default select example"
                                    name="catID"
                                    value={day}
                                    onChange={handleChange}
                                >
                                    <option value={""} disabled>Select Day</option>
                                    {catData?.map((item, i) =>
                                        <option key={i} value={item?._id}>{item?.name}</option>
                                    )
                                    }
                                </select>
                            </div>
                        </div>
                        <DataTable
                            columns={columns}
                            data={tableData}
                            pagination
                            striped
                            customStyles={customStyles}
                        />
                    </form>
                </section>
            </div>

        </div>

    )
}


export default ManageCheckList