import React, { useState } from 'react'
import CustomLoader from '../../CustomComponents/loader/CustomLoader'
import HttpClient from '../../utils/HttpClient';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"

}
const AddLink = () => {
    const [catName, setCatName] = useState()
    const [description, setDescription] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [coverImg, setCoverImg] = useState(null);
    const navigate = useNavigate()




    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (!catName) {
            return toast.error("Please put your link");
        }

        const data = {
            link: catName,
            description: description,
            image: coverImg
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("add-section", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Link Added Successfully");
            setCatName("");
            setCoverImg(null)
            // navigate('/manage-category');
            setIsLoading(false);
            navigate("/manage-link")
        } else {
            toast.error(res?.message);
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        // console.log("pallab", e.target.value)
        setCatName(e.target.value)

    }
    //image
    const handleImage = async (e) => {
        // console.log("e",e.target.files);
        // setimageFile(URL.createObjectURL(e.target.files[0]))
        let formData = new FormData()

        formData.append("image", e.target.files[0])
        // setIsLoading(true);
        const res = await HttpClient.fileUplode("image-upload", "POST", formData);
        if (res && res?.status) {
            toast.success("Image Uploaded Successfully");
            // setAllData({ ...AllData, image: res.image })
            setCoverImg(res?.image);
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }

    }
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
                            Add Link
                        </div>
                        <form>
                            <div className="row ">



                                <div className="col-12 mt-3 ">
                                    <label htmlFor="formGroupExampleInput" className='edit-tag'>Your Link<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="text"
                                        className="form-control w-75"
                                        placeholder='Link'
                                        onChange={handleChange}
                                        value={catName}
                                        name="category"
                                    />
                                </div>
                                <div className="col-12 mt-3 ">
                                    <label htmlFor="formGroupExampleInput" className='edit-tag'>Description<span className="text-danger">&nbsp;*</span></label>
                                    <textarea
                                        className="form-control w-75"
                                        placeholder='Description'
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        name="description"
                                    />
                                </div>
                                <div className='col-4 mt-2'>
                                    <input type="file" onChange={handleImage} />

                                    {coverImg && (<div>
                                        <img
                                            alt="not found"
                                            width={"250px"}
                                            src={coverImg}
                                        />
                                        <br />
                                        <button
                                            type="button"
                                            className="btn btn-primaryb mt-3"
                                            style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                            onClick={() => setCoverImg(null)}>Remove</button>
                                    </div>)}
                                </div>





                            </div>
                            {/* Button */}
                            <div class="row ">
                                <div className='col-10'>

                                </div>
                                <div className='col-2'>
                                    <div className=' d-flex justify-content-end '>
                                        <button
                                            type="submit"
                                            onClick={(e) => handleSubmit(e)}
                                            className="form-control "
                                            style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                        >
                                            Add Link
                                        </button>
                                    </div>
                                </div>


                            </div>

                        </form>

                    </section>
                </div>
            </div >




        </div >
    )
}

export default AddLink