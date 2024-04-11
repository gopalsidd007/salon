import React, { useState } from 'react'
const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "15px",
    fontWeight: "bold",
};




const AddInventory = () => {

    const [data, setData] = useState({
        serviceId: ""
    });
    const [isEdit, setIsEdit] = useState(false);

    const initfield = {
        productId: "",
        quantityType: "",
        quantity: ""
    }
    const [addfield, setAddfield] = useState([initfield])

    console.log("addfield",addfield)

    const handleChange=(e)=>{
            setData({...data,serviceId:e.target.value})
    }


    const newhandlechange = (e, i) => {
        const { name, value } = e.target;
        let newArr = [...addfield];
        newArr[i][name] = value;
        setAddfield(newArr);
        console.log("namevalue", newArr);
        // console.log("namevalue", name, value, i, newArr[i][name]);
      };

    const extrafield = (event) => {
        event.preventDefault();

        setAddfield([...addfield, initfield]);
        // addfield.push(initfield)
    };



   const handleSubmit=async(e)=>{

    e.preventDefault();
    const details={
        serviceId:data,
        productData: addfield
    }

     const res=await HttpClient.requestData("add-inventory","POST",details)
            if (res && res.status) {
                // setAddservice(res?.data)
                toast.success("Service added successfully");
            } else {
                toast.error(res?.message || "Profile not Created ");
            }

    console.log("formdata",formdata)
   }


    

    return (
        <div>

            <div className="d-flex justify-content-end">
                <div className="form-header">
                    <section className="piechartsBox_area">
                        <div style={headLineStyle} className="page-headline ">
                            Add Inventory
                            <hr />
                        </div>

                        <form>
                            <div className="row">
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">
                                        Select service Id
                                        <span className="text-danger">&nbsp;*</span>
                                    </label>

                                    <select
                                        name="stockId"
                                        onChange={handleChange}
                                        className="form-control"
                                    >
                                        <option value="">Select</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>

                                {/* <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">
                                        Used Quantity<span className="text-danger">&nbsp;*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="usedQuantity"
                                        name="usedQuantity"
                                        value={data.usedQuantity}
                                        onChange={handleChange}
                                    />
                                </div> */}
                            </div>

                            {/* //-------------------------------->add more<---------------------------------------------------------------- */}
                            
                            <i class="fa fa-plus" aria-hidden="true" onClick={(e) =>{extrafield(e)}}></i>
                            {/* <button onClick={(e) =>{extrafield(e)}}>add more</button> */}

                                    <div>

                            {

                                addfield.map((post, i) => (

                                    <div className="row" key={i}>
                                        <div className="col-md-1 mt-5">
                                     
                                        <i class="fa fa-trash" aria-hidden="true"  onClick={() => {
                          setAddfield(addfield.filter((a, ind) => ind != i));
                        }}></i>
                                        </div>
                                        
                                        <div className="col-md-4 mt-3 " >
                                            <label htmlFor="formGroupExampleInput">
                                                Product Id<span className="text-danger">&nbsp;*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="productId"
                                                name="productId"
                                                value={addfield.productId}
                                                onChange={(e) => newhandlechange(e, i)}
                                            />
                                        </div>
                                        <div className="col-md-4 mt-3 " >
                                            <label htmlFor="formGroupExampleInput">
                                            quantityType<span className="text-danger">&nbsp;*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="quantityType"
                                                name="quantityType"
                                                value={addfield.quantityType}
                                                onChange={(e) => newhandlechange(e, i)}
                                            />
                                        </div>
                                        <div className="col-md-3 mt-3 " >
                                            <label htmlFor="formGroupExampleInput">
                                            quantity<span className="text-danger">&nbsp;*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="quantity"
                                                name="quantity"
                                                value={addfield.productId}
                                                onChange={(e) => newhandlechange(e, i)}
                                            />
                                        </div>
                                    </div>
                                ))
                            }

                </div>


                          





                            {/* //////-- Button -----/// */}
                            <div class="col-12 d-flex justify-content-end">
                                {!isEdit ? (
                                    <button
                                        type="submit"
                                        onClick={(e,i) => handleSubmit(e,i)}
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
    )
}

export default AddInventory
