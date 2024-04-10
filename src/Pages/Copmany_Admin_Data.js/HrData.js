import React, { useEffect, useState } from 'react'
import CustomLoader from '../../CustomComponents/loader/CustomLoader'
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import HttpClient from '../../utils/HttpClient';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import toast from 'react-hot-toast';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import { TiTick } from "react-icons/ti";
import { MdOutlineCancel } from 'react-icons/md';


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

const HrData = () => {
    const [AllData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    console.log(AllData, "Alldata")







    // column
    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },

        {
            name: 'Employee ID',
            selector: row => row.empId,
        },
        // {
        //     name: 'Designation ',
        //     selector: row => row.designation,
        // },
        {
            name: 'Department ',
            selector: row => row.department,
        },

        {
            name: 'Date Of Joining ',
            selector: row => row.doj,
        },
        {
            name: 'Contact Number',
            selector: row => row.contact,
        },
        {
            name: 'Added ',
            selector: row => row.assignedBy,
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        // {
        //     name: 'Action',
        //     selector: row => row.action,
        // }
    ];

    const handleDeactive = async (id) => {
        setIsLoading(true);
        let data = {
            status: false
        }
        const res = await HttpClient.requestData(`active-inactive-status/${id}`, "PUT", data);
        if (res && res?.status) {
            setIsLoading(false);
            toast.success("Employee Deactivated Successfully");
            getCategoryWiseData();
        } else {
            setIsLoading(false);
        }

    }

    const handleActive = async (id) => {
        setIsLoading(true);
        let data = {
            status: true
        }

        const res = await HttpClient.requestData(`active-inactive-status/${id}`, "PUT", data);
        if (res && res?.status) {
            setIsLoading(false);
            toast.success("Employee Activated Successfully");
            getCategoryWiseData();
        } else {
            setIsLoading(false);
        }
    }


    const getCategoryWiseData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("companyAdmin-view-card", "POST", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.hrData?.map((item, i) => ({
                sl: i + 1,
                name: item?.firstName + " " + item?.lastName,
                empId: item?.employeeid,
                // designation: item?.userType,
                department: item?.userType,
                doj: moment(item?.createdOn).format("DD-MM-YYYY"),
                contact: item?.contact,
                assignedBy: item?.addedbyadminFirstName + " " + item?.addedbyadminlastName,
                status: <div>
                    {
                        item?.isActive ?
                            <button onClick={() => handleDeactive(item?._id)}
                                type="button" className="btn btn-success floating-message"
                                data-toggle="tooltip" data-placement="top" title="Click to change">
                                Active
                            </button> :
                            <button type="button" className="btn btn-danger floating-message"
                                onClick={() => handleActive(item?._id)}
                                data-toggle="tooltip" data-placement="top" title="Click to change">
                                Inactive
                            </button>
                    }



                </div>,

                action: <EditDeleteIcon

                    // onClickEdit={(e) => handleEdit(item)}
                    onClickDelete={(e) => handleDelete(item?._id)}
                />
            }));
        } else {
            setIsLoading(false);
        }
        setAllData(apiData);

        const handleDelete = (id) => {
            const del = async () => {
                setIsLoading(true);
                const res = await HttpClient.requestData("owner-delete-user/" + id, "DELETE")
                if (res && res?.status) {
                    setIsLoading(false);
                    getCategoryWiseData();

                    toast.success("id Deleted Successfully");
                } else {
                    toast.error(res?.message || "Something Wrong");
                }
            }

            DeleteConfirmModal(del);
        }

    }
    useEffect(() => {
        getCategoryWiseData();

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
                        ALL HRs
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

export default HrData