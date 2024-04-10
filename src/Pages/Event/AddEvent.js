
import React, { useState } from 'react'
import HttpClient from '../../utils/HttpClient';
import toast from 'react-hot-toast';
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "11px",
    fontWeight: "bold"

}
const AddEvent = () => {

    const [isLoading, setIsLoading] = useState(false);

    const initValue = {
        eventName: "",
        companyName: "",
        image: "",

    }
    const [formValue, setFormValue] = useState(initValue);
    const [eventDate, seteventDate] = useState('');
    const [imageFile, setimageFile] = useState("");
    const navigate = useNavigate()
    console.log(formValue, eventDate, " console.log(formValue);");


    // console.log("formValueddf", formValue)

    // other inputs change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue(prev => ({ ...prev, [name]: value }));
    }




    // validate
    const validate = () => {
        // Convert the input event date string to a Date object
        const selectedDate = new Date(eventDate);
        // Get the current date
        const currentDate = new Date();
        // Set hours, minutes, seconds, and milliseconds of currentDate to 0
        currentDate.setHours(0, 0, 0, 0);


        if (!formValue?.eventName) {
            toast.error("Event Name is required");
            return true
        }
        if (!formValue?.companyName) {
            toast.error("Company Name Name is required");
            return true
        }
        if (!eventDate) {
            toast.error("Event Date is required");
            return true
        }
        if (selectedDate < currentDate) {
            toast.error("Event Date cannot be in the past");
            return true;
        }
        if (!formValue?.image) {
            toast.error("Image is required");
            return true
        } 
        return false
    }

    // submit
    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        // console.log("formValue",formValue);
        e.preventDefault();

        if (validate()) {
            return
        }

        const data = {
            "eventName": formValue.eventName,
            "image": formValue.image,
            "hostedBy": formValue.companyName,
            "eventDate": moment(eventDate).format("YYYY-MM-DD"),


        }
        setIsLoading(true);
        const res = await HttpClient.requestData("add-event", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Event Uploaded Successfully");
            setFormValue(initValue);
            setimageFile("")
            seteventDate('')
            navigate('/manage-event');
            setIsLoading(false);
        } else {
            toast.error("Event Name Already Exists , Please Try A Different One");
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
                            Add Event
                        </div>
                        <form>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="formGroupExampleInput" className='edit-tag'>
                                        Event Name
                                        <span style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Event Name"
                                        name="eventName"
                                        value={formValue.eventName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="formGroupExampleInput" className='edit-tag'>Company Name
                                        <span style={{ color: "red" }}>*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Company Name"
                                        name="companyName"
                                        value={formValue.companyName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div class="col-12 mt-2">
                                    <label for="inputEmail4" class="form-label edit-tag">
                                        Event Date
                                    </label>
                                    <span style={{ color: "red" }}>*</span>
                                    <input
                                        type="date"
                                        className="form-control w-50"

                                        onChange={(e) => seteventDate(e.target.value)}
                                        value={eventDate}

                                    />
                                </div>

                            </div>


                            <div className="row" style={{ marginTop: "10px" }}>
                                <div className="col ">
                                    <label htmlFor="formGroupExampleInput" className='edit-tag'>Image*: </label>
                                    <input
                                        className='mx-1'
                                        type="file"
                                        onChange={handleImage}
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

                            <div class="col-12 d-flex justify-content-end ">

                                <button
                                    type="submit"
                                    onClick={(e) => handleSubmit(e)}
                                    class="btn btn-primaryb mt-3"
                                    style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                >
                                    Add Event
                                </button>

                            </div>


                        </form>
                    </section>
                </div>
            </div >


        </div >

    )
}

export default AddEvent
