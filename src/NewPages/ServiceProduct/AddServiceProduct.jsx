import React, { useState } from "react";
import toast from "react-hot-toast";
const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "15px",
    fontWeight: "bold",
};

const AddServiceProduct = () => {
    const initialData = {
        product_name: "",
        quantity: "",
        price: "",
        image: "",
    };

    const [data, setData] = useState(initialData);
    const [isEdit, setIsEdit] = useState(false);

    const handleChange = (e) => { 
        const {name,value}=e.target;
        setData((prev)=>({...prev,[name]:value}))
        
    };

    const validate=()=>{
        if(!data?.product_name){
            toast.error("Product Nmae Required")
            return true
        }
        if(!data?.quantity){
            toast.error("Quantity Required")
            return true
        }
        if(!data?.price){
            toast.error("Price Nmae Required")
            return true
        }
        return false;
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        if(validate()){
            return ;
        }
        toast.success("data updated")
    }



    return (
        <div>
            <div className="d-flex justify-content-end">
                <div className="form-header">
                    <section className="piechartsBox_area">
                        <div style={headLineStyle} className="page-headline ">
                            Add Service Product
                            <hr />
                        </div>

                        <form>
                            <div className="row">
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">
                                        product_name<span className="text-danger">&nbsp;*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="product_name"
                                        name="product_name"
                                        value={data.product_name}
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
                                    quantity<span className="text-danger">&nbsp;*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="quantity"
                                        name="quantity"
                                        value={data.quantity}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div class="col-md-6">
                                <label for="inputEmail4" className={`form-label ${isEdit ? 'edit-tag' : ''}`}   >
                                    Image
                                </label>

                                <span style={{ color: "red" }}>*</span>
                                <div className=' d-flex '>
                                    <input
                                        type="file"
                                        accept='image/png,image/jpeg,image/jpg'
                                        className="form-control"
                                        placeholder=''
                                        // onChange={(e) => handleChange(e, index)}
                                        //  value={}
                                        name="image"
                                    />
                                </div>

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

export default AddServiceProduct;
