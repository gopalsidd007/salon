import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import HttpClient from '../../utils/HttpClient';
import moment from 'moment';
import toast from 'react-hot-toast';
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

const UserNotificaton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);

    //View Notification data
    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
            width: "4rem"
        },
        {
            name: 'Title',
            selector: row => row.title,
            width: "22rem"
        },
        {
            name: 'Description',
            selector: row => row.description,
            width: "27rem"
        },
        {
            name: 'Date',
            selector: row => row.createdOn,
            width: "7rem"
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];


    // fetch Category DAta
    const getCategoryData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData('view-notification', "GET", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({

                sl: i + 1,
                title: item?.title,
                description: item?.description,
                createdOn: moment(item?.createdOn).format("DD-MM-YYYY"),
                action: <EditDeleteIcon
                    // onClickEdit={(e) => handleEdit(item)}
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
            const res = await HttpClient.requestData("delete-notification/" + id, "DELETE")
            if (res && res?.status) {

                toast.success("Notification Deleted Successfully");
                getCategoryData()

            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
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
                            View Notification
                        </div>

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

export default UserNotificaton