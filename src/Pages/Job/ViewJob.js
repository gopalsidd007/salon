import React, { useEffect, useState } from 'react'
import HttpClient from '../../utils/HttpClient';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import DataTable from 'react-data-table-component';
import toast from 'react-hot-toast';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import { useLocation, useNavigate } from 'react-router-dom';
import DetailsModal from '../../Component/Modal/DetailsModal';

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
            paddingLeft: '15px', // override the cell padding for head cells
            paddingRight: '10px',
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

const ViewJob = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDetails, setSelectedDetails] = useState(null);
    const location = useLocation();
    const navigate = useNavigate()

    console.log(isModalOpen, "ismodal")


    //get data
    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
            width: "6rem"

        },
        {
            name: 'jobTitle',
            selector: row => row.jobTitle,
            width: "10rem"
        },
        {
            name: 'designation',
            selector: row => row.designation,
            width: "14rem"
        },
        {
            name: 'employmentType',
            selector: row => row.employmentType,
            width: "8rem"
        },
        {
            name: 'jobLocation',
            selector: row => row.jobLocation,
            width: "10rem"
        },
      
        {
            name: 'openings',
            selector: row => row.openings,
            width: "6rem"
        },
        {
            name: 'View',

            cell: (row) => (
                <i className="fa-solid fa-eye " onClick={() => handleView(row.id)}
                    style={{ cursor: "pointer", color: 'darkBlue', fontSize: '15px' }}></i>
            ),
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];

    const getJobList = async () => {
        const res = await HttpClient.requestData("view-job", "GET", {})
        console.log(res?.data, "resJob")
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({
                //skills also need to take [0] index
                sl: i + 1,
                id: item?._id,
                jobTitle: item?.jobTitle,
                designation: item?.designation,
                employmentType: item?.employmentType,
                jobLocation: item?.jobLocation[0]?item?.jobLocation[0]:'N/A',
               
                openings: item?.openings,
                action: <EditDeleteIcon
                    // onClickView={(e) => handleView(item?._id)}
                    // onClickEdit={(e) => handleEdit(item)}
                    onClickDelete={(e) => handleDelete(item?._id)}
                />

            }));
        } else {
            setIsLoading(false);
        }
        setTableData(apiData);
    }

    //MODAL VIEW
    const handleView = async (id) => {
        console.log(id, "row")
        const res = await HttpClient.requestData('view-job-byId/' + id, 'POST', {});
        console.log(res, "kk")
        setSelectedDetails(res?.data);
        setIsModalOpen(true);
    }

    // Edit Job
    const handleEdit = (item) => {

        navigate("/edit-job", { state: item })
    }

    // Delete Job
    const handleDelete = (id) => {
        console.log(id, "id")
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-job/" + id, "PUT")
            if (res && res?.status) {
                getJobList();
                toast.success("Job Deleted Successfully");
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }
    useEffect(() => {
        getJobList()
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
                            View & Manage Jobs
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


            <DetailsModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                details={selectedDetails}
            />

        </div >
    )
}

export default ViewJob