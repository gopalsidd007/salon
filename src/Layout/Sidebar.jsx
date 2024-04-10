import React from "react";
// import { toast } from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import logo from "../../src/Images/logo.png";
import { RiUserSearchFill } from "react-icons/ri";

function Sidebar() {
  const navigate = useNavigate();
  const handleClick = () => {
    if (document.querySelector("#DarkSwitch").checked) {
      document.body.classList.add("drakmode");
    } else {
      document.body.classList.remove("drakmode");
    }
  };

  const handlClick = () => {
    if (document.querySelector("#backbtnsidebar").click) {
      document.querySelector(".sidebarwrap").classList.remove("show");
    } else {
      document.querySelector(".sidebarwrap").classList.remove("show");
    }
  };

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/login");
    // window.location.reload();
    // toast.success("Logout SuccessFull");
  };

  return (
    <>
      <section className="sidebarwrap">
        <div className="top_area">
          <button id="backbtnsidebar" onClick={handlClick}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <div className="logo_area">
            <div className="logo">
              {/* <img src={logo} className="img-fluid" alt="logo" /> */}
              <h1 style={{ color: "#fff" }}>Logo</h1>
            </div>
          </div>
        </div>

        <div className="sidebar_menu">
          <ul className="nav Menu_Nav accordion" id="sidemenu">
            {/***DASHBOARD 1***/}
            <li className="menuline">
              <Link to="/" className="icon" onClick={handlClick}>
                <i class="fa-solid fa-house icon-1"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            {/***Statics Data***/}
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead121">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu121"
                  aria-expanded="true"
                  aria-controls="sidemenu121"
                >
                  <i className="fa-sharp fa-solid fa-signs-post icon-1"></i>
                  <span>Events</span>
                </Link>
              </div>

              <div
                id="sidemenu121"
                className="collapse"
                aria-labelledby="sidemenuhead121"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/login-survey-question" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      View Events
                    </Link>
                  </li>

                  <li>
                    <Link to="/analys-data" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Edit Events
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}

            {/***MANAGE POST***/}
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead12">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu12"
                  aria-expanded="true"
                  aria-controls="sidemenu12"
                >
                  <i className="fa-sharp fa-solid fa-signs-post icon-1"></i>
                  <span>Inititive</span>
                </Link>
              </div>
              <div
                id="sidemenu12"
                className="collapse"
                aria-labelledby="sidemenuhead12"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/manage-post" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      View & Manage Posts
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}

            {/***ADD DEPARTMENT***/}
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead11">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu11"
                  aria-expanded="true"
                  aria-controls="sidemenu11"
                >
                  <i class="fa-solid fa-building-user icon-1"></i>
                  <span>Hall of Frame</span>
                </Link>
              </div>
              <div
                id="sidemenu11"
                className="collapse"
                aria-labelledby="sidemenuhead11"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-department" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add Department
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}
            {/***ADD EMPLOYEES***/}
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead1">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu1"
                  aria-expanded="true"
                  aria-controls="sidemenu1"
                >
                  <i class="fa fa-user-plus icon-1" aria-hidden="true"></i>
                  <span>Manage Post</span>
                </Link>
              </div>
              <div
                id="sidemenu1"
                className="collapse"
                aria-labelledby="sidemenuhead1"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-manager" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add Manager
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-employee" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add Employee
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-hr" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Add Hr
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}

            {/***Advocacy***/}
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead9">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu9"
                  aria-expanded="true"
                  aria-controls="sidemenu9"
                >
                  <i className="fa-regular fa-address-card icon-1"></i>
                  <span>Traning</span>
                </Link>
              </div>
              <div
                id="sidemenu9"
                className="collapse"
                aria-labelledby="sidemenuhead9"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-advocy-category" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Advocacy
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-advocy" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Advocacy
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}








            {/* ------------------------------------------>Service Category<----------------------------------------------------------        */}

            <li className="menuline">
              <div className="menu-head" id="sidemenuhead1">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu1"
                  aria-expanded="true"
                  aria-controls="sidemenu1"
                >
                  <i className="fa-regular fa-address-card icon-1"></i>
                  <span>Service Category</span>
                </Link>
              </div>
              <div
                id="sidemenu1"
                className="collapse"
                aria-labelledby="sidemenuhead1"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-service-category" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add Service Category
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/add-advocy" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Update Service Category
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link to="/add-advocy" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Delete Service Category
                    </Link>
                  </li> */}
                </ul>
              </div>
            </li>

            {/* ------------------------------------------------->Service Sub Category<--------------------------------------------- */}

            <li className="menuline">
              <div className="menu-head" id="sidemenuhead2">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu2"
                  aria-expanded="true"
                  aria-controls="sidemenu2"
                >
                  <i className="fa-regular fa-address-card icon-1"></i>
                  <span>Service Sub Category</span>
                </Link>
              </div>
              <div
                id="sidemenu2"
                className="collapse"
                aria-labelledby="sidemenuhead2"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-service-sub-category" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add Service Sub Category
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/add-advocy" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Update Service Category
                    </Link>
                  </li> */}
                  {/* <li>
                    <Link to="/add-advocy" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Delete Service Category
                    </Link>
                  </li> */}
                </ul>
              </div>
            </li>

            {/* -------------------------------------------------------->Service<------------------------------------------------------ */}
            <li className="menuline">
              <div className="menu-head" id="sidemenuhead3">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu3"
                  aria-expanded="true"
                  aria-controls="sidemenu3"
                >
                  <i className="fa-regular fa-address-card icon-1"></i>
                  <span>Service</span>
                </Link>
              </div>
              <div
                id="sidemenu3"
                className="collapse"
                aria-labelledby="sidemenuhead3"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-service" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add Service
                    </Link>
                  </li>
                </ul>
              </div>
            </li>




