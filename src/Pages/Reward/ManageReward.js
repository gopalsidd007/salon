import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import HttpClient from '../../utils/HttpClient';
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import DataTable from 'react-data-table-component';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import { ImCross } from 'react-icons/im';

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
   
};


const ManageReward = () => {
    const [AllData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [Rewardname, setrewardname] = useState("");
    const [RewardPoint, setrewardPoint] = useState("");
    const [RewardID, setrewardID] = useState("");
    const [isEdit, setisEdit] = useState(false);

    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
            width: "15%"
        },
        {
            name: 'Reward Name',
            selector: row => row.rewardName,
             width: "35%"
        },
        {
            name: 'Reward Point',
            selector: row => row.rewardPoint,
            width: "35%"
        },
        {
            name: 'Action',
            selector: row => row.action,
            width: "15%"
        }



    ];


    const getRewardPoints = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-reward", "GET", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({

                sl: i + 1,
                rewardName: item?.rewardName,
                rewardPoint: item?.reward,

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

    //Delete Reward Point
    const handleDelete = (id) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-reward/" + id, "DELETE")
            if (res && res?.status) {
                setIsLoading(false);
                getRewardPoints();

                toast.success("id Deleted Successfully");
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }

    //Edit Reward
    const handleEdit = async (item) => {
        setisEdit(true)
        setrewardname(item?.rewardName)
        setrewardPoint(item?.reward)
        setrewardID(item?._id)
    }

    //Update reward
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (Rewardname === "" || RewardPoint === "") {
            toast.error("Input field blank")
            return false;
        }
        const data = {
            "rewardName": Rewardname,
            "reward": RewardPoint
        }
        setIsLoading(true)
        const res = await HttpClient.requestData(`update-reward/${RewardID}`, "PUT", data);
        if (res && res?.status) {
            setisEdit(false)
            toast.success(res?.message);
            setIsLoading(false);
            // alert("gg")
            setrewardname("")
            setrewardPoint("")
            getRewardPoints();


        } else {
            toast.error(res?.message);
            setIsLoading(false);
        }


    }

    //candel update
    const handleisCancelSubmit = (e) => {
        setisEdit(false)
        setrewardPoint('');
        setrewardname('')
    }

    useEffect(() => {
        getRewardPoints();
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
                        View & Manage Reward Point
                    </div>
                    {
                        isEdit ?
                            <form>
                                <div className="row">



                                    <div className="col-md-6 mt-3 ">
                                        <label htmlFor="formGroupExampleInput" className="edit-tag">Reward Name<span className="text-danger">&nbsp;*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Reward Name"
                                            name=""
                                            value={Rewardname}
                                            onChange={(e) => setrewardname(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 mt-3">
                                        
                                        <label htmlFor="formGroupExampleInput" className="edit-tag">Reward Point<span className="text-danger">&nbsp;*</span></label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Reward Point"
                                            name=""
                                            value={RewardPoint}
                                            onChange={(e) => setrewardPoint(e.target.value)}
                                        />

                                    </div>




                                </div>





                                {/* Button */}
                                <div class="col-12 ">

                                    <div className="d-flex justify-content-end ">
                                        <button
                                            type="submit"
                                            onClick={(e) => handleUpdate(e)}
                                            class="btn btn-primaryb mt-3 mb-3 btn-grad"
                                        //style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                        >
                                            Update Data
                                        </button>
                                        <ImCross onClick={(e) => handleisCancelSubmit(e)} style={{ fontSize: "26px", cursor: "pointer" }} className="mx-2 mt-4 text-danger " />
                                    </div>

                                </div>
                            </form> : ''
                    }

                    <form>

                        <div className=' container '>

                            <DataTable

                                columns={columns}
                                data={AllData}
                                //pagination
                                striped
                                className="rounded your-data-table w-auto "
                                customStyles={customStyles}
                            />
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default ManageReward