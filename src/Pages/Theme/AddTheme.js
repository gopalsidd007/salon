import React, { useState } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import HttpClient from '../../utils/HttpClient';
import toast from 'react-hot-toast';

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"

}

const AddTheme = () => {
    let monthName =
        ["January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"]

    const [isLoading, setIsLoading] = useState(false);
    const [formValue, setformValue] = useState({ themeName: '', year: '' });
    const [singleMonth, setSingleMonth] = useState(null);
    const [themeColor, setThemeColor] = useState("");
    const animatedComponents = makeAnimated();
    console.log(formValue, "form")
    console.log(singleMonth, 'color')

    //state update of themename and color
    const handleChange = (e) => {
        const { name, value } = e.target
        setformValue(prev => ({ ...prev, [name]: value }));
    }
    //set month name state
    const handleSelectMonth = selectedOption => {
        // Update the selected IDs array
        setSingleMonth(selectedOption ? selectedOption.value : null);
    }
    //validation of inputs
    const validate = () => {
        if (!formValue?.themeName) {
            toast.error("Theme Name is required");
            return true
        }
        if (!formValue?.year) {
            toast.error("year required");
            return true
        }
        if (!singleMonth) {
            toast.error("Month required");
            return true
        }
        if (!themeColor) {
            toast.error("Theme Color required");
            return true
        }
        return false
    }
    // Submit
    const handleSubmit = async (e) => {
        // console.log("valuesdd");
        e.preventDefault();

        if (validate()) {
            return
        }

        const data = {
            "themeName": formValue?.themeName,
            "monthName": singleMonth,
            "year": formValue?.year,
            "themeColor": themeColor
        }
        setIsLoading(true);
        const res = await HttpClient.requestData("add-calendar-theme", "POST", data);
        // console.log("resCat", res)
        if (res && res?.status) {
            toast.success("Added Successfully");
            setformValue({ themeName: '', year: '' })
            setSingleMonth(null)
            setThemeColor('')
            setIsLoading(false);

        } else {
            toast.error("Month name already exists");
            setIsLoading(false);

        }
    };

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
                            Add theme for every month
                        </div>
                        <form>
                            <div className="row">



                                <div className="col-12 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Theme Name<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Theme Name"
                                        name="themeName"
                                        value={formValue.themeName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6 mt-3" >
                                    <label htmlFor="formGroupExampleInput">Select Month<span className="text-danger">&nbsp;*</span></label>

                                    <Select
                                        closeMenuOnSelect={false}
                                        components={animatedComponents}

                                        options={monthName.map(month => ({ value: month, label: month }))}
                                        onChange={handleSelectMonth}
                                        value={monthName.find(option => option?.value === singleMonth)}
                                    />
                                </div>
                                <div className="col-md-6 mt-3 ">
                                    <label htmlFor="formGroupExampleInput">Year<span className="text-danger">&nbsp;*</span></label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter a year (e.g., 2024)"
                                        name="year"
                                        value={formValue.year}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-4 mt-3" >
                                    <label htmlFor="formGroupExampleInput">Select your theme Color<span className="text-danger">&nbsp;*</span></label>
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
                                        Apply Theme Color
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

export default AddTheme