{/* //----------------------------------->Add service Product<--------------------------------------------------------- */}
           
<li className="menuline">
              <div className="menu-head" id="sidemenuhead4">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu4"
                  aria-expanded="true"
                  aria-controls="sidemenu4"
                >
                  <i className="fa-regular fa-address-card icon-1"></i>
                  <span>Service Product</span>
                </Link>
              </div>
              <div
                id="sidemenu4"
                className="collapse"
                aria-labelledby="sidemenuhead4"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-service-product" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add Service product
                    </Link>
                  </li>
                </ul>
              </div>
            </li>        
           
{/* ///------------------------------------->Add Employee<----------------------------------------------------            */}
           
           
<li className="menuline">
              <div className="menu-head" id="sidemenuhead5">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu5"
                  aria-expanded="true"
                  aria-controls="sidemenu5"
                >
                  <i className="fa-regular fa-address-card icon-1"></i>
                  <span>Service Employee</span>
                </Link>
              </div>
              <div
                id="sidemenu5"
                className="collapse"
                aria-labelledby="sidemenuhead5"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-service-employee" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add Employee
                    </Link>
                  </li>
                </ul>
              </div>
            </li>     
{/* //------------------------------------------->Admin Subscription<---------------------------------------------------------------            */}
<li className="menuline">
              <div className="menu-head" id="sidemenuhead6">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu6"
                  aria-expanded="true"
                  aria-controls="sidemenu6"
                >
                  <i className="fa-regular fa-address-card icon-1"></i>
                  <span>Admin Subsription</span>
                </Link>
              </div>
              <div
                id="sidemenu6"
                className="collapse"
                aria-labelledby="sidemenuhead6"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-admin-subscription" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add Admin Subsription
                    </Link>
                  </li>
                </ul>
              </div>
            </li>


{/* /////--------------------------------------->stock<--------------------------------------------------            */}
           
<li className="menuline">
              <div className="menu-head" id="sidemenuhead7">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu7"
                  aria-expanded="true"
                  aria-controls="sidemenu7"
                >
                  <i className="fa-regular fa-address-card icon-1"></i>
                  <span>Stock</span>
                </Link>
              </div>
              <div
                id="sidemenu7"
                className="collapse"
                aria-labelledby="sidemenuhead7"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/stock" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add Stock
                    </Link>
                  </li>
                </ul>
              </div>
            </li>        
           
