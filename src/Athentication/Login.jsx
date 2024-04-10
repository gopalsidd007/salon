// Hooks
import React, { useEffect, useState } from "react";
import "./Authentication.css";
import loginbg from "../Images/LoginBG.jpeg";
import HttpClient from "../utils/HttpClient";
import toast from "react-hot-toast";
import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [passord, setPassword] = useState("");
  const [togglePassword, setTogglePassword] = useState(false);


  // handle submit
  const handleSubmit = async (e) => {
    // console.log("valuesdd");
    e.preventDefault();

    if (!email) return toast.error("Email is Required");
    if (!passord) return toast.error("Email is Required");

    const data = {
      email: email,
      password: passord,
    };
    const res = await HttpClient.requestData("login", "POST", data);
    console.log("resCat", res);
    if (res && res.status) {
      navigate("/");
      reactLocalStorage.setObject("userDataSos", { token: res?.data?.token });
      toast.success("Logged In Successfully");
      setEmail("");
      setPassword("");
    } else {
    
      toast.error(res?.message);
    }
  };

  //pasword toggle funtion

  const passfalse = () => {
    setTogglePassword(true);
  };
  const passtrue = () => {
    setTogglePassword(false);
  };

 


  return (
    <>
      <section
        className="LoginPage"
        style={{ backgroundImage: `url(${loginbg})` }}
      >
        <div className="LoginBgOverlay" />
        <div className="LoginForm">
          <div className="LoginTop">
            <h5 className="LoginHead">ADMIN PANEL</h5>
          </div>
          <div className="LoginBtm">
            <form action="">
              <div className="form-group">
                <input
                  name="email"
                  id="exampleEmail"
                  placeholder="Email here..."
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group pass_input">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={passord}
                  name="password"
                  id="examplePassword"
                  placeholder="Password here..."
                  type={togglePassword ? "text" : "password"}
                  className="form-control"
                />
                {/* toggle password */}

                <div className="eye_icon">
                  {togglePassword ? (
                    <i
                      className="fa-regular fa-eye"
                      onClick={() => passtrue()}
                    ></i>
                  ) : (
                    <i
                      class="fa-regular fa-eye-slash"
                      onClick={() => passfalse()}
                    ></i>
                  )}
                </div>
              </div>
              {/* <div className="form-group">
                <input type="Checkbox" />
                <span className="LoginRem">Remember Me</span>
              </div> */}

            </form>
            <div className="buttons">
              <button
                className="LoginBtn btn-hover color-9"
                type="submit"
                onClick={(e) => handleSubmit(e)}
              >
                SIGN IN
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
