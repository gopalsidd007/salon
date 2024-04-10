import React, { useEffect, useState } from "react";

import moment from "moment";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import HttpClient from "../utils/HttpClient";
import CustomLoader from "../CustomComponents/loader/CustomLoader";

const headLineStyle = {
  textAlign: "center",
  fontSize: "30px",
  color: "#868e96",
  margin: "11px",
  fontWeight: "bold",
};
const ViewAllTraining = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  console.log("cbv4673r4ub", allData);
  // column
  const columns = [
    {
      name: "SL",
      selector: (row) => row.sl,
      // width: "3.4rem"
    },
    {
      name: "Type Of Training",
      selector: (row) => row.tot,
      // width: "9.6rem"
    },
    {
      name: "Training Catagory",
      selector: (row) => row.train_catag,
      // width: "6.4rem"
    },
    {
      name: "Training Name",
      selector: (row) => row.title,
      // width: "6.2rem"
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={row.thumb_img}
          alt="thumbnail"
          style={{ width: "50px", height: "50px", padding: "10px" }}
        />
      ),
      // selector: row => row.thumb_img,
      // width: "7.7rem"
    },
    {
      name: "Course Price",
      selector: (row) => row.price,
      // width: "6.5rem"
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];

  const getAllTrainingData = async () => {
    setIsLoading(true);
    const res = await HttpClient.requestData("view-approved-training", "GET");
    console.log("resGetCat", res?.data, res?.data?.[0]?._id);
    // let apiData = [] "65e876ac246a340aa164a810"
    if (res && res?.status) {
      setIsLoading(false);
      const apiData = res?.data?.map((item, i) => ({
        sl: i + 1,
        tot: item?.trainingType,
        train_catag: item?.trainingCategory,
        title: item?.title,
        thumb_img: item?.image,
        price: item?.trainingCost,
        status: (
          <div>
            {item?.isActive === true ? (
              <button
                onClick={() => handleDeactive(item?._id)}
                type="button"
                className="btn btn-success floating-message"
                data-toggle="tooltip"
                data-placement="top"
                title="Click to Inactive"
              >
                Active
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-danger floating-message"
                onClick={() => handleActive(item?._id)}
                data-toggle="tooltip"
                data-placement="top"
                title="Click to Active"
              >
                Inactive
              </button>
            )}
          </div>
        ),
        action: (
          <>
            <span
              title="Delete Training"
              onClick={() => handleDelete(item?._id)}
            >
              <i
                className="fa-solid fa-trash-can"
                style={{
                  cursor: "pointer",
                  marginRight: "5px",
                  padding: "5px",
                  fontSize: "1.5em",
                  color: "#C4554D",
                  backgroundColor: "#FAECEC",
                }}
              ></i>
            </span>
          </>
        ),
      }));
      setAllData(apiData);
    }
  };

  const handleDelete = async (id) => {
    console.log("mnbvjhf", id);
    const res = await HttpClient.requestData(
      "delete-onboarding-training/" + id,
      "PUT"
    );
    if (res && res?.status) {
      toast.success("Deleted Successfully");
      getAllTrainingData();
    } else {
      toast.error("Unable to Delete");
    }
  };

  const handleDeactive = async (id) => {
    console.log("jkdfhgjkh", id);
    // return
    setIsLoading(true);
    let data = {
      isActive: false,
    };
    const res = await HttpClient.requestData(
      `inActive-training/${id}`,
      "PUT",
      data
    );
    if (res && res?.status) {
      setIsLoading(false);
      toast.success("Training Deactivated Successfully");
      getAllTrainingData();
    } else {
      toast.error("Unable to deactivate training");
      setIsLoading(false);
    }
  };

  const handleActive = async (id) => {
    console.log("jkdfhgj45654kh", id);
    // return
    setIsLoading(true);
    let data = {
      isActive: true,
    };
    const res = await HttpClient.requestData(
      `inActive-training/${id}`,
      "PUT",
      data
    );
    if (res && res?.status) {
      setIsLoading(false);
      toast.success("Training Activated Successfully");
      getAllTrainingData();
    } else {
      toast.error("Unable to activate training");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllTrainingData();
  }, []);

  return (
    <div className="d-flex justify-content-end">
      <div className="form-header">
        <CustomLoader loading={isLoading} />
        <section className="piechartsBox_area">
          <div style={headLineStyle} className="page-headline">
            View All Training
          </div>

          <form>
            <div>
              <DataTable
                columns={columns}
                data={allData}
                pagination
                striped
                className=" rounded "
              />
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ViewAllTraining;
