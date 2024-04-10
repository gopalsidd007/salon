import React, { useState } from "react";
import toast from "react-hot-toast";

const headLineStyle = {
  textAlign: "center",
  fontSize: "30px",
  color: "#868e96",
  margin: "15px",
  fontWeight: "bold",
};

const AddStock = () => {
    
  const [data, setData] = useState({
    productId: "",
    quantity: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    // console.log("valuesdd");
    e.preventDefault();

    console.log("addstock", data);

    // if (validate()) {
    //   return;
    // }
  };

  return (
    <div>
      <div className="d-flex justify-content-end">
        <div className="form-header">
          <section className="piechartsBox_area">
            <div style={headLineStyle} className="page-headline ">
              Add Stock
              <hr />
            </div>

            <form>
              <div className="row">
                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">
                    Select Product Id
                    <span className="text-danger">&nbsp;*</span>
                  </label>

                  <select
                    name="productId"
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>

                <div className="col-md-6 mt-3 ">
                  <label htmlFor="formGroupExampleInput">
                    Product Quantity<span className="text-danger">&nbsp;*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="product"
                    name="quantity"
                    value={data.quantity}
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

export default AddStock;