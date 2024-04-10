import React, { useEffect, useState } from 'react'
import CustomLoader from '../../../CustomComponents/loader/CustomLoader';
import toast from 'react-hot-toast';
import HttpClient from '../../../utils/HttpClient';
//import makeAnimated from 'react-select/animated';
import DataTable from 'react-data-table-component';
import EditDeleteIcon from '../../../CustomComponents/EditDeleteIcon';
import { DeleteConfirmModal } from '../../../CustomComponents/DeleteConfirmModal';
import { ImCross } from 'react-icons/im';
const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
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

const AddDepartment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [departmentData, setDepartmentData] = useState([]);
    const [departmentID, setDepartmentID] = useState('');
    const initValue = {
        department: "",
        address: "",
    }
    const [formValue, setFormValue] = useState(initValue);
    //const [selectedIds, setSelectedIds] = useState([]); // Selected IDs
    //const animatedComponents = makeAnimated();
    console.log(departmentID, "selectedIds");


    const validate = () => {
        if (!formValue?.department) {
            toast.error("department is required");
            return true
        }

        return false
    }
    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
            //width: "3.4rem"
        },
        {
            name: 'Name',
            selector: row => row.Department,
            //width: "9.6rem"
        },
        // {
        //     name: 'Employee ID',
        //     selector: row => row.address,
        //     //width: "6.4rem"
        // },
        {
            name: 'Action',
            selector: row => row.action,
        }


    ];

    // Fetch department Data
    const getDepartmentData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-department", "GET", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {

            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({
                sl: i + 1,
                Department: item?.departmentName,
                //address: item?._id,
                action: <EditDeleteIcon
                    onClickEdit={(e) => handleEdit(item)}
                    onClickDelete={(e) => handleDelete(item?._id)}
                />

            }));
        } else {
            setIsLoading(false);
        }
        setDepartmentData(apiData);
    }
    // get HR Data

    //Edit Data
    const handleEdit = (item) => {
        setIsEdit(true)
        window.scrollTo(0, 0)
        console.log(item, "item")
        setFormValue({ ...formValue, department: item?.departmentName })
        setDepartmentID(item?._id)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue(prev => ({ ...prev, [name]: value }));
    }

    //Add submit
    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (validate()) {
            return
        }

        const data = {
            "departmentName": formValue?.department,
            "address": formValue?.address,

        }
        setIsLoading(true);
        const res = await HttpClient.requestData("add-department", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Added Successfully");
            setFormValue(initValue);
            setIsLoading(false);
            getDepartmentData()
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    };
    //Edit submit
    const handleEditSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (validate()) {
            return
        }

        const data = {
            "departmentName": formValue?.department,
            "address": formValue?.address,

        }
        setIsLoading(true);
        const res = await HttpClient.requestData("update-department/" + departmentID, "PUT", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            setIsEdit(false)
            toast.success("Added Successfully");
            setFormValue(initValue);
            setIsLoading(false);
            getDepartmentData()
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);

        }
    };
    //cancel edit
    const handleisCancelSubmit = (e) => {
        setIsEdit(false);
        setFormValue(initValue);
    }
    //Delete Depatname
    const handleDelete = (id) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-department/" + id, "DELETE")
            if (res && res?.status) {
                setIsLoading(false);
                getDepartmentData()

                toast.success("id Deleted Successfully");
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }
    useEffect(() => {

        getDepartmentData();
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
                            Add & Manage Department Data
                        </div>
                        <form className='mb-3'>
                            <div className="row">
                                <div className="col-md-8  ">
                                    <label htmlFor="formGroupExampleInput">Department<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Department"
                                        name="department"
                                        value={formValue.department}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Button */}
                                <div class="col-4 mt-3 d-flex justify-content-end  ">
                                    {
                                        !isEdit
                                            ?
                                            <button
                                                type="submit"
                                                onClick={(e) => handleSubmit(e)}
                                                class="btn btn-primaryb mt-3"
                                                style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                            >
                                                Add Data
                                            </button>
                                            :
                                            <div className="d-flex ">
                                                <button
                                                    type="submit"
                                                    onClick={(e) => handleEditSubmit(e)}
                                                    class="btn btn-primaryb mt-3 btn-grad"
                                                //style={{ background: "linear-gradient(595deg, rgb(100, 200, 300), rgb(10, 20, 40))", color: "#fff" }}
                                                >
                                                    Update Data
                                                </button>
                                                <ImCross onClick={(e) => handleisCancelSubmit(e)} style={{ fontSize: "25px", cursor: "pointer" }} className=" mx-3 mt-4 text-danger " />
                                            </div>
                                    }
                                </div>
                            </div>



                        </form>
                        <form>

                            <div>

                                <DataTable

                                    columns={columns}
                                    data={departmentData}
                                    pagination
                                    striped
                                    className="rounded your-data-table"
                                    customStyles={customStyles}
                                />
                            </div>
                        </form>
                    </section>
                </div>
            </div >




        </div >
    )
}

export default AddDepartment