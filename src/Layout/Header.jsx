import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import profileP from "../Images/profile-pic.png";
import NotificationModal from "../Component/Modal/NotificationModal";
import HttpClient from "../utils/HttpClient";
import toast from "react-hot-toast";
export const headLineStyle = {
  textAlign: "center",
  fontSize: "30px",
  color: "#868e96",
  margin: "35px",
  fontWeight: "bold",
};

const Header = () => {
  const [name, setName] = useState({ firstName: "", lastName: "", image: "" });
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [notificationmodal, setNotificationmodal] = useState(false);
  const notificationModal = () => {
    setNotificationmodal(true);
  };

  const [Searchmodal, setSearchmodal] = useState(false);
  const responSearch = () => {
    setSearchmodal(!Searchmodal);
  };

  const handClick = () => {
    if (document.querySelector("#responsiveMenu").click) {
      document.querySelector(".sidebarwrap").classList.add("show");
    } else {
      document.querySelector(".sidebarwrap").classList.remove("show");
    }
  };
  //Logout
  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logout SuccessFull");
    // window.location.reload();
  };

  // getprofile
  const getProfile = async () => {
    const res = await HttpClient.requestData("get-profile", "GET");
    console.log(res?.data, "profile");
    if (res && res?.status) {
      setName({
        firstName: res?.data?.firstName,
        lastName: res?.data?.lastName,
        image: res?.data?.image,
      });
      setEmail(res?.data?.email);
    } else {
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <section className="mainheader_sec">
        <button
          className="responsive_menu disabled "
          id="responsiveMenu"
          onClick={handClick}
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <button className="responsSearch_btn" onClick={responSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>

        <div className="Search_box invisible ">
          <form className="form-inline">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="Search_icon" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>

        <div className="rightcontent">
          <div className="actionBtn_wrap">
            <div className="notification_btn">
              <button className="btn" onClick={notificationModal}>
                <i className="fa-regular fa-bell"></i>
              </button>
              <div className="active">
                <i className="fa-solid fa-circle"></i>
              </div>
            </div>

            {/* account Details */}
            <div className="Accountdetails">
              <div className="profile_pic">
                <img src={name?.image} className="img-fluid" alt="user" />
              </div>
              <div className="namearea">
                <div className="dropdown">
                  <Link
                    className="dropdown-toggle"
                    href="#"
                    id="accountDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    to="/"
                    // style={{ marginLeft: "5px" }}
                  >
                    {/* name and email */}
                    <strong>
                      {name?.firstName}
                      &nbsp;
                      {name?.lastName}
                    </strong>
                    <span style={{ fontSize: "10px" }}>{email}</span>
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="accountDropdown"
                  >
                    <Link className="dropdown-item">
                      <i className="fa-solid fa-user mr-1"></i> Profile
                    </Link>
                    {/* <Link className="dropdown-item">
                      <i className="fa-solid fa-user mr-1"></i> Demo
                    </Link> */}

                    <div
                      className="mt-1"
                      style={{ borderTop: "1px solid #ccc" }}
                      onClick={() => handleLogOut()}
                    >
                      <Link className="dropdown-item">
                        <i className="fa-solid fa-right-from-bracket mr-1"></i>{" "}
                        Log Out
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {Searchmodal && (
        <div className="responsiveSearch_box">
          <form className="form-inline">
            <input
              className="form-control"
              type="search"
              placeholder="Search here...."
              aria-label="Search"
            />
            <button
              className="Search_icon"
              type="submit"
              onClick={() => setSearchmodal(false)}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      )}

      {notificationmodal && (
        <NotificationModal closeModal={setNotificationmodal} />
      )}

      <Sidebar />
    </>
  );
};

export default Header;
