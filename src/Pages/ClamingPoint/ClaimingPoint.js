import React, { useEffect, useState } from "react";
import CustomLoader from "../../CustomComponents/loader/CustomLoader";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import EditDeleteIcon from "../../CustomComponents/EditDeleteIcon";
import HttpClient from "../../utils/HttpClient";
import { DeleteConfirmModal } from "../../CustomComponents/DeleteConfirmModal";

const headLineStyle = {
  textAlign: "center",
  fontSize: "30px",
  color: "#868e96",
  margin: "35px",
  fontWeight: "bold",
};

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
      backgroundColor: "#cee0eb", // set the background color for head cells
    },
  },
  // cells: {
  //     style: {
  //         paddingLeft: '8px', // override the cell padding for data cells
  //         paddingRight: '8px',
  //     },
  // },
};

const ClaimingPoint = () => {
  const claimValue = { activity: "", reward: "" };
  const [claimName, setClaimName] = useState(claimValue);
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  //Edit
  const [editID, setEditID] = useState('');
  console.log("editID", editID);
  const [isEdit, setIsEdit] = useState(false);



  //view table
  const columns = [
    {
      name: "SL",
      selector: (row) => row.sl,
    },
    {
      name: "Activity Name",
      selector: (row) => row.activity,
    },
    {
      name: "Points",
      selector: (row) => row.point,
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];

  const getClaimPointData = async () => {
    setIsLoading(true);
    const res = await HttpClient.requestData("get-points", "GET", {});
    console.log("resGetCat", res)
    let apiData = []
    if (res && res?.status) {
      setIsLoading(false);
      apiData = res?.data?.map((item, i) => ({

        sl: i + 1,

        activity: item?.activity,
        point: item?.point,

        action: <EditDeleteIcon
          onClickEdit={(e) => handleEdit(item)}
          onClickDelete={(e) => handleDelete(item?._id)}
        />
      }));
    } else {
      setIsLoading(false);
    }

    setTableData(apiData);
  }

  //delete point

  const handleDelete = (id) => {

    const del = async () => {
      console.log(id, "id")
      setIsLoading(true)
      const res = await HttpClient.requestData("delete-points/" + id, "PUT", {})
      if (res && res.status) {
        setIsLoading(false)
        toast.success("Deleted Succesfully")
        getClaimPointData()
      }
      else {
        setIsLoading(false)
        toast.error("Failed to Delete")
      }
    }
    DeleteConfirmModal(del);
  }

  // handle edit
  const handleEdit = async (item) => {
    setEditID(item?._id)
    console.log(item, "itemID:", item?._id);
    setIsEdit(true)
    setClaimName({ ...claimName, activity: item?.activity, reward: item?.point });


  }


  //change state values

  const handleChange = (e) => {
    let { name, value } = e.target;
    setClaimName({ ...claimName, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    if (!claimName.activity) {
      return toast.error("Activity Name is Required");
    }

    if (!claimName.reward) {
      return toast.error("Reward Point is Required");
    }


    const data = {

      "activity": claimName?.activity,
      "point": claimName?.reward

    }
    // setClaimName(claimValue);
    console.log("thereward", data);

    const res = await HttpClient.requestData("add-points", "POST", data);

    if (res && res.status) {
      setIsLoading(false)
      setClaimName(claimValue);
      toast.success(`Points Added Successfully`);
      getClaimPointData();
    }
    else {
      setIsLoading(false)
      toast.error("Point Addition Failed!");
    }
  };



  const handleisEditSubmit = async (e, id) => {
    e.preventDefault();
    setIsLoading(true)

    if (!claimName.activity) {
      return toast.error("Activity Name is Required");
    }

    if (!claimName.reward) {
      return toast.error("Reward Point is Required");
    }


    const data = {

      "activity": claimName?.activity,
      "point": claimName?.reward

    }
    // setClaimName(claimValue);
    console.log("thereward", data);

    const res = await HttpClient.requestData("edit-points/" + editID, "PUT", data);

    if (res && res.status) {
      setIsLoading(false)
      setClaimName(claimValue);
      toast.success(`Points Edited Successfully`);
      setIsEdit(false)
      getClaimPointData();
    }
    else {
      setIsLoading(false)
      toast.error('Editing failed')
    }
  };

  // cancel edit
  const handleCancel = () => {
    setIsEdit(false)

    setClaimName(claimValue)
  };


  useEffect(() => {
    getClaimPointData();
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-end ">
        <CustomLoader loading={isLoading} />

        {/* form */}
        <div className="form-header">
          <section className="piechartsBox_area">
            <div style={headLineStyle} className="page-headline">
              Add Claiming Point
            </div>

            <form class="row m-2">
              <div class="col-6">
                <label
                  for="inputEmail4"
                  className={isEdit ? "edit-tag" : "form-label"}
                >
                  Activity
                </label>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Activity Name"
                  onChange={handleChange}
                  value={claimName?.activity}
                  name="activity"
                  id="inputEmail4"
                />
              </div>
              <div class="col-3">
                <label
                  for="inputEmail4"
                  className={isEdit ? "edit-tag" : "form-label"}
                >
                  Reward Point
                </label>
                <span style={{ color: "red" }}>*</span>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Reward Point"
                  onChange={handleChange}
                  value={claimName?.reward}
                  name="reward"
                  id="inputEmail4"
                />
              </div>

              <div class="col-3 mt-3 d-flex justify-content-end ">
                {isEdit ? (
                  <div className=" d-flex ">
                    <button
                      type="submit"
                      onClick={(e) => handleisEditSubmit(e)}
                      className="btn btn-primaryb mt-3 btn-grad"
                    //style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                    >
                      Update list
                    </button>{" "}
                    <button
                      type="submit"
                      onClick={(e) => handleCancel(e)}
                      className="btn btn-danger mt-3 btn-grad-cancel px-2 mx-4"
                    //style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                    >
                      {" "}
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    className="btn btn-primaryb mt-3"
                    style={{
                      background:
                        "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
                      color: "#fff",
                    }}
                  >
                    Submit
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>
      </div>

      {/* table */}
      <div className="datatable-view ">
        <div style={headLineStyle} className="page-headline">
          View & Manage Claiming Point
        </div>

        <DataTable
          columns={columns}
          data={tableData}
          pagination
          striped
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default ClaimingPoint;
