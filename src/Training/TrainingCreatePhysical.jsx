import React, { useEffect, useState } from "react";
import Addicon from "../Images/Add icon 1.png";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import "./Training.css";
// import { ApiHelperFunction, fileUpload } from '../../services/api/apiHelpers';
// import { useAuthCtx } from '../../context/AuthCtx';

import toast from "react-hot-toast";
import HttpClient from "../utils/HttpClient";
// import CustomLoader from '../CustomComponents/loader/CustomLoader';

const headLineStyle = {
  textAlign: "center",
  fontSize: "30px",
  color: "#868e96",
  margin: "35px",
  fontWeight: "bold",
};
const animatedComponents = makeAnimated();

const TrainingCreatePhysical = ({
  trainingType,
  trainingCategory,
  title,
  language,
  image,
  imageURL,
  uploading,
  settrainingType,
  settrainingCategory,
  settitle,
  setlanguage,
  setImage,
  setImageURL,
}) => {
  const iniVideoLearningContent = {
    content: "",
  };

  const iniPhysicalData = {
    Budling: "",
    RoomNumber: "",
    StartDate: "",
    startTime: "",
    duration: { hour: "", min: "" },
    Documents: "",
    LearningContent: [iniVideoLearningContent],
  };

  const initrainingquiz = {
    question: "",
    A: "",
    B: "",
    C: "",
    D: "",
    answer: "",
    ansType: "checkbox",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [placeTime, setplaceTime] = useState([iniPhysicalData]);
  const [trainingQuiz, settrainingQuiz] = useState([initrainingquiz]);
  // const { setLoading } = useAuthCtx();
  const [description, setdescription] = useState("");
  const [link, setlink] = useState("");
  const [mentor, setmentor] = useState([]);
  const [targetAudiance, settargetAudiance] = useState([]);
  const [materials, setmaterials] = useState("");
  const [trainerName, settrainerName] = useState("");
  const [internalTrainerName, setInternalTrainerName] = useState([]);
  const [trainingCost, settrainingCost] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [colourOptions, setColourOptions] = useState([]);
  const [empData, setempData] = useState([]);
  const [empDataaudience, setempDataaudience] = useState([]);
  const [selectedOptionsaudience, setSelectedOptionsaudience] = useState([]);
  const [colourOptionsaudience, setColourOptionsaudience] = useState([]);
  const [imageLoader4, setImageLoader4] = useState(false);
  const [imageLoader5, setImageLoader5] = useState(false);
  const [DepartmentName, setDepartmentName] = useState("");
  const [options, setOptions] = useState([]);
  const [DepartmentDropdown, setDepartmentDropdown] = useState([]);
  const [departmentNameData, setDepartmentNameData] = useState([]);
  const [targetAudianceData, setTargetAudianceData] = useState([]);
  console.log("zxcvbnmasdfghj23456", targetAudiance);
  // { value: 'chocolate', label: 'Chocolate' },
  //for onChange functionality for duration
  const handleChangeDur = (i, e) => {
    let newFormValues = [...placeTime];
    newFormValues[i]["duration"][e.target.name] = e.target.value;
    setplaceTime(newFormValues);
  };

  //pick department name
  // const handleSelectDepartName = setSelectedOptionsaudience => {
  // Update the selected IDs array
  // setDepartmentName(setSelectedOptionsaudience ? setSelectedOptionsaudience.value : "");
  // }
  const handleSelectDepartName = (e) => {
    // Update the selected IDs array
    setDepartmentName(e.value);
    addTargetDepartment(e.value);
  };

  // Target Audiance data view department wise
  const handleSelectChangeaudiance = (e) => {
    let arr = [];
    e.forEach((ele) => {
      arr.push(ele?.value);
    });
    settargetAudiance(arr);
    // console.log("gfdgfdgdfgdfgfd", arr);
    // Update the selected IDs array
    // settargetAudiance(setSelectedOptionsaudience ? setSelectedOptionsaudience.map(option => option.value) : []);
  };

  // get Designation/Department Data
  const getDepartmentData = async () => {
    // setIsLoading(true);
    const res = await HttpClient.requestData("/view-department", "GET");
    console.log("resGetCat", res);
    let apiData = [];
    if (res && res?.status) {
      // setIsLoading(false);
      apiData = res?.data?.data?.map((item, i) => ({
        label: item?.departmentName,
        value: item?.departmentName,
      }));
    } else {
      // setIsLoading(false);
    }
    setDepartmentDropdown(apiData);
  };

  // Fetch Manager Data
  const getManagerData = async () => {
    const data = {
      department: DepartmentName,
    };

    const res = await HttpClient.requestData(
      "/view-employee-department-wise",
      "POST",
      data
    );
    // console.log("resGetCatman", res)
    let apiData = [];
    if (res && res?.status) {
      apiData = res?.data?.data?.map((item, i) => ({
        label: `${item.firstName} ${item.lastName}`,
        value: item._id,
      }));
    } else {
    }
    setOptions(apiData);
  };

  //handle change for first placeTime add more functionality
  const handleChange = (i, e) => {
    let newFormValues = [...placeTime];
    newFormValues[i][e.target.name] = e.target.value;
    setplaceTime(newFormValues);
  };

  //handle change for first trainingQuiz add more functionality
  const handleChangeTraingQuiz = (i, e) => {
    let newFormValues = [...trainingQuiz];
    newFormValues[i][e.target.name] = e.target.value;
    settrainingQuiz(newFormValues);
  };

  //for first add more functionality for trainingquiz add more
  const addFormFieldsTrainingQuiz = () => {
    settrainingQuiz([...trainingQuiz, initrainingquiz]);
  };

  //for first add more functionality
  const addFormFields = () => {
    setplaceTime([...placeTime, iniPhysicalData]);
  };

  //for removing add more field
  const removeFormFields = (i) => {
    let newFormValues = [...placeTime];
    newFormValues.splice(i, 1);
    setplaceTime(newFormValues);
  };

  //for videoLink functionality(upload video)
  const handleVideoChange = async (ind, e) => {
    setImageLoader5(true);
    let image = e.target.files[0];
    // setUploading(true);

    const form = new FormData();
    form.append("image", image);

    let res = await HttpClient.fileUplode("image-upload", "POST", form);

    if (res && res.status) {
      toast?.success("Document is uploaded successfully");
      // console.log("UploadImageResww", res);
      setplaceTime((prevVideos) => {
        const newVideos = [...prevVideos];
        newVideos[ind].Documents = res.image;
        return newVideos;
      });
    } else {
      // toast.error(res?.message);
    }
    setImageLoader5(false);
  };

  //function to nested add more content fields
  const addContentFields = (ind) => {
    let newDocArr = [
      ...placeTime[ind].LearningContent,
      {
        content: "",
      },
    ];
    setplaceTime((prev) => {
      return prev?.map((item, i) => {
        if (i === ind) {
          return { ...item, LearningContent: newDocArr };
        } else {
          return item;
        }
      });
    });
  };

  //handle change for nested add more functionality in Content
  const handleDocumentChange = (ind, index, e) => {
    let newDocArr = [...placeTime[ind].LearningContent];
    newDocArr[index][e.target.name] = e.target.value;
    setplaceTime((prev) => {
      return prev?.map((item, i) => {
        if (i === ind) {
          return { ...item, LearningContent: newDocArr };
        } else {
          return item;
        }
      });
    });
  };

  // Function to remove Content functionality
  const removeContentDocument = (ind) => {
    let newDocArr = [...placeTime[ind].LearningContent];
    newDocArr.splice(ind, 1);
    setplaceTime((prev) => {
      return prev?.map((item, i) => {
        if (i === ind) {
          return { ...item, LearningContent: newDocArr };
        } else {
          return item;
        }
      });
    });
  };

  //for getting internal trainer name
  // const getEmployeeData = async () => {
  //     const response = await HttpClient.request('', '');
  //     if (response && response.status) {
  //         const formattedOptions = response?.data?.data?.map((item) => ({
  //             value: item?._id,
  //             label: item?.userName,
  //         }));

  //         const formattedOptionsaudience = response?.data?.data?.map((item) => ({
  //             value: item?._id,
  //             label: item?.userName,
  //         }));

  //         setColourOptions(formattedOptions);
  //         setempData(response?.data?.data);
  //         setempDataaudience(response?.data?.data)
  //         setColourOptionsaudience(formattedOptionsaudience)

  //     } else {

  //     }
  // };

  //for getting selected internal trainer
  const handleSelectChange = (e) => {
    setSelectedOptions(e.value);
  };

  //for getting selected targeted audience
  const handleSelectChangeaudience = (e) => {
    setSelectedOptionsaudience(e);
  };

  // for submitting form functionality
  const submitHandler = async (e, selectedSubscription) => {
    e.preventDefault();
    let data = {};
    setIsLoading(true);
    if (trainingType == "") {
      return toast.error("Training Type is required");
    }

    if (trainingCategory == "") {
      return toast.error("Training Category is required");
    }

    if (title == "") {
      return toast.error("Training title is required");
    }

    if (language == "") {
      return toast.error("Language is required");
    }

    if (imageURL == "") {
      return toast.error("imageURL is required");
    }

    data = {
      trainingType: trainingType,
      trainingCategory: trainingCategory,
      title: title,
      language: language,
      image: imageURL,
      description: description,
      exTrainerName: trainerName,
      inTrainerName: selectedOptions,
      trainingCost: trainingCost,
      placeTime: placeTime,
      link: link,
      materials: materials,
      trainingQuiz: trainingQuiz,
      department: DepartmentName,
      targetAudiance: targetAudiance,
      // mentor: selectedOptions?.map((item) => item?.value),
    };

    console.log("hhhhhhhhhhh", data);
    // return
    const res = await HttpClient.requestData(
      "add-onboarding-training",
      "POST",
      data
    );
    if (res?.status) {
      toast.success("Training(Physically) is added successfully");
      settrainingType("");
      settrainingCategory("");
      settitle("");
      setlanguage("");
      setImage("");
      setImageURL("");
      setdescription("");
      settrainerName("");
      settrainingCost("");
      setplaceTime([iniPhysicalData]);
      setlink("");
      setmaterials("");
      settrainingQuiz([initrainingquiz]);
      settargetAudiance([]);
      setmentor([]);
    } else {
      toast.error(res?.response?.data?.message || "Something went wrong");
      console.log("ERROR CREATING USER3", res);
    }
    setIsLoading(false);
  };

  // >>>Fetch All Internal Trainer Name<<<
  const fetchInternalTrainerName = async () => {
    let option = [];
    const res = await HttpClient.requestData("view-all-employees", "GET");
    if (res && res?.status) {
      res?.data?.forEach((ele, index) => {
        option.push({ value: ele?.userName, label: ele?.userName });
      });
      setInternalTrainerName(option);
    }
  };

  // >>>Fetch All Department Name<<<
  const fetchDepartmentName = async () => {
    let option = [];
    const res = await HttpClient.requestData("view-department", "GET");
    if (res && res?.status) {
      res?.data?.forEach((ele, index) => {
        option.push({ value: ele?.departmentName, label: ele?.departmentName });
      });
      setDepartmentNameData(option);
      // addTargetDepartment();
    }
  };

  // >>>Fetch target Audience By Department Name<<<
  const addTargetDepartment = async (depName) => {
    let data = {
      department: depName,
    };
    // return
    let option = [];
    const res = await HttpClient.requestData(
      "view-employee-department-wise",
      "POST",
      data
    );
    console.log("bcvhsgdfweg", res?.data);
    if (res && res?.status) {
      res?.data?.forEach((ele, index) => {
        // console.log("xmncbvjhgdwyuqt156736", `${ele?.firstName} ${ele?.lastName}`)
        option.push({
          value: ele?._id,
          label: `${ele?.firstName} ${ele?.lastName}`,
        });
      });
      setTargetAudianceData(option);
    }
  };

  useEffect(() => {
    // getEmployeeData();
    getDepartmentData();
    fetchInternalTrainerName();
    fetchDepartmentName();
  }, []);

  useEffect(() => {
    getManagerData();
  }, [DepartmentName]);
  // view-all-employees
  return (
    <>
      {/* <div className="d-flex justify-content-end"> */}
      {/* <div className="form-header"> */}
      {/* <section className="piechartsBox_area"> */}
      {/* <div
                    style={headLineStyle}
                    className="page-headline"
                >
                    Add Training
                </div> */}

      <div className="trainingcreatepageright">
        <div className="">
          <form>
            <div className="trainingrifgtdivgappp">
              <p className="rsntxrpnewtxt">Training Description</p>
              <textarea
                className="txtdivallart"
                id="w3review"
                rows={4}
                cols={50}
                name="description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
            <div className="trainernameselectflx">
              <div className="trainernametextinputdiv">
                <p className="rsntxrpnewtxt">External Trainer Name(if any)</p>
                <input
                  type="text"
                  className="texttraingrightdiv"
                  name="trainerName"
                  value={trainerName}
                  onChange={(e) => settrainerName(e.target.value)}
                />
              </div>

              <div className="trainernametextinputdiv">
                <p className="rsntxrpnewtxt">Internal Trainer Name(if any)</p>
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  defaultValue={[]}
                  // isMulti
                  options={internalTrainerName}
                  onChange={handleSelectChange}
                />

                {/* <select name="" id="" className="typstrningwhselct">
                                    <option value="Virtual">Tarinner name</option>
                                    <option value="Physically">
                                        Tarinner name1</option>
                                    <option value="Physically">Tarinner name2</option>
                                </select> */}
              </div>
            </div>

            {/* Upload placetime section */}
            <div className="trainingrifgtdivgappp">
              {placeTime?.map((element, ind) => {
                return (
                  <>
                    <div className="trainingrifgtdivgapppbrdr" key={ind}>
                      <p className="rsntxrpnewtxtupld">PlaceTime</p>

                      <div className="videotitledesrtpupldflx">
                        <div className="videottldescrtflx">
                          <div className="videottldivwhgt">
                            <p className="rsntxrpnewtxt"> Building</p>
                            <input
                              type="text"
                              className="texttraingrightdiv"
                              name="Budling"
                              placeholder={`Building ${ind + 1}`}
                              value={element.Budling || ""}
                              onChange={(e) => handleChange(ind, e)}
                            />
                          </div>
                          <div className="videottldivwhgt">
                            <p className="rsntxrpnewtxt"> Room Number </p>
                            <input
                              className="txtdivallart"
                              type="text"
                              id="w3review"
                              name="RoomNumber"
                              placeholder={`Room Number ${ind + 1}`}
                              value={element.RoomNumber || ""}
                              onChange={(e) => handleChange(ind, e)}
                            />
                          </div>
                        </div>
                        <div className="vdoulddivpbupldg">
                          <p className="rsntxrpnewtxt">Documents</p>
                          <div className="bgcontainerupldbrdrdiv">
                            <div className="bgcrd">
                              <div className="bgcontaineruplddiv">
                                <div className="logouplddiv">
                                  <img src={Addicon} alt="..." />
                                  <div className="">
                                    <input
                                      type="file"
                                      className="upldimagediv"
                                      onChange={(e) =>
                                        handleVideoChange(ind, e)
                                      }
                                    ></input>
                                  </div>
                                </div>
                              </div>
                              <p className="upldtxtppdiv">Upload Document</p>
                            </div>
                          </div>
                          {imageLoader5 ? (
                            <>
                              <h5> Document uploading....</h5>
                            </>
                          ) : null}
                        </div>
                      </div>
                      <div className=" isinthetraining">
                        <p className="rsntxrpnewtxtupld">
                          What is in the training
                        </p>
                        <div className="vdoulddivpbflx">
                          <div className="vdoulddivpbflxwh">
                            <p className="rsntxrpnewtxt">
                              Duration of the training{" "}
                            </p>
                            <div className="divtrainingmainflx">
                              <div className="divtraininhfrst">
                                <input
                                  type="number"
                                  className="texttraingrightdiv"
                                  name="hour"
                                  placeholder={`duration in hour`}
                                  value={element?.duration?.hour || ""}
                                  onChange={(e) => handleChangeDur(ind, e)}
                                />
                              </div>
                              <div className="divtraininhfrst">
                                <input
                                  type="number"
                                  className="texttraingrightdiv"
                                  name="min"
                                  placeholder={`duration in min`}
                                  value={element?.duration?.min || ""}
                                  onChange={(e) => handleChangeDur(ind, e)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="vdoulddivpbflxwh">
                            <p className="rsntxrpnewtxt">Start Date </p>
                            <input
                              type="date"
                              className="texttraingrightdiv"
                              name="StartDate"
                              placeholder={`StartDate ${ind + 1}`}
                              value={element.StartDate || ""}
                              onChange={(e) => handleChange(ind, e)}
                            />
                          </div>

                          <div className="vdoulddivpbflxwh">
                            <p className="rsntxrpnewtxt">Start Time</p>
                            <input
                              type="text"
                              className="texttraingrightdiv"
                              name="startTime"
                              placeholder={`Start Time ${ind + 1}`}
                              value={element.startTime || ""}
                              onChange={(e) => handleChange(ind, e)}
                            />
                          </div>

                          {/* {
                                                        element?.videoDocument?.map((element, index) => {
                                                            return (<>
                                                                <div className='vdoulddivpbflxwh'>
                                                                    <p className="rsntxrpnewtxt">Documents related to the training </p>

                                                                    <div className='uploaddocumentbrdraddbtn'>
                                                                        <div className="uploaddocumentbrdr">
                                                                            <div className='bgcrdupload'>
                                                                                <div className='bgcontaineruplddocumnet'>
                                                                                    <div className='addimgicondivgg'>
                                                                                        <img src={Addicon} alt="..." />
                                                                                        <div className="">
                                                                                            <input
                                                                                                type="file"
                                                                                                className="upldimagediv"
                                                                                                onChange={e => HandleVideoDoc(ind, index, e)}
                                                                                            />
                                                                                        </div>


                                                                                    </div>

                                                                                    {imageLoader4 ? (
                                                                                        <>
                                                                                            <h5> Image uploading....</h5>
                                                                                        </>
                                                                                    ) : null}
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        <div className='btnalignt'>
                                                                            <button
                                                                                type="button"
                                                                                className='addmirfgghdivny'
                                                                                onClick={() => addVideosFields(ind)}
                                                                            >Add More</button>
                                                                        </div>
                                                                    </div>
                                                                    {index ? (
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-sm btn-danger ml-1"
                                                                            onClick={() => removeVideoDocument(ind)}
                                                                            style={{ marginTop: '9px' }}
                                                                        >
                                                                            <i class="fas fa-trash"></i>
                                                                        </button>
                                                                    ) : null}

                                                                </div>
                                                            </>)
                                                        })
                                                    } */}
                        </div>
                        {/* What Will You Lern section */}
                        {element?.LearningContent?.map((element, index) => {
                          return (
                            <div className="">
                              <div className="trainingrifgtdivgappp">
                                <div className="trainingqustonbtndltflx">
                                  <p className="rsntxrpnewtxt">
                                    What Will You Learn
                                  </p>
                                  <div className="">
                                    {index ? (
                                      <div className="btndltimgbgdivdkt">
                                        <div
                                          type="button"
                                          className=""
                                          onClick={() =>
                                            removeContentDocument(ind)
                                          }
                                          // style={{ marginTop: '9px' }}
                                        >
                                          <i className="fa-solid fa-trash"></i>
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>

                                <div className="">
                                  <div className="lrnupldinput">
                                    <input
                                      type="text"
                                      className="texttraingrightdiv"
                                      name="content"
                                      placeholder={`Content ${index + 1}`}
                                      value={element?.content}
                                      onChange={(e) =>
                                        handleDocumentChange(ind, index, e)
                                      }
                                    />
                                  </div>
                                  {/* <div className="addimngrtring">
                                    <img src={Addicon} alt="..." />
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          );
                        })}

                        <div className="addimngrtring">
                          <img
                            src={Addicon}
                            onClick={() => addContentFields(ind)}
                            alt="..."
                          />
                        </div>
                      </div>
                    </div>

                    {ind ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-danger ml-1"
                        onClick={() => removeFormFields(ind)}
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    ) : null}
                  </>
                );
              })}

              <div className="addmirfgghdivnydiv">
                <button
                  type="button"
                  className="addmirfgghdivny"
                  onClick={() => addFormFields()}
                >
                  Add More
                </button>
              </div>
            </div>

            <div className="trainingrifgtdivgappp">
              <p className="rsntxrpnewtxt">
                Add any Url, where they will learn
              </p>
              <input
                type="text"
                className="texttraingrightdiv"
                name="link"
                value={link}
                onChange={(e) => setlink(e.target.value)}
              />
            </div>

            <div className="trainingrifgtdivgappp">
              <p className="rsntxrpnewtxt">Training price (if any)</p>
              <input
                type="number"
                className="texttraingrightdiv"
                name="trainingCost"
                value={trainingCost}
                onChange={(e) => settrainingCost(e.target.value)}
              />
            </div>

            {/* Quiz Section */}
            <div className="trainingrifgtdivgappp">
              <p className="rsntxrpnewtxt">Quiz session:</p>

              {trainingQuiz?.map((element, ind) => {
                return (
                  <>
                    <div className="">
                      <div className="aaddiconinptfkld">
                        <div className="quentionnmbinputqust">
                          <span className="questionnmbr">
                            {`Q${ind + 1}`}
                            <input
                              type="text"
                              className="inptyflddiccv"
                              name="question"
                              placeholder={`question ${ind + 1}`}
                              value={element.question || ""}
                              onChange={(e) => handleChangeTraingQuiz(ind, e)}
                            />
                          </span>
                        </div>
                        <div className="anwrdivtyp">
                          <p className="anstxtwrttype">Answer Type :</p>
                          <select
                            name="ansType"
                            value={element.ansType}
                            id=""
                            className="answerdrpdwn"
                            onChange={(e) => handleChangeTraingQuiz(ind, e)}
                          >
                            <option>Select option</option>
                            <option value="Radio">Radio</option>
                            <option value="checkbox">Checkbox</option>
                          </select>
                        </div>

                        {/* Cheked button */}
                        {element.ansType === "checkbox" && (
                          <div className="cjhekeddivtxtdivmain">
                            <>
                              {/* A  */}
                              <div className="cjhekeddivtxt">
                                <input
                                  type="checkbox"
                                  name="answer"
                                  value="A"
                                  checked={element.answer === "A"}
                                  onChange={(e) =>
                                    handleChangeTraingQuiz(ind, e)
                                  }
                                />
                                <label htmlFor="vehicle1">A. </label>

                                <input
                                  type="text"
                                  defaultValue=""
                                  name="A"
                                  placeholder={`A ${ind + 1}`}
                                  value={element.A || ""}
                                  onChange={(e) =>
                                    handleChangeTraingQuiz(ind, e)
                                  }
                                />
                                {/* <label htmlFor="vehicle1"> I have a bike</label> */}
                              </div>

                              {/* B */}
                              <div className="cjhekeddivtxt">
                                <input
                                  type="checkbox"
                                  name="answer"
                                  value="B"
                                  checked={element.answer === "B"}
                                  onChange={(e) =>
                                    handleChangeTraingQuiz(ind, e)
                                  }
                                />
                                <label htmlFor="vehicle1">B. </label>
                                <input
                                  type="text"
                                  defaultValue=""
                                  name="B"
                                  placeholder={`B ${ind + 1}`}
                                  value={element.B || ""}
                                  onChange={(e) =>
                                    handleChangeTraingQuiz(ind, e)
                                  }
                                />
                                {/* <label htmlFor="vehicle1"> I have a bike</label> */}
                              </div>

                              {/* C */}
                              <div className="cjhekeddivtxt">
                                <input
                                  type="checkbox"
                                  name="answer"
                                  value="C"
                                  checked={element.answer === "C"}
                                  onChange={(e) =>
                                    handleChangeTraingQuiz(ind, e)
                                  }
                                />
                                <label htmlFor="vehicle1">C. </label>
                                <input
                                  type="text"
                                  defaultValue=""
                                  name="C"
                                  placeholder={`C ${ind + 1}`}
                                  value={element.C || ""}
                                  onChange={(e) =>
                                    handleChangeTraingQuiz(ind, e)
                                  }
                                />
                                {/* <label htmlFor="vehicle1"> I have a bike</label> */}
                              </div>

                              <div className="cjhekeddivtxt">
                                <input
                                  type="checkbox"
                                  name="answer"
                                  value="D"
                                  checked={element.answer === "D"}
                                  onChange={(e) =>
                                    handleChangeTraingQuiz(ind, e)
                                  }
                                />
                                <label htmlFor="vehicle1">D. </label>
                                <input
                                  type="text"
                                  defaultValue=""
                                  name="D"
                                  placeholder={`D ${ind + 1}`}
                                  value={element.D || ""}
                                  onChange={(e) =>
                                    handleChangeTraingQuiz(ind, e)
                                  }
                                />
                                {/* <label htmlFor="vehicle1"> I have a bike</label> */}
                              </div>

                              {/* <div className='cjhekeddivtxt'>
                                                                    <label htmlFor="vehicle1">Answer : </label>
                                                                    <input
                                                                        type="text"
                                                                        defaultValue=""
                                                                        name="answer"
                                                                        placeholder={`answer option ${ind + 1}`}
                                                                        value={element.answer || ''}
                                                                        onChange={e => handleChangeTraingQuiz(ind, e)}
                                                                    />
                                                                    
                                                                </div> */}
                            </>
                          </div>
                        )}

                        {element.ansType === "Radio" && (
                          <div className="">
                            <>
                              {/* <div className='radiobtntxtpp'>
                                                                            <input type="radio" id="html" name="fav_language" defaultValue="HTML" />
                                                                            <label htmlFor="html">Yes</label>
                                                                        </div>

                                                                        <div className='radiobtntxtpp'>

                                                                            <input type="radio" id="css" name="fav_language" defaultValue="CSS" />
                                                                            <label htmlFor="css">No</label>
                                                                        </div> */}

                              <div className="radiobtntxtpp">
                                <input
                                  type="radio"
                                  id={`radio-${ind}-A`}
                                  name="answer"
                                  value="A"
                                  checked={element.answer === "A"}
                                  onChange={(e) =>
                                    handleChangeTraingQuiz(ind, e)
                                  }
                                />
                                <label htmlFor={`radio-${ind}-A`}>Yes</label>
                              </div>

                              <div className="radiobtntxtpp">
                                <input
                                  type="radio"
                                  id={`radio-${ind}-B`}
                                  name="answer"
                                  value="B"
                                  checked={element.answer === "B"}
                                  onChange={(e) =>
                                    handleChangeTraingQuiz(ind, e)
                                  }
                                />
                                <label htmlFor={`radio-${ind}-B`}>No</label>
                              </div>
                            </>
                          </div>
                        )}
                      </div>
                      <div className="addimngrtring">
                        {/* <img src={Addicon} type='button' onClick={() => addFormFieldsTrainingQuiz()} alt="..." /> */}
                      </div>
                    </div>
                  </>
                );
              })}
              {/* <div className='addimngrtring'>
                                    <img src={Addicon} type='button' onClick={() => addFormFieldsTrainingQuiz()} alt="..." />
                                </div> */}
            </div>

            <div className="trainingrifgtdivgappp ">
              <p className="rsntxrpnewtxt">Select Department Name</p>

              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                options={departmentNameData}
                onChange={handleSelectDepartName}
                // value={DepartmentDropdown?.find(option => option.value === DepartmentName)}
              />
            </div>

            <div className="trainingrifgtdivgappp">
              <p className="rsntxrpnewtxt">Target Audience:</p>
              {/* <input 
                            type='text' 
                            className='texttraingrightdiv' 
                            /> */}

              <Select
                closeMenuOnSelect={true}
                components={animatedComponents}
                defaultValue={[]}
                isMulti
                options={targetAudianceData}
                onChange={handleSelectChangeaudiance}
                value={options?.filter((option) =>
                  targetAudiance.includes(option.value)
                )}
              />
            </div>

            <div className="trainingrifgtdivgappp">
              <p className="rsntxrpnewtxt">Materials/Equipment Needed</p>
              <textarea
                className="txtdivallart"
                id="w3review"
                rows={4}
                cols={50}
                name="materials"
                value={materials}
                onChange={(e) => setmaterials(e.target.value)}
              />
            </div>

            <div className="homePgCreModSubmitDiv">
              <button
                className="homePgCreModSubmitBtn btn1"
                type="button"
                onClick={submitHandler}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* </section> */}
      {/* </div> */}
      {/* </div > */}
    </>
  );
};

export default TrainingCreatePhysical;
