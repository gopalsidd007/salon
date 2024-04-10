import React, { useState } from 'react'
import CustomLoader from '../../CustomComponents/loader/CustomLoader'
import HttpClient from '../../utils/HttpClient';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"

}

const Reward = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [Rewardname, setrewardname] = useState("");
    const [RewardPoint, setrewardPoint] = useState("");

    const navigate= useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Rewardname === "" || RewardPoint === "" ||parseInt(RewardPoint) < 0) {
            toast.error("Input field blank or RewardPoint is negative")
            return false;
        }
        
        const data = {
            "rewardName": Rewardname,
            "reward": RewardPoint
        }
        setIsLoading(true)
        const res = await HttpClient.requestData("add-reward", "POST", data);
        if (res && res?.status) {
            toast.success(res?.message);
            setIsLoading(false);
            setrewardname("");
            setrewardPoint("");
            navigate("/manage-reward")

        } else {
            alert("error");
            toast.error("Please add valid data"||res?.message);
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
                            Add Reward Point
                        </div>
                        <form>
                            <div className="row">



                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Reward Name<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Reward Name"
                                        name=""
                                        value={Rewardname}
                                        onChange={(e) => setrewardname(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Reward Point<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Reward Point"
                                        name=""
                                        value={RewardPoint}
                                        onChange={(e) => setrewardPoint(Math.max(e.target.value, 0))}
                                    />
                                </div>




                            </div>





                            {/* Button */}
                            <div class="col-12 d-flex justify-content-end ">

                                <button
                                    type="submit"
                                    onClick={(e) => handleSubmit(e)}
                                    class="btn btn-primaryb mt-3"
                                    style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                >
                                    Add Data
                                </button>

                            </div>
                        </form>

                    </section>
                </div>
            </div >




        </div >
    )
}

export default Reward