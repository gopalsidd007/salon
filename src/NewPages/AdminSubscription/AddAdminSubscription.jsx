import React, { useState } from 'react'
const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "15px",
    fontWeight: "bold",
  };

const AddAdminSubscription = () => {

    const [data,setData]=useState("")
    const [isEdit, setIsEdit] = useState(false);


    const handleChange=(e)=>{
            setData(e.target.value)
    }

    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();
    
        console.log("addservice", data);
    
        if (validate()) {
          return;
        }

        const details={
          subscriptionId:data
        }

        const res=await HttpClient.requestData("add-product","POST",details)
        if (res && res.status) {
            // setAddservice(res?.data)
            toast.success("Service added successfully");
        } else {
            toast.error(res?.message || "Profile not Created ");
        }
      };


    return (
        <div>
            <div className="d-flex justify-content-end">
                <div className="form-header">
                    <section className="piechartsBox_area">
                        <div style={headLineStyle} className="page-headline ">
                            Add Subscription id
                            <hr />
                        </div>


                        <form>
                            <div className='row'>
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">
                                        Select Subscription Id
                                        <span className="text-danger">&nbsp;*</span>
                                    </label>



                                    <select name="categoryId" onChange={handleChange} className="form-control">
                                        <option value="" >Select</option>
                                        <option value="1" >1</option>
                                        <option value="2" >2</option>
                                        <option value="3" >3</option>
                                    </select>
                                </div>


                            </div>

                            <div class="col-12 d-flex justify-content-end">
                {!isEdit ? (
                  <button
                    type="submit"
                    // onClick={(e) => handleSubmit(e)}
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
                    // onClick={(e) => handleEditSubmit(e)}
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
    )
}

export default AddAdminSubscription
