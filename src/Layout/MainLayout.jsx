import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Login from "../Athentication/Login";

const MainLayout = () => {
  const [loggedIn, setloggedIn] = useState(false);

  // Component did mount
  useEffect(() => {
    if (
      localStorage.getItem("Authorization") &&
      localStorage.getItem("userType")
    ) {
      setloggedIn(true);
    } else {
      setloggedIn(false);
    }
  }, []);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />

      {/* {loggedIn === true ? (
        <div>
          <Header />
          <div>
            <Sidebar />
            <div>
              <div>
                <Outlet />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div>
          <div>
            <Login />
          </div>
        </div>
      )} */}
    </>
  );
};

export default MainLayout;
