import React, { useState } from 'react'
import CustomLoader from '../../CustomComponents/loader/CustomLoader'
import toast from 'react-hot-toast';
import HttpClient from '../../utils/HttpClient';
import { useNavigate } from 'react-router-dom';
const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"

}
const RewardCardTheme = () => {
    const initValue = {
        image: "",
    }
    const [formValue, setFormValue] = useState(initValue);
    const [isLoading, setIsLoading] = useState(false);
    const [themeName, setThemeName] = useState('');
    const [themeColor, setThemeColor] = useState("");
    const [Image, setImage] = useState('')
    const Navigate = useNavigate()
    const [imageFile, setimageFile] = useState("");

    console.log(formValue, "formValue")

    const validate = () => {

        if (!themeName) {
            toast.error("Theme name required");
            return true;
        }
        if (!themeColor) {
            toast.error("Theme color required");
            return true;
        }
        return false;
    }
    // Submit
    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (validate()) {
            return
        }
        // const data = {
        //     "cardName": themeName,
        //     "image": formValue?.image,
        //     "cardColor": themeColor
        // }

        const data = {
            "cardName": themeName,
            "cardColor": themeColor,
            "cardImage": formValue.image

        }
        // console.log("kljh7gjhkkm",data) 
        setIsLoading(true);
        const res = await HttpClient.requestData("add-reward-card", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Added Successfully");
            setThemeName('');
            setThemeColor('');
            setIsLoading(false);
            Navigate("/view-reward-card")

        } else {
            toast.error("Reward Card Name Already Exists");
            setIsLoading(false);

        }
    };


    const handleImage = async (e) => {
        // console.log("e",e.target.files);
        setimageFile(URL.createObjectURL(e.target.files[0]))
        let formData = new FormData()

        formData.append("image", e.target.files[0])
        // setIsLoading(true);
        const res = await HttpClient.fileUplode("image-upload", "POST", formData);
        // console.log("image", res)
        // let img = "https://elites3bkt.s3.ap-south-1.amazonaws.com/image/c0cd7570-6e55-11ee-b35b-6f74a2fba80f.png"
        // setFormValue({...formValue,image:img})
        if (res && res?.status) {
            toast.success("Image Uploaded Successfully");
            setFormValue({ ...formValue, image: res?.image })
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
                            Add Card Theme Color
                        </div>
                        <form>
                            <div className="row">



                                <div className="col-12 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Card Name<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Card Name"
                                        name="themeName"
                                        value={themeName}
                                        onChange={(e) => setThemeName(e.target.value)}
                                    />
                                </div>


                                <div className="col-md-4 mt-3" >
                                    <label htmlFor="formGroupExampleInput">Select Your Card Theme Color<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="color"
                                        className="form-control"
                                        style={{ height: "130px", width: "45%", cursor: "pointer" }}
                                        placeholder="Choose color"
                                        value={themeColor}
                                        onChange={(e) => setThemeColor(e.target.value)}
                                    />
                                    <label htmlFor="formGroupExampleInput" className=" mt-2 p-2">Selected color code : <span style={{ color: themeColor, fontWeight: "bold" }}>{themeColor}</span></label>
                                </div>
                                <div className="col-md-6 mt-1">
                                    <div className="row" style={{ marginTop: "10px" }}>
                                        <div className="col ">
                                            <label htmlFor="formGroupExampleInput" className='edit-tag'>Image*: </label>
                                            <input
                                                className='mx-1'
                                                type="file"
                                                onChange={(e) => handleImage(e)}
                                            />
                                            <br></br>

                                            {imageFile && (
                                                <div >
                                                    <img
                                                        alt="not found"
                                                        width={"250px"}
                                                        src={imageFile}
                                                    />
                                                    <br />
                                                    <button onClick={() => setimageFile(null)}
                                                        className='btn btn-danger btn-grad-cancel mt-1'
                                                        style={{ marginLeft: "167px" }}>Remove</button>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>

                            </div>





                            {/* Button */}
                            <div class="col-12 d-flex justify-content-end ">
                                {

                                    <button
                                        type="submit"
                                        onClick={(e) => handleSubmit(e)}
                                        class="btn btn-primaryb mt-3"
                                        style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                    >
                                        Apply Card Theme Color
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

export default RewardCardTheme