

import React, { useEffect, useState } from 'react'
import CustomLoader from '../../../CustomComponents/loader/CustomLoader';
import toast from 'react-hot-toast';
import HttpClient from '../../../utils/HttpClient';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { FaStarOfLife } from 'react-icons/fa';
const headLineStyle = {
  textAlign: "center",
  fontSize: "30px",
  color: "#868e96",
  margin: "15px",
  fontWeight: "bold"

}

const AddEmployee = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  //const [EmpData, setEmpData] = useState([]);
  const initValue = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNo: "",
    address: ""

  }

  const [formValue, setFormValue] = useState(initValue);
  const [options, setOptions] = useState([]); // Options for the dropdown
  const [getManagerList, setGetManagerList] = useState([]);; // Selected Manager ID
  const animatedComponents = makeAnimated();
  console.log(getManagerList, "manager");
  //Designation/Department dropdown
  const [DepartmentDropdown, setDepartmentDropdown] = useState([]);
  const [DepartmentName, setDepartmentName] = useState("");
  // console.log(selectedIds, "selectedIds");
  const [hrData, setHrData] = useState([]); // Options for the dropdown
  const [HrId, setHrid] = useState(null); // Selected IDs
  console.log(HrId, hrData, "selectedIds");

  const validate = () => {
    if (!formValue?.firstName) {
      toast.error("firstName is required");
      return true
    }
    if (!formValue?.lastName) {
      toast.error("lastName is required");
      return true
    }
    if (!DepartmentName) {
      toast.error("select designation name");
      return true
    }


    if (!formValue?.email) {
      toast.error("email is required");
      return true
    }
    if (!formValue?.password) {
      toast.error("password is required");
      return true
    }
    if (!formValue?.phoneNo) {
      toast.error("phoneNo is required");
      return true
    }
    if (!formValue?.address) {
      toast.error("Address is required");
      return true
    }
    if (!HrId) {
      toast.error("Manager should be assigned by a HR");
      return true
    }

    return false
  }

  //Fetch Manager Data
  const getManagerData = async () => {
    const data = {
      "department": DepartmentName
    }
    setIsLoading(true);
    const res = await HttpClient.requestData("view-manager-department-wise", "POST", data);
    console.log("resGetCatman", res)
    let apiData = []
    if (res && res?.status) {
      setIsLoading(false);
      apiData = res?.data?.map((item, i) => ({
        label: `${item.firstName} ${item.lastName}`,
        value: item._id,

      }));
    } else {
      setIsLoading(false);
    }
    setOptions(apiData);
  }
  // get HR Data
  const getHrData = async () => {
    setIsLoading(true);
    const res = await HttpClient.requestData("companyAdmin-view-card", "POST", {});
    console.log("resGetCat", res)
    let apiData = []
    if (res && res?.status) {
      setIsLoading(false);
      apiData = res?.data?.hrData?.map((item, i) => ({
        label: `${item.firstName} ${item.lastName}`,
        value: item._id,

      }));
    } else {
      setIsLoading(false);
    }
    setHrData(apiData);
  }

  // get Designation/Department Data
  const getDepartmentData = async () => {
    setIsLoading(true);
    const res = await HttpClient.requestData("view-department", "GET", {});
    console.log("resGetCat", res)
    let apiData = []
    if (res && res?.status) {
      setIsLoading(false);
      apiData = res?.data?.map((item, i) => ({
        label: item?.departmentName,
        value: item?.departmentName,

      }));
    } else {
      setIsLoading(false);
    }
    setDepartmentDropdown(apiData);
  }


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValue(prev => ({ ...prev, [name]: value }));
  }
  // Manager data view department wise
  const handleSelectChange = selectedOption => {
    // Update the selected IDs array
    setGetManagerList(selectedOption ? selectedOption.map(option => option.value) : []);
  }

  //pick department name
  const handleSelectDepartName = selectedOption => {
    // Update the selected IDs array
    setDepartmentName(selectedOption ? selectedOption.value : "");
  }
  const handleSelectHrID = selectedOption => {
    // Update the selected IDs array
    setHrid(selectedOption ? selectedOption.value : null);
  }


  const handleSubmit = async (e) => {
    // console.log("valuesdd");
    e.preventDefault();

    if (validate()) {
      return
    }

    const data = {
      "firstName": formValue?.firstName,
      "lastName": formValue?.lastName,
      "userType": "Employee",
      "designation": DepartmentName,
      "email": formValue?.email,
      "password": formValue?.password,
      "contact": parseInt(formValue?.phoneNo),
      "managedBy": getManagerList,
      "adminID": HrId,

    }
    setIsLoading(true);
    const res = await HttpClient.requestData("companyAdmin-register-employee", "POST", data);
    // console.log("resCat", res)
    if (res && res?.status) {
      toast.success("Added Successfully");
      setFormValue(initValue);
      // navigate('/manage-category');
      setGetManagerList([])
      setHrid(null)
      setIsLoading(false);
      console.log(data, "apiData")
    } else {
      toast.error(res?.message || "Something Wrong");
      setIsLoading(false);
    }
  };

  // import user excel
  const importExcelChange = async (e) => {
    const file = e.target.files[0]
    let data = new FormData();
    data.append("xlsx", file);
    console.log("excell", e.target.files[0])
    let res = await HttpClient.fileUplode("import-user", "POST", data);
    console.log("resss", res);
    if (res && res?.success) {
      toast.success("Employee Data Added Successfully");
    } else {
      toast.error(res?.message || "Something Went Wrong");
    }
  }

  useEffect(() => {
    //getManagerData();
    getDepartmentData();
    getHrData();
  }, [])


  useEffect(() => {
    getManagerData()
  }, [DepartmentName]);


  return (
    <div>

      <CustomLoader loading={isLoading} />


      <div className="d-flex justify-content-end">

        <div className="form-header">
          <section className="piechartsBox_area">
            <div
              style={headLineStyle}
              className="page-headline"
            >
              Add Employee <hr />
            </div>


            <div className='d-flex justify-content-start ' style={{ position: "relative" }}>
              <button className='btn btn-secondary'>
                Upload Excel
              </button>

              <input
                className='addExcelInput'
                type='file'
                placeholder='select Image'
                onChange={(e) => importExcelChange(e)}
              />
            </div>

            <form>
              <div className="row">



                <div className="col-md-6 mt-4 ">
                  <label htmlFor="formGroupExampleInput">First Name<span className="text-danger">&nbsp;*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name="firstName"
                    value={formValue.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">Last Name<span className="text-danger">&nbsp;*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    name="lastName"
                    value={formValue.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">Email<span className="text-danger">&nbsp;*</span></label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    name="email"
                    autocomplete="off"
                    value={formValue?.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">Password<span className="text-danger">&nbsp;*</span></label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="password"
                    name="password"
                    value={formValue?.password}
                    autocomplete="off"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">Contact No<span className="text-danger">&nbsp;*</span></label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Contact Number"
                    name="phoneNo"
                    value={formValue?.phoneNo}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">Address<span className="text-danger">&nbsp;*</span></label>
                  <textarea

                    className="form-control"
                    placeholder="Enter your address here(e.g. '123 Main Street, Cityville, State, ZIP Code')"
                    name="address"
                    value={formValue?.address}
                    onChange={handleChange}
                  />

                </div>
                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">Search/Select Department Name<span className="text-danger">&nbsp;*</span></label>

                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}

                    options={DepartmentDropdown}
                    onChange={handleSelectDepartName}
                    value={DepartmentDropdown.find(option => option.value === DepartmentName)}
                  />
                </div>
                <div className="col-md-6 mt-3">
                  <label htmlFor="formGroupExampleInput">Assign In (Department Manager)</label>

                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={options}
                    onChange={handleSelectChange}
                    value={options.filter(option => getManagerList.includes(option.value))}
                  />
                </div>
                <div className="col-md-6 mt-3">
                  <label htmlFor="formGroupExampleInput">Select Hr Manager/Hr BP<span className="text-danger">&nbsp;*</span></label>

                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}

                    options={hrData}
                    onChange={handleSelectHrID}
                    value={hrData.find(option => option.value === HrId)}
                  />
                </div>


              </div>


              {/* Button */}
              <div className="col-12 d-flex justify-content-end ">

                {
                  !isEdit
                    ?
                    <button
                      type="submit"
                      onClick={(e) => handleSubmit(e)}
                      class="btn btn-primaryb mt-3"
                      style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                    >
                      Add Data
                    </button>
                    :
                    <button
                      type="submit"
                      // onClick={(e) => handleEditSubmit(e)}
                      class="btn btn-primaryb mt-3"
                      style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                    >
                      Update Checklist
                    </button>
                }

              </div>
            </form>

          </section>
        </div>
      </div >




    </div >
  )
}

export default AddEmployee