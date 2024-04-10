import React, { useEffect, useState } from 'react'
import CustomLoader from '../../CustomComponents/loader/CustomLoader'
import toast from 'react-hot-toast';
import HttpClient from '../../utils/HttpClient';
import DataTable from 'react-data-table-component';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import { ImCross } from 'react-icons/im';

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
const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"

}

const AddInitiave = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [AllData, setAllData] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [userTypeValue, setuserTypeValue] = useState('');
    const [initiativeTypeID, setinitiativeTypeID] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const userType = ["Admin", "Manager"]

    console.log(userTypeValue, "select");

    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (!selectedValue || !userTypeValue) {
            toast.error('Input blank')
            return;
        }

        const data = {
            initiativetype: selectedValue,
            initiativeFor: userTypeValue

        }
        setIsLoading(true);
        const res = await HttpClient.requestData("add-initiative-type", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Added Successfully");
            setuserTypeValue('')
            setSelectedValue('');
            setIsLoading(false);
            getInitiative();


        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);

        }
    };

    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
            width: "10%"

        },
        {
            name: 'Type Name',
            selector: row => row.initiativetype,
            width: "35%"
        },
        {
            name: 'User Type',
            selector: row => row.auth,
            width: "35%"
        },

        {
            name: 'Action',
            selector: row => row.action,
            width: "20%"
        }
    ];

    //View data
    const getInitiative = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-initiative-type", "GET", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({

                sl: i + 1,
                initiativetype: item?.initiativetype,
                auth: item?.initiativeFor,
                action: <EditDeleteIcon
                    onClickEdit={(e) => handleEdit(item)}
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
            const res = await HttpClient.requestData("delete-initiative-type/" + id, "DELETE")
            if (res && res?.status) {
                setIsLoading(false);
                getInitiative();

                toast.success("id Deleted Successfully");
            } else {
                setIsLoading(false);
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }
    //Edit
    const handleEdit = async (item) => {
        console.log(item, "updatedType")
        setIsEdit(true)
        setinitiativeTypeID(item?._id)
        setSelectedValue(item?.initiativetype)
        setuserTypeValue(item?.initiativeFor)

    }
    const cancelEdit = (e) => {
        setIsEdit(false)
        setinitiativeTypeID('')
        setSelectedValue('')
        setuserTypeValue('')

    }
    // edit submit
    const handleEditSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (!selectedValue || !userTypeValue) {
            toast.error('Input blank')
            return;
        }

        const data = {
            initiativetype: selectedValue,
            initiativeFor: userTypeValue

        }
        setIsLoading(true);
        const res = await HttpClient.requestData("update-initiative-type/" + initiativeTypeID, "PUT", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Added Successfully");
            setIsEdit(false)
            setSelectedValue('');
            setuserTypeValue('');
            setIsLoading(false);
            getInitiative();


        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);

        }
    };
    useEffect(() => {
        getInitiative();
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
                            Initiative type
                        </div>
                        <form>
                            <div className="row">

                                <div className="col-4 ">
                                    <label htmlFor="formGroupExampleInput">Select User Type
                                        <span className="text-danger">&nbsp;*</span></label>
                                    <select
                                        class="form-control"
                                        aria-label="Default select example"
                                        name="initiativeTypeID"
                                        value={userTypeValue}
                                        onChange={(e) => setuserTypeValue(e.target.value)}
                                    >
                                        <option value={""} disabled>Select User Type</option>
                                        {userType?.map((item, i) =>
                                            <option key={i} value={item}>{item}</option>
                                        )
                                        }
                                    </select>
                                </div>

                                <div className="col-8 ">
                                    <label htmlFor="formGroupExampleInput">Initiative Name:
                                        <span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Initiative Name"
                                        name="themeName"
                                        value={selectedValue}
                                        onChange={(e) => setSelectedValue(e.target.value)}
                                    />
                                </div>




                                {/* Button */}
                                <div class="col-12 d-flex justify-content-end ">
                                    {

                                        !isEdit ? <button
                                            type="submit"
                                            onClick={(e) => handleSubmit(e)}
                                            class="btn btn-primaryb mt-3"
                                            style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                        >
                                            Edit Initiative type
                                        </button> :
                                            <div className=' d-flex '>
                                                <button
                                                    type="submit"
                                                    onClick={(e) => handleEditSubmit(e)}
                                                    class="btn btn-primaryb mt-3 btn-grad"
                                                // style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                                >
                                                    Update Initiative type
                                                </button>
                                                <ImCross
                                                    onClick={(e) => cancelEdit(e)}
                                                    style={{ fontSize: "20px", cursor: "pointer" }} className=" mx-3 mt-4 text-danger " />
                                            </div>

                                    }
                                </div>




                            </div>






                        </form>
                        <form>

                            <div>

                                <DataTable
                                    columns={columns}
                                    data={AllData}
                                    pagination
                                    striped
                                    className=" rounded mt-1"
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

export default AddInitiave