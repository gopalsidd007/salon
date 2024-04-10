import React, { useEffect, useState } from "react";
import Addicon from "../Images/Add icon 1.png";
// import TrainingCreateVirtual from "./TrainingCreateVirtual";
// import { fileUpload } from '../../services/api/apiHelpers';
import toast from "react-hot-toast";
import TrainingCreatePhysical from "./TrainingCreatePhysical";
import HttpClient from "../utils/HttpClient";
// import CustomLoader from '../CustomComponents/loader/CustomLoader';
import "./Training.css";
import TrainingCreateVirtual from "./TrainingCreateVirtual";

const headLineStyle = {
  textAlign: "center",
  fontSize: "30px",
  color: "#868e96",
  margin: "35px",
  fontWeight: "bold",
};
const TrainingCreatePage = () => {
  const [trainingType, settrainingType] = useState("Virtual");
  const [trainingCategory, settrainingCategory] = useState("");
  const [title, settitle] = useState("");
  const [language, setlanguage] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  //for thumbnail image uploading
  const handleImageChange = async (e) => {
    let image = e.target.files[0];
    setUploading(true);

    const form = new FormData();
    form.append("image", image);

    let res = await HttpClient.fileUplode("image-upload", "POST", form);

    if (res.status) {
      toast.success("Image uploaded successfully");
      setImageURL(res?.image);
    } else {
      toast.error("Error uploading image");
    }
    setUploading(false);
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <div className="form-header">
          <section className="piechartsBox_area">
            <div style={headLineStyle} className="page-headline">
              Add Training
            </div>

            <section className="trainingcreatepagemain">
              <div className="employeepagecontainer">
                <div className="trainingcreatepagemainflx">
                  {/* for left part of create training */}
                  <div className="trainingcreatepageleft">
                    <div className="trainingcreatepageleftbrdr">
                      <div className="">
                        <form>
                          <div className="trainingpageleftdivmain">
                            <p className="typstringtxtppcrt">
                              Types of Traning
                            </p>
                            <select
                              id=""
                              className="typstrningwhselct"
                              name="trainingType"
                              value={trainingType}
                              onChange={(e) => settrainingType(e.target.value)}
                            >
                              <option value="" disabled>
                                Select option
                              </option>
                              <option value="Virtual">Virtual</option>
                              <option value="physically">Physically</option>
                            </select>
                          </div>
                          <div className="trainingpageleftdivmain">
                            <p className="typstringtxtppcrt">
                              Types of Category
                            </p>
                            <select
                              id=""
                              className="typstrningwhselct"
                              name="trainingCategory"
                              value={trainingCategory}
                              onChange={(e) =>
                                settrainingCategory(e.target.value)
                              }
                            >
                              <option value="" disabled>
                                Select option
                              </option>
                              <option value="Mandatory">
                                Mandatory training{" "}
                              </option>
                              <option value="SkillDevelopment">
                                Skill development training
                              </option>
                              <option value="NonTechnical">
                                Non technical
                              </option>
                            </select>
                          </div>
                          <div className="trainingpageleftdivmain">
                            <p className="typstringtxtppcrt">
                              {" "}
                              Trainning Title
                            </p>
                            <input
                              type="text"
                              className="typstrningwhselct"
                              name="title"
                              value={title}
                              onChange={(e) => settitle(e.target.value)}
                            />
                          </div>
                          <div className="trainingpageleftdivmain">
                            <p className="typstringtxtppcrt">Language</p>
                            <input
                              type="text"
                              className="typstrningwhselct"
                              name="language"
                              value={language}
                              onChange={(e) => setlanguage(e.target.value)}
                            />
                          </div>
                          <div className="trainingpageleftdivmain">
                            <p className="typstringtxtppcrt">Thumbnail Image</p>

                            <div className="bgcontainerupldbrdr">
                              <div className="bgcrd">
                                <div className="bgcontainerupld">
                                  <div className="logoupld">
                                    <img src={Addicon} alt="..." />
                                    <div className="">
                                      <input
                                        type="file"
                                        class="upldimagediv"
                                        value={image}
                                        accept="image/*"
                                        name="image"
                                        onChange={handleImageChange}
                                      ></input>
                                    </div>
                                  </div>
                                </div>
                                <p className="upldtxtppdiv">
                                  Upload Your Thumbnail
                                </p>
                                {uploading ? (
                                  <p>image uploading......</p>
                                ) : null}
                                {imageURL !== "" && (
                                  <div className="imageuplddiv">
                                    <img src={imageURL} alt="" />
                                    <div
                                      className="imageupldcrs"
                                      onClick={() => {
                                        setImageURL("");
                                        setImage("");
                                      }}
                                    >
                                      <i class="fa-solid fa-xmark"></i>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* training type wise component change */}
                  {trainingType === "Virtual" ? (
                    <TrainingCreateVirtual
                      trainingType={trainingType}
                      trainingCategory={trainingCategory}
                      title={title}
                      language={language}
                      image={image}
                      uploading={uploading}
                      imageURL={imageURL}
                      settrainingType={settrainingType}
                      settrainingCategory={settrainingCategory}
                      settitle={settitle}
                      setlanguage={setlanguage}
                      setImage={setImage}
                      setImageURL={setImageURL}
                    />
                  ) : (
                    <TrainingCreatePhysical
                      trainingType={trainingType}
                      trainingCategory={trainingCategory}
                      title={title}
                      language={language}
                      image={image}
                      uploading={uploading}
                      imageURL={imageURL}
                      settrainingType={settrainingType}
                      settrainingCategory={settrainingCategory}
                      settitle={settitle}
                      setlanguage={setlanguage}
                      setImage={setImage}
                      setImageURL={setImageURL}
                    />
                  )}
                </div>
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
};

export default TrainingCreatePage;
