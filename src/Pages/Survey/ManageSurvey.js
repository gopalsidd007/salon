import React, { useCallback, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import toast from 'react-hot-toast';
import HttpClient from '../../utils/HttpClient';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';

const customStyles = {
    rows: {
        style: {
            minHeight: '48px', // override the row height
        },
    },
    headCells: {
        style: {

            backgroundColor: '#cee0eb', // set the background color for head cells
        },
    },

};


const ManageSurvey = ({ handleEdit, getCategoryData, checkListData }) => {
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [catData, setCatData] = useState([])
    const [day, setDay] = useState("");

    console.log("dayddff", day)
    console.log(checkListData, "CHeckList")


    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
            width: "8.4rem"
        },
        {
            name: 'Survey Name',
            selector: row => row.name,
            width: "50.6rem"
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];

    // fetch Category DAta
    // const getCategoryData = async (id) => {
    //     console.log("idddd", id, day)
    //     let data = {
    //         id: id
    //     }
    //     setIsLoading(true);
    //     const res = await HttpClient.requestData(`get-survey`, "POST", data);
    //     console.log("resGetCat", res)
    //     console.log(res?.data1,"CHeckList")
    //     let apiData = []
    //     if (res && res?.status) {

    //         setCheckListData(res?.data1)

    //         setIsLoading(false);
    //         // apiData = res?.data1?.map((item, i) => ({
    //         //     id: i + 1,
    //         //     sl: i + 1,
    //         //     name: item?.checklist,
    //         //     // name: item?.name,
    //         //     action: <EditDeleteIcon
    //         //         // onClickEdit={(e) => handleEdit(item)}
    //         //         onClickDelete={(e) => handleDelete(item?._id)}
    //         //     />
    //         // }));
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
            name: item?.survey,
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

    // delete
    const handleDelete = useCallback((did) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-survey/" + did, "PUT");
            // console.log("dellchh", res)
            if (res && res?.status) {
                getCategoryData(day);
                toast.success("Deleted Successfully");
                setIsLoading(false);
            } else {
                toast.error(res?.message || "Something Wrong");
                setIsLoading(false);
            }
        }

        DeleteConfirmModal(del);
    }, [day])

    const getDayData = async () => {
        // setCatLoader(true)
        const res = await HttpClient.requestData("view-survey-Name", "GET", {});
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
                    <h5>Select an option to view</h5>
                </div>
                <section className="piechartsBox_area">
                    <form>
                        <div className="row" style={{ marginBottom: "1px" }}>
                            <div className="col">
                                <label htmlFor="formGroupExampleInput">Select Survey</label>

                                <select
                                    class="form-control"
                                    aria-label="Default select example"
                                    name="catID"
                                    value={day}
                                    onChange={handleChange}
                                >
                                    <option value={""} disabled>Select Survey</option>
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

export default ManageSurvey