{/* ///-------------------------------------------->add stock history<-----------------------------------------------------            */}
           
<li className="menuline">
              <div className="menu-head" id="sidemenuhead8">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu8"
                  aria-expanded="true"
                  aria-controls="sidemenu8"
                >
                  <i className="fa-regular fa-address-card icon-1"></i>
                  <span>Stock History</span>
                </Link>
              </div>
              <div
                id="sidemenu8"
                className="collapse"
                aria-labelledby="sidemenuhead8"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/stock-history" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add Stock History
                    </Link>
                  </li>
                </ul>
              </div>
            </li>           
           
           
           
           
           
           
           
           
           
           
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead10">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu10"
                  aria-expanded="true"
                  aria-controls="sidemenu10"
                >
                  <i className="fa-solid fa-medal icon-1"></i>
                  <span>Advocacy</span>
                </Link>
              </div>
              <div
                id="sidemenu10"
                className="collapse"
                aria-labelledby="sidemenuhead10"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-badges" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Add &
                      Manage Badges
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}

            {/***Menu 3***/}
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead2">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu2"
                  aria-expanded="true"
                  aria-controls="sidemenu2"
                >
                  <i class="fa-solid fa-list icon-1"></i>
                  <span>Onboarding</span>
                </Link>
              </div>
              <div
                id="sidemenu2"
                className="collapse"
                aria-labelledby="sidemenuhead2"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-checklist-day" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Checklist
                      Day
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-checklist" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Add &
                      Manage Checklist
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}

            {/*** survey ***/}

            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead3">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu3"
                  aria-expanded="true"
                  aria-controls="sidemenu3"
                >
                  <i class="fa-sharp fa-solid fa-magnifying-glass-chart icon-1"></i>

                  <span>Survey</span>
                </Link>
              </div>
              <div
                id="sidemenu3"
                className="collapse"
                aria-labelledby="sidemenuhead3"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-survey-name" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Survey Name
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-survey" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Add &
                      Manage Survey
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}

            {/* Cover Image */}

            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead4">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu4"
                  aria-expanded="true"
                  aria-controls="sidemenu4"
                >
                  <i class="fa fa-camera-retro icon-1"></i>
                  <span>Cover Image</span>
                </Link>
              </div>
              <div
                id="sidemenu4"
                className="collapse"
                aria-labelledby="sidemenuhead4"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/cover-image" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Manage &
                      View Image
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
 */}

            {/* Reward Part */}
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead5">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu5"
                  aria-expanded="true"
                  aria-controls="sidemenu5"
                >
                  <i class="fa-solid fa-award icon-1"></i>
                  <span>Reward</span>
                </Link>
              </div>
              <div
                id="sidemenu5"
                className="collapse"
                aria-labelledby="sidemenuhead5"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-reward" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Add
                      Reward
                    </Link>
                  </li>
                  <li>
                    <Link to="/manage-reward" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Manage
                      Reward
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}

            {/* claiming point Part */}
            {/* <li className="menuline">
              <div className="menu-head" id="">
                <Link to="/claiming-point" className="btn btn-header-link icon">
                  <i class="fa-solid fa-award icon-1"></i>
                  <span>Claiming Point</span>
                </Link>
              </div>
            </li> */}

            {/* Event Part */}
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead6">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu6"
                  aria-expanded="true"
                  aria-controls="sidemenu6"
                >
                  <i class="fas fa-calendar icon-1"></i>
                  <span>Event</span>
                </Link>
              </div>
              <div
                id="sidemenu6"
                className="collapse"
                aria-labelledby="sidemenuhead6"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-event" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Add Event
                    </Link>
                  </li>
                  <li>
                    <NavLink to="/manage-event" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Manage
                      Event
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li> */}

            {/* Link */}
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead7">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu7"
                  aria-expanded="true"
                  aria-controls="sidemenu7"
                >
                  <i className="fa-solid fa-link icon-1"></i>
                  <span>Link</span>
                </Link>
              </div>
              <div
                id="sidemenu7"
                className="collapse"
                aria-labelledby="sidemenuhead7"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-link" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Add Link
                    </Link>
                  </li>
                  <li>
                    <Link to="/manage-link" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>Manage
                      Link
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}

            {/* THEME */}
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead8">
                <Link
                  to="#"
                  className="btn btn-header-link icon"
                  data-toggle="collapse"
                  data-target="#sidemenu8"
                  aria-expanded="true"
                  aria-controls="sidemenu8"
                >
                  <i className="fa-solid fa-palette icon-1"></i>
                  <span>Theme</span>
                </Link>
              </div>
              <div
                id="sidemenu8"
                className="collapse"
                aria-labelledby="sidemenuhead8"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li className="icon2">
                    <Link
                      to="/add-theme"
                      className="icon3"
                      onClick={handlClick}
                    >
                      <i className="fa-solid fa-angles-right mr-2"></i>Add Theme
                    </Link>
                  </li>
                  <li className="icon2">
                    <Link
                      to="/manage-theme "
                      className="icon3"
                      onClick={handlClick}
                    >
                      <i className="fa-solid fa-angles-right mr-2"></i>Manage
                      Theme
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}

            {/***REWARD CARD***/}
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead13">
                <Link
                  to="#"
                  className="btn btn-header-link icon icon"
                  data-toggle="collapse"
                  data-target="#sidemenu13"
                  aria-expanded="true"
                  aria-controls="sidemenu13"
                >
                  <i class="fa-solid fa-id-card-clip icon-1"></i>
                  <span>Status Card</span>
                </Link>
              </div>
              <div
                id="sidemenu13"
                className="collapse"
                aria-labelledby="sidemenuhead13"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-reward-card" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add Card Theme color
                    </Link>
                  </li>
                  <li>
                    <Link to="/view-reward-card" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      View & Manage Card Theme Color
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}

            {/***INITIAVE***/}
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead14">
                <Link
                  to="#"
                  className="btn btn-header-link icon icon"
                  data-toggle="collapse"
                  data-target="#sidemenu14"
                  aria-expanded="true"
                  aria-controls="sidemenu14"
                >
                  <i class="fa-solid fa-head-side-virus icon-1"></i>
                  <span>Initiative</span>
                </Link>
              </div>
              <div
                id="sidemenu14"
                className="collapse"
                aria-labelledby="sidemenuhead14"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-initiative" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add/Manage Initiative Type
                    </Link>
                  </li>
                  <li>
                    <Link to="/add-initiative-data" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add Initiative
                    </Link>
                  </li>
                  <li>
                    <Link to="/view-initiative-data" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      View & Manage Initiative
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}

            {/***ChatBot***/}

            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead15">
                <Link
                  to="#"
                  className="btn btn-header-link icon icon"
                  data-toggle="collapse"
                  data-target="#sidemenu15"
                  aria-expanded="true"
                  aria-controls="sidemenu15"
                >
                  <i class="fa fa-commenting icon-1" aria-hidden="true"></i>
                  <span>ChatBot</span>
                </Link>
              </div>
              <div
                id="sidemenu15"
                className="collapse"
                aria-labelledby="sidemenuhead15"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-topic" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add Topic
                    </Link>
                  </li>

                  <li>
                    <Link to="/add-subtopic" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add SubTopic
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}

            {/***Notification***/}

            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead16">
                <Link
                  to="#"
                  className="btn btn-header-link icon icon"
                  data-toggle="collapse"
                  data-target="#sidemenu16"
                  aria-expanded="true"
                  aria-controls="sidemenu16"
                >
                   <i class="fa-solid fa-head-side-virus icon-1"></i> 
                  <i class="fa-solid fa-bell icon-1"></i>
                  <span>Notification</span>
                </Link>
              </div>
              <div
                id="sidemenu16"
                className="collapse"
                aria-labelledby="sidemenuhead16"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/notification" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      View Notification
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}

            {/***contact information***/}
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead17">
                <Link
                  to="#"
                  className="btn btn-header-link icon icon"
                  data-toggle="collapse"
                  data-target="#sidemenu17"
                  aria-expanded="true"
                  aria-controls="sidemenu17"
                >
                   <i class="fa-solid fa-head-side-virus icon-1"></i>
                  <i class="fa fa-solid fa-circle-info icon-1"></i>
                  <span>Information</span>
                </Link>
              </div>
              <div
                id="sidemenu17"
                className="collapse"
                aria-labelledby="sidemenuhead17"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/information" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      About Section{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          
            {/***JOB post information***/}
            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead18">
                <Link
                  to="#"
                  className="btn btn-header-link icon icon"
                  data-toggle="collapse"
                  data-target="#sidemenu18"
                  aria-expanded="true"
                  aria-controls="sidemenu18"
                >
                  <i class="fa-solid fa-head-side-virus icon-1"></i>
                  <i class="fa-solid fa-magnifying-glass-plus icon-1"></i>
                  <RiUserSearchFill className="icon-1" style={{fontSize:"20px"}}/>
                  <span className="mx-2">Job Description</span>
                </Link>
              </div>
              <div
                id="sidemenu18"
                className="collapse"
                aria-labelledby="sidemenuhead18"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                    <Link to="/add-job" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      About Job{" "}
                    </Link>
                    <Link to="/view-job" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      View Job{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}

            {/*TRAINING PART  */}
            {/*
            <li className="menuline">
              <div className="menu-head" id="sidemenuhead20">
                <Link
                  to="#"
                  className="btn btn-header-link icon icon"
                  data-toggle="collapse"
                  data-target="#sidemenu20"
                  aria-expanded="true"
                  aria-controls="sidemenu20"
                >
                   <i class="fa-solid fa-head-side-virus icon-1"></i> 
                  <i class="fa-solid fa-person-circle-plus"></i>
                   <RiUserSearchFill className="icon-1" style={{fontSize:"20px"}}/> 
                  <span className="mx-2">Training</span>
                </Link>
              </div>
              <div
                id="sidemenu20"
                className="collapse"
                aria-labelledby="sidemenuhead20"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                      <Link to="/add-job-post" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Job Post{" "}
                    </Link> 
                    <Link to="/add-training" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Add Training{" "}
                    </Link>
                    <Link to="/view-all-training" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      View Training{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
        */}
            {/***New JOB post ***/}

            {/* <li className="menuline">
              <div className="menu-head" id="sidemenuhead19">
                <Link
                  to="#"
                  className="btn btn-header-link icon icon"
                  data-toggle="collapse"
                  data-target="#sidemenu19"
                  aria-expanded="true"
                  aria-controls="sidemenu19"
                >
                   <i class="fa-solid fa-head-side-virus icon-1"></i> 
                  <i class="fa-solid fa-person-circle-plus"></i>
                  <RiUserSearchFill className="icon-1" style={{fontSize:"20px"}}/> 
                  <span className="mx-2">Job Section</span>
                </Link>
              </div>
              <div
                id="sidemenu19"
                className="collapse"
                aria-labelledby="sidemenuhead19"
                data-parent="#sidemenu"
              >
                <ul className="Submenu">
                  <li>
                     <Link to="/add-job-post" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      Job Post{" "}
                    </Link> 
                    <Link to="/view-job" onClick={handlClick}>
                      <i className="fa-solid fa-angles-right mr-2"></i>
                      View Job{" "}
                    </Link>
                  </li>
                </ul>
              </div>
            </li> */}
          </ul>

          {/* Logout */}

          {/* <ul className="nav Account_Nav">
            <div onClick={handleLogOut} style={{ width: "100%" }}>
              <Link>
                <i className="fa-solid fa-right-from-bracket mr-2"></i>
                <span>Logout</span>
              </Link>
            </div>
          </ul> */}
        </div>
      </section>
    </>
  );
}

export default Sidebar;
