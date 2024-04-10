import React, { useEffect, useState } from 'react'
import PieChartsBox from '../../View/Home/PieChartsBox'
import CustomLoader from '../../CustomComponents/loader/CustomLoader'
import HttpClient from '../../utils/HttpClient';
import toast from 'react-hot-toast';
import { object } from 'yup';

const Analys = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [catName, setCatName] = useState()
    const [catData, setCatData] = useState([]);
    const [AnsData, setAnsData] = useState([]);
    const [AllData, setAllData] = useState([]);
    const [imageLoader, setImgLoader] = useState(false);
    const [catID, setCatID] = useState("");
    const [isDelete, setIsDelete] = useState(true);
 
    const [AnsPercentage, setAnsPercentage] = useState([]);
    const [AnsOption, setAnsOption] = useState([]);


    console.log(catID, "catID")
    console.log(AnsData, "AnsData")
    console.log(AnsPercentage, "AnsPercentage", AnsOption,catID)


    // get Question data
    const getQuestionData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("get-login-survey", "GET", {});
        console.log("resCat", res);
        if (res && res?.status) {
            setIsLoading(false);
            setCatData(res?.data);
        } else {
            setIsLoading(false);
            toast(res?.message)
        }
    }

    // other inputs change
    const handleChange = (e) => {
        setCatID(e.target.value)
      

    }

    // get answer wise data

    const getAnsWiseData = async (id) => {

        const res = await HttpClient.requestData("get-login-survey-answise/" + id, "POST", {})
        console.log("resCatAns", res);
        if (res && res?.status) {
            setAnsData(res?.data?.[0])
            // setAnsOptions(Object.keys(res?.data?.[0]));
            setAnsPercentage(res?.data?.[0]?.surveyAttempt?.[0]?.results?.map((item,i)=> item?.percentage))
            setAnsOption(res?.data?.[0]?.surveyAttempt?.[0]?.results?.map((item,i)=> item?.answer))
        }
        // else {
        //     toast.error(res?.msg)
        // }
    }



    useEffect(() => {
        getQuestionData();
    }, [])

    useEffect(() => {
        getAnsWiseData(catID);
    }, [catID])

    return (
        <div className="d-flex justify-content-end">
            <div className="form-header">

                <CustomLoader loading={isLoading} />
                <div className="three mb-1">
                    <h5>Answer Survey</h5>
                </div>
                <section className="piechartsBox_area">

                    <form>
                        <div className="row">
                            <div className="col-12 mb-4">
                                <label htmlFor="formGroupExampleInput">All Questions</label>
                                <select
                                    class="form-control"
                                    aria-label="Default select example"
                                    name="catID"
                                    value={catID}
                                    onChange={handleChange}
                                >
                                    <option value={""} disabled>Select Question</option>
                                    {catData.map((item, i) =>
                                        <option key={i} value={item?._id}>{item?.surveyQuestion}</option>
                                    )
                                    }
                                </select>
                            </div>
                            {catID && <div className="col-6  mt-2 mx-3" >
                                <table className="table border border-black "
                                >
                                    <thead>
                                        <tr>

                                            <th>Answers Options</th>
                                            <th>Answers</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {AnsData?.A && <tr className="table-primary">

                                            <td>A</td>
                                            <td>{AnsData?.A}</td>

                                        </tr>}
                                        {AnsData?.B && <tr className="table-secondary">

                                            <td>B</td>
                                            <td>{AnsData?.B}</td>

                                        </tr>}
                                        {AnsData?.C && <tr className="table-success">

                                            <td>C</td>
                                            <td>{AnsData?.C}</td>

                                        </tr>}
                                        { AnsData?.D && <tr className="table-info">

                                            <td>D</td>
                                            <td>{AnsData?.D}</td>

                                        </tr>
                                        }

                                    </tbody>
                                </table>
                            </div>
                            }
                            {catID && <div className="col-5">
                                <section className='piechartsBo45x_area'>
                                    <PieChartsBox AnsPercentage={AnsPercentage} AnsOption={AnsOption} />
                                </section>
                            </div>}
                        </div>


                        <br />

                    </form>


                </section>

            </div>

        </div>
    )
}

export default Analys