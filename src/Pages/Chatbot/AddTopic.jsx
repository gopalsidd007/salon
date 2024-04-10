import React, { useEffect, useState } from "react";
import CustomLoader from "../../CustomComponents/loader/CustomLoader";
import toast from "react-hot-toast";
import HttpClient from "../../utils/HttpClient";
import DataTable from "react-data-table-component";
import EditDeleteIcon from "../../CustomComponents/EditDeleteIcon";
import { MdDelete } from "react-icons/md";
import { DeleteConfirmModal } from "../../CustomComponents/DeleteConfirmModal";
import { FaEdit } from "react-icons/fa";

const headLineStyle = {
  textAlign: "center",
  fontSize: "30px",
  color: "#868e96",
  margin: "35px",
  fontWeight: "bold",
};

const customStyles = {
  rows: {
    style: {
      minHeight: "48px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      backgroundColor: "#cee0eb", // set the background color for head cells
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

const AddTopic = () => {
  const [isLoading, setIsLoading] = useState(false);

  const initValue = {
    topicName: "",
  };
  const [formValue, setFormValue] = useState(initValue);
  const [AllData, setAllData] = useState([]);
  const [singleData, setSingleData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  console.log(formValue, "rr");

  const columns = [
    {
      name: "SL",
      selector: (row) => row.sl,
    },
    {
      name: "Topic Name",
      selector: (row) => row.initiativetype,
    },

    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];

  //View data
  const gatAllData = async () => {
    setIsLoading(true);
    const res = await HttpClient.requestData("view-chat-bot", "POST", {});
    // console.log("resGetCat", res)
    let apiData = [];
    if (res && res?.status) {
      setIsLoading(false);
      apiData = res?.data?.map((item, i) => ({
        sl: i + 1,
        initiativetype: item?.topicName,
        // action: <EditDeleteIcon
        // //onClickEdit={(e) => handleEdit(item)}
        // //onClickDelete={(e) => handleDelete(item?._id)}
        // />
        action: (
          <div className="d-flex justify-content-between">
            <div
              style={{
                fontSize: "1.5rem",
                color: "#545423",
                cursor: "pointer",
              }}
              onClick={() => handleEdit(item)}
            >
              <FaEdit />
            </div>
            <div
              style={{
                fontSize: "1.6rem",
                color: "#af0606",
                cursor: "pointer",
              }}
              onClick={(e) => handleDelete(item?._id)}
            >
              <MdDelete />
            </div>
          </div>
        ),
      }));
    } else {
      setIsLoading(false);
    }

    setAllData(apiData);
  };

  // click on edit icon
  const handleEdit = (item) => {
    window.scrollTo(0, 0);
    setSingleData(item);
    setIsEdit(true);
    setFormValue((prev) => ({
      ...prev,
      topicName: item?.topicName,
    }));
  };

  // handle edit Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const data = {
      // "type": "Answer",
      topicName: formValue?.topicName,
    };
    setIsLoading(true);
    const res = await HttpClient.requestData(
      "update-chatbot/" + singleData?._id,
      "PUT",
      data
    );
    if (res && res?.status) {
      toast.success("Data Updated Successfully");
      setIsLoading(false);
      setFormValue(initValue);
      setIsEdit(false);
      gatAllData();
    } else {
      toast.error(res?.message || "Something Wrong");
      setIsLoading(false);
    }
  };

  // handleDelete
  const handleDelete = (id) => {
    const del = async () => {
      setIsLoading(true);
      const res = await HttpClient.requestData(
        "delete-single-chatbot-sub-topic/" + id,
        "DELETE",
        {}
      );
      if (res && res?.status) {
        toast.success("Deleted");
        setIsLoading(false);
        gatAllData();
      } else {
        toast.error(res?.message || "Something Wrong");
        setIsLoading(false);
      }
    };

    DeleteConfirmModal(del);
  };

  // validate
  const validate = () => {
    if (!formValue?.topicName) {
      toast.error("Topic Name is required");
      return true;
    }

    return false;
  };

  // other inputs change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  //Submit data
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      return;
    }

    const data = {
      type: "",
      topicName: formValue.topicName,
    };
    setIsLoading(true);
    const res = await HttpClient.requestData(
      "add-chat-bot-main-topic",
      "POST",
      data
    );
    // console.log("resCatTopic", res)
    if (res && res?.status) {
      toast.success("Data Added Successfully");
      setFormValue(initValue);
      setIsLoading(false);
      gatAllData();
    } else {
      toast.error(res?.message || "Something Wrong");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    gatAllData();
  }, []);

  return (
    <div>
      <CustomLoader loading={isLoading} />

      <div className="d-flex justify-content-end">
        <div className="form-header">
          <section className="piechartsBox_area">
            <div style={headLineStyle} className="page-headline">
              Add / Manage Topic
            </div>

            <form>
              <div className="row">
                <div className="col">
                  <label htmlFor="formGroupExampleInput">Name Of Topic</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name Of Topic"
                    name="topicName"
                    value={formValue.topicName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div class="col-12 d-flex justify-content-end ">
                <button
                  type="submit"
                  onClick={(e) => {
                    if (isEdit) {
                      handleEditSubmit(e);
                    } else {
                      handleSubmit(e);
                    }
                  }}
                  class="btn btn-primaryb mt-3"
                  style={{
                    background:
                      "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
                    color: "#fff",
                  }}
                >
                  {isEdit ? "Edit Topic" : "Add Topic"}
                </button>
              </div>
            </form>
          </section>

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
        </div>
      </div>
    </div>
  );
};

export default AddTopic;
