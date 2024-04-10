import React, { useState } from "react";
import toast from "react-hot-toast";
const headLineStyle = {
  textAlign: "center",
  fontSize: "30px",
  color: "#868e96",
  margin: "15px",
  fontWeight: "bold",
};

const AddService = () => {
    
  const initialData = {
    serviceType: "",
    categoryId: "",
    subCategoryId: "",
    price: "",
    duration: "",
    product: ["", ""]
  };

  const [data, setData] = useState(initialData);
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    if (!data?.categoryId) {
      toast.error("categoryId is required");
      return true;
    }
    if (!data?.subCategoryId) {
      toast.error("subCategoryId is required");
      return true;
    }

    if (!data?.duration) {
      toast.error("duration is required");
      return true;
    }
    if (!data?.price) {
      toast.error("price is required");
      return true;
    }
    if (!data?.serviceType) {
      toast.error("serviceType is required");
      return true;
    }

    if (!data?.product) {
        toast.error("product is required");
        return true;
      }

    return false;
  };

  const handleSubmit = async (e) => {
    // console.log("valuesdd");
    e.preventDefault();

    console.log("addservice", data);

    if (validate()) {
      return;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <div className="form-header">
          <section className="piechartsBox_area">
            <div style={headLineStyle} className="page-headline ">
              Add Service 
              <hr />
            </div>

            <form>
              <div className="row">
                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">
                    Select category Id
                    <span className="text-danger">&nbsp;*</span>
                  </label>

                

                  <select  name="categoryId" onChange={handleChange} className="form-control">
                  <option value="" >Select</option>
                    <option value="1" >1</option>
                    <option value="2" >2</option>
                    <option value="3" >3</option>
                  </select>
                </div>

                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">
                    Select   subCategoryId
                    <span className="text-danger">&nbsp;*</span>
                  </label>

                

                  <select  name="subCategoryId" onChange={handleChange}  className="form-control">
                  <option value="" >Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

              
                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">
                    duration<span className="text-danger">&nbsp;*</span>
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    placeholder="duration"
                    name="duration"
                    value={data.duration}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">
                    price<span className="text-danger">&nbsp;*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="price"
                    name="price"
                    value={data.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">
                    Service Type<span className="text-danger">&nbsp;*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="serviceType"
                    name="serviceType"
                    value={data.serviceType}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">
                    Product<span className="text-danger">&nbsp;*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="product"
                    name="product"
                    value={data.product}
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

export default AddService;
