import React, { useEffect, useState } from "react";
import a from "../../Images/profile-pic.png";
import b from "../../Images/Icon.png";
import HttpClient from "../../utils/HttpClient";
import moment from "moment";
import { Link } from "react-router-dom";

function NotificationModal({ closeModal }) {
  const [Jobdata, setJobdata] = useState([]);
  const [HRJobdata, setHRJobdata] = useState([]);
  console.log(HRJobdata, "HRJobdata");

  const pendingjobData = Jobdata.filter(
    (item) => item?.isCAdminApproved === "pending"
  );
  const pendingHRjobData = HRJobdata.filter(
    (item) => item?.isCAdminApproved === "pending"
  );
  console.log(pendingjobData, "pendingjobData");
  const OthersjobData = Jobdata.filter(
    (item) => item?.isCAdminApproved !== "pending"
  );
  console.log(OthersjobData, "isCAdminApproved");
  //job requirement
  const getData = async () => {
    let res = await HttpClient.requestData(
      "view-jobrequirement-notification",
      "GET"
    );
    console.log(res, "JobdataManager");
    if (res && res.status) {
      setJobdata(res?.data);
    } else {
      setJobdata([]);
    }
  };

  //View hr job
  const gethrJobData = async () => {
    let res = await HttpClient.requestData(
      "view-hrjob-notification",
      "GET"
    );
    console.log(res, "Jobhrdata");
    if (res && res.status) {
      setHRJobdata(res?.data);
    } else {
      setJobdata([]);
    }
  };

  useEffect(() => {
    getData();
    gethrJobData()
  }, []);

  return (
    <>
      <section className="notificationmodal_main">
        <div className="notification_modal">
          <div className="notification_overlay"></div>
          <div className="notification_content">
            <p className="notification_txt">Notification</p>
            <div className="closemark" onClick={() => closeModal(false)}>
              <i class="fa-solid fa-xmark"></i>
            </div>
            <div className="notification_all_main">
              <p className="notification_txt">Job Requirements</p>
              {pendingjobData?.map((item, i) => {
                return (
                  <>
                    <Link
                      to="/view-job-request"
                      state={{ data: item }}
                      onClick={() => closeModal(false)}
                    >
                      <div className="notification_all_flx">
                        <div className="notification_img">
                          <img src={a} alt="/" />
                        </div>
                        <div className="notification_details">
                          <h3>Notification {i + 1}</h3>
                          <p>{item?.title}</p>
                          <p>
                            {moment(item?.createdOn).format(
                              "MMM DD, YYYY [at] hh:mm A"
                            )}
                          </p>
                          <h5>Waiting for Response</h5>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
            </div>
            <div className="notification_all_main">
              <p className="notification_txt">Job Requests by HR</p>
              {pendingHRjobData?.map((item, i) => {
                return (
                  <>
                    <Link
                      to="/view-job-request-by-hr"
                      state={{ data: item }}
                      onClick={() => closeModal(false)}
                    >
                      <div className="notification_all_flx">
                        <div className="notification_img">
                          <img src={a} alt="/" />
                        </div>
                        <div className="notification_details">
                          <h3>Notification {i + 1}</h3>
                          <p>{item?.title}</p>
                          <p>
                            {moment(item?.createdOn).format(
                              "MMM DD, YYYY [at] hh:mm A"
                            )}
                          </p>
                          <h5>Waiting for Response</h5>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
            </div>
            <div className="notification_all_main">
              <p className="notification_txt">Seen Notification</p>
              {OthersjobData?.map((item, i) => {
                return (
                  <>
                    <Link
                      to="/view-job-request"
                      state={{ data: item }}
                      onClick={() => closeModal(false)}
                    >
                      <div className="notification_all_flx">
                        <div className="notification_img">
                          <img src={a} alt="/" />
                        </div>
                        <div className="notification_details">
                          <h3>Notification {i + 1}</h3>
                          <p>{item?.title}</p>
                          <p>
                            {moment(item?.createdOn).format(
                              "MMM DD, YYYY [at] hh:mm A"
                            )}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotificationModal;
