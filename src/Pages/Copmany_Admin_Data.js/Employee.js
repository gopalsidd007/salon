import React, { useEffect, useState } from 'react'
import CustomLoader from '../../CustomComponents/loader/CustomLoader'
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import HttpClient from '../../utils/HttpClient';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import toast from 'react-hot-toast';

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

//     rows: {

//     },
//     headCells: {
//         style: {

//         },
//     },
//     cells: {
//         style: {

//         },
//     },
// };

const Employee = () => {
    const [AllData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');


    // column
    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
            width: "3.4rem"
        },
        {
            name: 'Name',
            selector: row => row.name,
            width: "9.6rem"
        },
        {
            name: 'Employee ID',
            selector: row => row.empId,
            width: "6.4rem"
        },
        {
            name: 'Designation',
            selector: row => row.designation,
            width: "6.2rem"
        },
        {
            name: 'Department',
            selector: row => row.department,
            width: "10.5rem"

        },

        {
            name: 'Joining Date',
            selector: row => row.doj,
            width: "6.5rem"
        },
        {
            name: 'Contact Number',
            selector: row => row.contact,
            width: "6.7rem"
        },
        {
            name: 'Added',
            selector: row => row.assignedBy,
        },
        {
            name: 'Status',
            selector: row => row.status,
        },
        {
            name: 'Change Designation',
            selector: row => row.changeDesignation,
            width: "8.9rem"
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

    //change designation
    const handlChangeDesignation = async (id) => {
        setIsLoading(true);
        let data = {
            "userType": "Manager"
        }
        const res = await HttpClient.requestData(`designation-change/${id}`, "PUT", data);
        if (res && res?.status) {
            setIsLoading(false);
            toast.success("Employee Activated Successfully");
            getCategoryWiseData();
        } else {
            setIsLoading(false);
            toast.error("you don`t have access")
        }

    }


    const getCategoryWiseData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("companyAdmin-view-card", "POST", {});
        console.log("Employee", res?.data?.employeeData)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.employeeData?.map((item, i) => ({

                sl: i + 1,
                name: item?.firstName + " " + item?.lastName,
                empId: item?.employeeid,
                designation: item?.userType,
                department: item?.designation ? item?.designation : "-",
                doj: moment(item?.createdOn).format("DD-MM-YYYY"),
                contact: item?.contact ? item?.contact : "-",
                assignedBy: item?.addedbyadminFirstName + " " + item?.addedbyadminlastName,
                status: <div>
                    {
                        item?.isActive ?
                            <button onClick={() => handleDeactive(item?._id)}
                                type="button" className="btn btn-success floating-message"
                                data-toggle="tooltip" data-placement="top" title="Click to Inactive">
                                Active
                            </button> :
                            <button type="button" className="btn btn-danger floating-message"
                                onClick={() => handleActive(item?._id)}
                                data-toggle="tooltip" data-placement="top" title="Click to Active">
                                Inactive
                            </button>
                    }
                </div>,
                changeDesignation: <button type="button" className="btn btn-secondary change-designation"
                    onClick={() => handlChangeDesignation(item?._id)}
                    data-toggle="tooltip" data-placement="top" title="Click to change">
                    Move to Manager
                </button>,
                action: <EditDeleteIcon
                    //onClickEdit={(e) => handleEdit(item)}
                    onClickDelete={(e) => handleDelete(item?._id)}
                />
            }));
        } else {
            setIsLoading(false);
        }
        const filteredData = apiData?.filter(item =>
            item?.name?.toLowerCase()?.includes(searchInput?.toLowerCase()) ||
            item?.assignedBy?.toLowerCase()?.includes(searchInput?.toLowerCase()) ||
            item?.department?.toLowerCase()?.includes(searchInput?.toLowerCase()) ||
            item?.department?.toLowerCase()?.includes(searchInput?.toLowerCase()) ||
            item?.contact?.toString()?.includes(searchInput) ||
            item?.empId?.toString()?.toLowerCase()?.includes(searchInput?.toLowerCase())

        );
        setAllData(filteredData.reverse());
    }
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
    useEffect(() => {
        getCategoryWiseData();
    }, [searchInput])



    return (
        <div className="d-flex justify-content-end">
            <div className="form-header">

                <CustomLoader loading={isLoading} />
                <section className="piechartsBox_area">
                    <div
                        style={headLineStyle}
                        className="page-headline"
                    >
                        ALL EMPLOYEES
                    </div>
                    <div className=" d-flex justify-content-end mb-2" >
                        <div className="Search_box">
                            <form className="form-inline">
                                <input
                                    className="form-control h-75"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                                <div className="Search_icon">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </form>
                        </div>
                    </div>

                    <form>

                        <div>

                            <DataTable

                                columns={columns}
                                data={AllData}
                                pagination
                                striped
                                className="rounded your-data-table"
                                customStyles={customStyles}
                            />
                        </div>
                    </form>
                </section>
            </div>
        </div>

    )
}

export default Employee;