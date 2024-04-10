import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import HttpClient from '../../utils/HttpClient';
import toast from 'react-hot-toast';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';

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
export const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"

}
const ViewInitiativeData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [AllData, setAllData] = useState([]);



    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
            width: "3rem"

        },

        {
            name: 'Name',
            selector: row => row.nameOfInitaitive,
            width: "22rem"

        },
        {
            name: 'Description',
            selector: row => row.description,
            width: "32rem"


        },
        {
            name: 'startDate',
            selector: row => row.startDate,

        },
        {
            name: 'endDate',
            selector: row => row.endDate,

        },
        {
            name: 'rewardPoints',
            selector: row => row.rewardPoints,

        },
        {
            name: 'Added by',
            selector: row => row.addedBy,

        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];
    const getInititativeData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-all-initiative", "GET", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({

                sl: i + 1,

                nameOfInitaitive: item?.nameOfInitaitive,
                description: item?.description,
                startDate: item?.startDate,
                endDate: item?.endDate,
                rewardPoints: item?.rewardPoints,
                addedBy: <div> <label>{item?.firstName}</label>&nbsp;<label>{item?.lastName}</label></div>,
                action: <EditDeleteIcon
                    //onClickEdit={(e) => handleEdit(item)}
                    onClickDelete={(e) => handleDelete(item?._id)}
                />
            }));
        } else {
            setIsLoading(false);
        }

        setAllData(apiData);
    }
    //Delete part 
    const handleDelete = (id) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-initiative/" + id, "DELETE")
            if (res && res?.status) {
                setIsLoading(false);
                getInititativeData();

                toast.success("id Deleted Successfully");
            } else {
                setIsLoading(false);
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }
    useEffect(() => {
        getInititativeData();
    }, [])
    return (
        <div className="d-flex justify-content-end">
            <div className="form-header">

                <CustomLoader loading={isLoading} />
                <section className="piechartsBox_area">
                    <div
                        style={headLineStyle}
                        className="page-headline"
                    >
                        View / Manage Initiative
                    </div>

                    <form>

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
    )
}

export default ViewInitiativeData