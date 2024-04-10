import React, { useState } from "react";
import toast from "react-hot-toast";
const headLineStyle = {
  textAlign: "center",
  fontSize: "30px",
  color: "#868e96",
  margin: "15px",
  fontWeight: "bold",
};

const AddServiceEmployee = () => {
  const initialData = {
    serviceData: [
      "660ea44d99ed722106829331",
      "660ea4b199ed722106829337",
      "660ea4dd99ed72210682933a",
    ],
    ename: "",
    email: "",
    address: "",
    phone: "",
    idProof: "",
  };

  const [data, setData] = useState(initialData);
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {

    const {name,value}=e.target;

    setData((prev)=>({...prev,[name]:value}))
  };

const validate=()=>{
  if(!data.ename){
    toast.error("Employee name required")
    return true;
  }
  if(!data.email){
    toast.error("Email  required")
    return true;
  }
  if(!data.address){
    toast.error("Address  required")
    return true;
  }

  if(!data.phone){
    toast.error("ID  required")
    return true;
  }
  if(!data.idProof){
    toast.error("ID  required")
    return true;
  }
  if(!data.serviceData){
    toast.error("Service Data required")
    return true;
  }
  return false;
}

const handleSubmit=(e)=>{

  e.preventDefault();

  if(validate()){
    return ;
  }

  console.log("employeedata",data)

}
  

  return (
    <div>
      <div className="d-flex justify-content-end">
        <div className="form-header">
          <section className="piechartsBox_area">
            <div style={headLineStyle} className="page-headline ">
              Add Employee
              <hr />
            </div>

            <form>
              <div className="row">
                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">
                    name<span className="text-danger">&nbsp;*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ename"
                    name="ename"
                    value={data.ename}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">
                    email<span className="text-danger">&nbsp;*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">
                  address<span className="text-danger">&nbsp;*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" address"
                    name="address"
                    value={data. address}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">
                  phone<span className="text-danger">&nbsp;*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="phone"
                    name="phone"
                    value={data. phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">
                  idProof<span className="text-danger">&nbsp;*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" idProof"
                    name="idProof"
                    value={data.idProof}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">
                  serviceData<span className="text-danger">&nbsp;*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="serviceData"
                    name="serviceData"
                    value={data.serviceData}
                    onChange={handleChange}
                  />
                </div>


              </div>

              {/* //////-- Button -----/// */}
              <div class="col-12 d-flex justify-content-end">
                {!isEdit ? (
                  <button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    class="btn btn-primaryb mt-3"
                    style={{
                      background:
                        "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
                      color: "#fff",
                    }}
                  >
                    Add Data
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={(e) => handleEditSubmit(e)}
                    class="btn btn-primaryb mt-3"
                    style={{
                      background:
                        "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
                      color: "#fff",
                    }}
                  >
                    Update Checklist
                  </button>
                )}
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddServiceEmployee;
