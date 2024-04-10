import React, { useEffect, useState } from "react";
import HttpClient from "../../utils/HttpClient";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const HomeCard = () => {
  // const card = [
  //   {
  //     id: 1,
  //     color: "rgb(236, 64, 122)",
  //     name: "Budding Talent Count",
  //     link: "/buddingview",
  //     userType: "BuddingTalent",
  //   },
  //   {
  //     id: 2,
  //     color: "rgb(73, 163, 241)",
  //     name: "Influencer",
  //     link: "/influencerview",
  //     userType: "Influencer",
  //   },
  //   {
  //     id: 3,
  //     color: "rgb(102, 187, 106)",
  //     name: "Scout",
  //     link: "/scoutview",
  //     userType: "Scout",
  //   },
  // ];
  const [companyAdmnin, setCompanyAdmin] = useState({
    hrLength: "",
    managerLength: "",
    employeeLength: "",
  });
  console.log(companyAdmnin, "companyAdmnin");
  const item = ["rgb(236, 64, 122)", "rgb(73, 163, 241)", "rgb(102, 187, 106)"];
  const navigate = useNavigate();

  // get employee data
  const getCategoryData = async () => {
    const res = await HttpClient.requestData(
      "companyAdmin-view-card",
      "POST",
      {}
    );
    console.log("resCat", res);
    if (res && res?.status) {
      setCompanyAdmin({
        hrLength: res?.data?.totalHr,
        managerLength: res?.data?.totalManager,
        employeeLength: res?.data?.totalEmployees,
      });
    } else {
      toast(res?.message);
    }
  };
  useEffect(() => {
    getCategoryData();
  }, []);

  return (
    <>
      <div className="HomeTop">
        <div className="row">
          {/* ....HR.... */}
          <div className="col-md-4 col-12">
            <div className="HomeCard">
              <h5 className="HomeCardHead">Total HRs :</h5>
              <p className="HomeCardPara">
                <span
                  style={{
                    color: item[0],
                    fontSize: "30px",
                    paddingLeft: "6px",
                  }}
                >
                  {companyAdmnin?.hrLength}
                </span>
              </p>
              <hr />

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <button
                  className="HomeCardViewbtn"
                  style={{
                    background: item[0],
                  }}
                  onClick={() => navigate("/hr-data")}
                >
                  View
                </button>
              </div>
              {/* <Link to={item.link}  className="homecardLink">
                    View More
                  </Link> */}
              <div className="cardIconDiv" style={{ backgroundColor: item[0] }}>
                <i class="fa-regular fa-user"></i>
              </div>
            </div>
          </div>
          {/* ....MANAGER.... */}
          <div className="col-md-4 col-12">
            <div className="HomeCard">
              <h5 className="HomeCardHead">Total Managers :</h5>
              <p className="HomeCardPara">
                <span
                  style={{
                    color: item[1],
                    fontSize: "30px",
                    paddingLeft: "6px",
                  }}
                >
                  {companyAdmnin?.managerLength}
                </span>{" "}
              </p>
              <hr />

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <button
                  className="HomeCardViewbtn"
                  style={{
                    background: item[1],
                  }}
                  onClick={() => navigate("/manager-data")}
                >
                  View
                </button>
              </div>
              {/* <Link to={item.link}  className="homecardLink">
                    View More
                  </Link> */}
              <div className="cardIconDiv" style={{ backgroundColor: item[1] }}>
              <i class="fa-solid fa-user"></i>
              </div>
            </div>
          </div>
          {/* ....EMPLOYEE.... */}
          <div className="col-md-4 col-12">
            <div className="HomeCard">
              <h5 className="HomeCardHead">Total Employees : </h5>
              <p className="HomeCardPara">
                <span
                  style={{
                    color: item[2],
                    fontSize: "30px",
                    paddingLeft: "6px",
                  }}
                >
                  {companyAdmnin?.employeeLength}
                </span>
              </p>
              <hr />

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
              >
                <button
                  className="HomeCardViewbtn"
                  style={{
                    background: item[2],
                  }}
                  onClick={() => navigate("/employee-data")}
                >
                  View
                </button>
              </div>
              {/* <Link to={item.link}  className="homecardLink">
                    View More
                  </Link> */}
              <div className="cardIconDiv" style={{ backgroundColor: item[2] }}>
                <i class="fa-solid fa-users"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCard;
