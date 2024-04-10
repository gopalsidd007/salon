import React, { useEffect, useState } from 'react'
import './Job.css'
import HttpClient from '../../utils/HttpClient';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router';
import CustomLoader from '../../CustomComponents/loader/CustomLoader';


const Managerjobfirst = ({ }) => {

    const initialState = {
        jobTitle: "",
        Department: "",
        hiringManager: "",
        jobLocation: "",
        level: "",
        isNewPosition: "",
        isTempPosition: "",
        hiringReason: "",
        positionDescription: "",
        positionSummery: "",
        interviewerEmail: "",
        altEmail: "",
        openings: "",
        keySkills: "",
        keyResponsibilities: "",
        qualification: "",
        addQualification: "",
        experience_low: "0",
        experience_high: "",
        Competencies: "",
        inclusion: "",
        salary: "",
        salaryDate: "",
        interviewProcess: "",
        criteria: "",
        profileLink: "",
        period: ""

    }
    const [isLoading, setIsLoading] = useState(false);
    const [AddJob, setAddJob] = useState(initialState);
    const [managerData, setManagerData] = useState([]);
    const [department, setDepartment] = useState([]);
    const [hiringManagerId, setHiringManagerID] = useState([]);
    // const [activePeriod, setActivePeriod] = useState(""); // To store the active period
    const location = useLocation()
    console.log(AddJob, "AddJob")

    useEffect(() => {
        getManagerData()
        getDepartmentData()
    }, []);
    useEffect(() => {
        getjobDetails()
    }, [location.state.data.jobRequirmentId]);

    //get job details id wise
    const getjobDetails = async () => {
        try {
            const res = await HttpClient.requestData("get-job-requirment-byid/" + location.state.data.jobRequirmentId, "POST", {})
            console.log(res?.data, "jobdetailsbyid")
            setHiringManagerID(res?.data?.hiringManager)
            setAddJob({
                ...initialState,
                jobTitle: res?.data?.jobTitle,
                jobLocation: res?.data?.jobLocation,
                level: res?.data?.level,
                isNewPosition: res?.data?.isNewPosition,
                isTempPosition: res?.data?.isTempPosition,
                hiringReason: res?.data?.hiringReason,
                positionDescription: res?.data?.positionDescription,
                interviewerEmail: res?.data?.interviewerEmail,
                altEmail: res?.data?.altEmail,
                openings: parseInt(res?.data?.openings),
                keySkills: res?.data?.keySkills.map((item) => item),
                keyResponsibilities: res?.data?.responsibilities,
                qualification: res?.data?.qualification,
                addQualification: res?.data?.addQualification,
                experience_high: res?.data?.experience_high,
                experience_low: res?.data?.experience_low,
                Competencies: res?.data?.Competencies,
                inclusion: res?.data?.inclusion,
                salary: res?.data?.salary,
                salaryDate: res?.data?.salaryDate,
                interviewProcess: res?.data?.interviewProcess,
                criteria: res?.data?.criteria,
                profileLink: res?.data?.profileLink,
                hiringManager: res?.data?.hiringManager,
                Department: res?.data?.Department,
                period: res?.data?.period

            })

        } catch (error) {
            toast.error("something wrong")
        }
    }

    //Engagemanet period
    const handlePeriodChange = (periodValue) => {
        setAddJob(prev => ({ ...prev, period: periodValue }));

    };
    //get manager data 
    const getManagerData = async () => {
        try {
            const res = await HttpClient.requestData("view-all-manager", "GET", {})

            const hiringNewmanagerID = res?.data.filter((item) => item?._id === hiringManagerId)
            console.log(hiringNewmanagerID, "view-all-manager")
            if (res && res?.status) {
                setManagerData(res?.data)
            }
        } catch (error) {
            toast.error("something wrong")
        }
    }
    //get manager data 
    const getDepartmentData = async () => {
        try {
            const res = await HttpClient.requestData("view-department", "GET", {})
            console.log(res, "department")
            if (res && res?.status) {
                setDepartment(res?.data)
            }
        } catch (error) {
            toast.error("something wrong")
        }
    }
    // other inputs change
    const handleChange = (e) => {
        const { name, value } = e.target
        setAddJob(prev => ({ ...prev, [name]: value }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const data = {
            "jobTitle": AddJob.jobTitle,
            "Department": AddJob.Department,
            "jobLocation": AddJob.jobLocation,
            "hiringManager": AddJob.hiringManager,
            "level": AddJob.level,
            "isNewPosition": AddJob.isNewPosition,
            "isTempPosition": AddJob.isTempPosition,
            "candidateSourcing": AddJob.candidateSourcing,
            "hiringReason": AddJob.hiringReason,
            "priority": AddJob.priority,
            "description": AddJob.priority,
            "interviewerEmail": "",
            "openings": AddJob.openings,
            "keyResponsibilities": AddJob.keyResponsibilities,
            "qualification": AddJob.qualification,
            "addQualification": AddJob.addQualification,
            "experience_low": AddJob.experience_low,
            "experience_high": AddJob.experience_high,
            "Competencies": AddJob.Competencies,
            "inclusion": AddJob.inclusion,
            "interviewProcess": AddJob.interviewProcess,
            "criteria": AddJob.criteria,
            "profileLink": AddJob.profileLink,
            "salary": parseInt(AddJob.salary),
            "salaryDate": AddJob.salaryDate
        }


        const isValid = Object.values(AddJob).every(value => {
            // Check if the value is a string and if it's not empty after trimming
            if (typeof value === 'string') {
                return value.trim() !== '';
            }
            // For other types of values, just return true
            return true;
        });

        if (!isValid) {
            toast.error("All inputs should be filled")
            return false
        }
        if (AddJob.openings < 1) {
            toast.error('Number of openings must be greater than 0');
            return false;
        }

        else {
            const res = await HttpClient.requestData("add-job", "POST", data)
            if (res && res.status) {
                toast.success("Job posted")
            }
            else {
                toast.error("Something wrong")
            }
        }

    }

    // Approve job
    const Approve = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const data = {
            "isCAdminApproved": "true"
        }

        const res = await HttpClient.requestData("giveapproval-by-ca/" + location.state.data.jobRequirmentId, "POST", data)
        if (res && res.status) {
            
            setIsLoading(false)
            setAddJob(initialState)
            toast.success("Job approved")
        }
        else {
            setIsLoading(false)
            setAddJob(initialState)
            toast.error(res?.message)
        }
    }
    // Reject job
    const Reject = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const data = {
            "isCAdminApproved": "false"
        }

        const res = await HttpClient.requestData("giveapproval-by-ca/" + location.state.data.jobRequirmentId, "POST", data)
        if (res && res.status) {
            
            setIsLoading(false)
            setAddJob(initialState)
            toast.success("Job Rejected")
        }
        else {
            setIsLoading(false)
            toast.error(res?.message)
        }
    }
    // Defer job
    const Defer = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const data = {
            "isCAdminApproved": "defer"
        }

        const res = await HttpClient.requestData("giveapproval-by-ca/" + location.state.data.jobRequirmentId, "POST", data)
        if (res && res.status) {
            
            setIsLoading(false)
            setAddJob(initialState)
            toast.success("Job Defered")
        }
        else {
            setIsLoading(false)
            
            toast.error(res?.message)
        }
    }


    return (
        <>
            <div className='restpage'>
                <CustomLoader loading={isLoading} />
                <div className='container-fluid'>
                    <div className=''>
                        <p className='admtxt'>Admin Approval</p>
                    </div>
                    <div className='jobmaindtxlflx'>
                        <div className='jobbrdrwhdt'>
                            <div className='jobdtksvbrdr'>
                                <div className=''>
                                    <form>
                                        <div className='fulljobdiv'>
                                            <div className='jobdtlsdiv'>
                                                <p className='jibtxt'>Job Title <span class="required">*</span></p>
                                                <input type='text'
                                                    className='jobtxtinpt'
                                                    name="jobTitle"
                                                    value={AddJob.jobTitle}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className='jobdtlsdiv'>
                                                <p className='jibtxt'>Department/Team <span class="required">*</span></p>
                                                <select
                                                    class="hiringslct"
                                                    aria-label="Select Department name"
                                                    name="Department"
                                                    value={AddJob.Department}
                                                    onChange={handleChange}
                                                >
                                                    <option value={""} >
                                                        Department name
                                                    </option>
                                                    {department?.map((item, i) => (
                                                        <option key={i} value={item?._id}>
                                                            {item?.departmentName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='jobdtlsdiv'>
                                                <p className='jibtxt'>Hiring Manager<span class="required">*</span></p>

                                                <select
                                                    class="hiringslct"
                                                    aria-label="Select Hiring Manager name"
                                                    name="hiringManager"
                                                    value={AddJob.hiringManager}
                                                    onChange={handleChange}
                                                >
                                                    <option value={""} >
                                                        Select Manager
                                                    </option>
                                                    {managerData?.map((item, i) => (
                                                        <option key={i} value={item?._id}>
                                                            {item?.firstName} {item?.lastName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='jobdtlsdiv'>
                                                <p className='jibtxt'>Location<span class="required">*</span></p>
                                                <input
                                                    type='text'
                                                    className='jobtxtinpt'
                                                    name="jobLocation"
                                                    placeholder='"Enter city names, separated by commas,  
                                                    e.g., New York, Los Angeles"'
                                                    value={AddJob.jobLocation}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className='jobdtlsdiv'>
                                                <p className='jibtxt'>Level<span class="required">*</span></p>
                                                <input
                                                    type='text'
                                                    className='jobtxtinpt'
                                                    name="level"
                                                    value={AddJob.level}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className='ysnopst'>
                                                <p className='jibtxt'>Is this a new Position<span class="required">*</span></p>
                                                <div className='yxsbnflx'>
                                                    <div className='mrtrdtys'>
                                                        <input
                                                            type="radio"
                                                            id="true"
                                                            name="isNewPosition"
                                                            value="true"
                                                            checked={AddJob?.isNewPosition === true}
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor="true">Yes</label>
                                                    </div>
                                                    <div className='mrtrdtys'>
                                                        <input
                                                            type="radio"
                                                            id="false"
                                                            name="isNewPosition"
                                                            value="false"
                                                            checked={AddJob?.isNewPosition === false}
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor="false">No</label>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='ysnopst'>
                                                <p className='jibtxt'>Is this a Temporary Position<span class="required">*</span></p>
                                                <div className='yxsbnflx'>
                                                    <div className='mrtrdtys'>
                                                        {/* <input type="radio" id="Yes" name="" defaultValue="yes" /> */}
                                                        <input

                                                            type="radio"
                                                            id="true"
                                                            name="isTempPosition"
                                                            value="true"
                                                            checked={AddJob?.isTempPosition === true}
                                                            onChange={handleChange}
                                                        // onChange={() => setFieldValue('isTempPosition', true)}
                                                        />
                                                        <label htmlFor="html">Yes</label>
                                                    </div>
                                                    <div className='mrtrdtys'>
                                                        {/* <input type="radio" id="No" name="" defaultValue="No" /> */}
                                                        <input
                                                            // defaultValue="no"
                                                            type="radio"
                                                            id="false"
                                                            name="isTempPosition"
                                                            value="false"
                                                            checked={AddJob?.isTempPosition === false}
                                                            onChange={handleChange}
                                                        // onChange={() => setFieldValue('isTempPosition', false)}
                                                        />
                                                        <label htmlFor="html">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='ysnopst'>
                                                {/* <p className='jibtxt'>Level Of Priority<span class="required">*</span></p> */}
                                                {/* <div className='hgmdlwflx'>

                                            <button
                                                className='gnjhbtn'
                                                type='button'
                                                onClick={() => handlePriorityClick("high")}
                                                onClick={() => setFieldValue(prev => ({ ...prev, priority: "High" }))}
                                            >
                                                High
                                            </button>
                                            <button
                                                className='gnjhbtn'
                                                type='button'
                                                onClick={() => handlePriorityClick("mid")}
                                                onClick={() => setFieldValue(prev => ({ ...prev, priority: "Mid" }))}
                                            >
                                                Medium
                                            </button>
                                            <button
                                                className='gnjhbtn'
                                                type='button'
                                                onClick={() => handlePriorityClick("low")}
                                                onClick={() => setFieldValue(prev => ({ ...prev, priority: "Low" }))}
                                            >
                                                Low
                                            </button>

                                            <button
                                                className='gnjhbtn'
                                                type='button'
                                                onClick={() => setFieldValue('priority', 'High')}
                                            >
                                                High
                                            </button>
                                            <button
                                                className='gnjhbtn'
                                                type='button'
                                                onClick={() => setFieldValue('priority', 'Mid')}
                                            >
                                                Medium
                                            </button>
                                            <button
                                                className='gnjhbtn'
                                                type='button'
                                                onClick={() => setFieldValue('priority', 'Low')}
                                            >
                                                Low
                                            </button>
                                        </div> */}
                                            </div>
                                            {/* <div className='ysnopst'>
                                        <p className='jibtxt'>Candidate Sourcing Preference<span class="required">*</span></p>
                                        <div className='hgmdlwflx'>
                                            <button
                                                type='button'
                                                className='gnjhbtn'
                                                onClick={() => setFieldValue(prev => ({ ...prev, candidateSourcing: "External" }))}
                                            >
                                                External
                                            </button>
                                            <button
                                                type='button'
                                                className='gnjhbtn'
                                                onClick={() => setFieldValue(prev => ({ ...prev, candidateSourcing: "Internal" }))}
                                            >
                                                Internal
                                            </button>
                                            <button type='button'
                                                className='gnjhbtn'
                                                onClick={() => setFieldValue(prev => ({ ...prev, candidateSourcing: "Both" }))}
                                            >
                                                Both
                                            </button>

                                            <button
                                                className='gnjhbtn'
                                                type='button'
                                                onClick={() => setFieldValue('candidateSourcing', 'External')}
                                            >
                                                External
                                            </button>
                                            <button
                                                className='gnjhbtn'
                                                type='button'
                                                onClick={() => setFieldValue('candidateSourcing', 'Internal')}
                                            >
                                                Internal
                                            </button>
                                            <button
                                                className='gnjhbtn'
                                                type='button'
                                                onClick={() => setFieldValue('candidateSourcing', 'Both')}
                                            >
                                                Both
                                            </button>positionSummery
                                        </div>
                                    </div> */}
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>

                        <div className='jobdtlswh'>
                            <div className='dtlskmflx'>
                                <h4 className='dtlstxtpphh'>Details</h4>
                                <p className='jibtxt'><span class="required">*</span>Mandatory</p>
                            </div>
                            <div className=''>
                                <form>
                                    <div className='alldtlsfrmdiv'>
                                        <div className='senddivrxr'>
                                            <div className='rsntxrpdiv'>
                                                <p className='rsntxrp'>Reason for Hire<span class="required">*</span></p>
                                            </div>
                                            <div className='rsntxrptxtdiv'>
                                                <input
                                                    type="text"
                                                    className='rsjobtxtdiv'
                                                    name="hiringReason"
                                                    value={AddJob.hiringReason}
                                                    onChange={handleChange}

                                                />
                                            </div>
                                        </div>
                                        <div className='senddivrxr'>
                                            <div className='rsntxrpdiv'>
                                                <p className='rsntxrp'>Position Description<span class="required">*</span></p>
                                            </div>
                                            <div className='rsntxrptxtdiv'>
                                                <input
                                                    type="text"
                                                    className='rsjobtxtdiv'
                                                    name="positionDescription"
                                                    value={AddJob.positionDescription}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className='senddivrxr'>
                                            <div className='rsntxrpdiv'>
                                                <p className='rsntxrp'>Interviewer Email Id<span class="required">*</span></p>
                                            </div>
                                            <div className='rsntxrptxtdiv'>
                                                <input
                                                    type="text"
                                                    className='hrdivtxt'
                                                    name="interviewerEmail"
                                                    value={AddJob.interviewerEmail}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className='senddivrxr'>
                                            <div className='rsntxrpdiv'>
                                                <p className='rsntxrp'>Alternative Email Id<span class="required">*</span></p>
                                            </div>
                                            <div className='rsntxrptxtdiv'>
                                                <input
                                                    type="text"
                                                    className='hrdivtxt'
                                                    name="altEmail"
                                                    value={AddJob.altEmail}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        {/* Need */}

                                        <div className="senddivrxr">
                                            <div className="rsntxrpdiv">
                                                <p className="rsntxrp">
                                                    Nature of Engagement<span className="required">*</span>
                                                </p>
                                            </div>
                                            <div>
                                                <button type="button" className={`mx-2 plnbtnact btn ${AddJob?.period === "FullTime" ? " bg-warning" : ""} `} onClick={() => handlePeriodChange("FullTime")}>Full Time</button>
                                                <button type="button" className={`mx-2 plnbtnact btn ${AddJob?.period === "PartTime" ? "bg-warning" : ""}`} onClick={() => handlePeriodChange("PartTime")}>Part Time</button>
                                                <button type="button" className={`mx-2 plnbtnact btn ${AddJob?.period === "Internship" ? "bg-warning" : ""}`} onClick={() => handlePeriodChange("Internship")}>Internship</button>
                                                <button type="button" className={`mx-2 plnbtnact btn ${AddJob?.period === "Contractual" ? "bg-warning" : ""}`} onClick={() => handlePeriodChange("Contractual")}>Contractual</button>
                                            </div>
                                        </div>


                                        {/* <div className='senddivrxr'>
                                            <div className='rsntxrpdiv'>
                                                <p className='rsntxrp'>Interviewer Email Id<span class="required">*</span></p>
                                            </div>
                                            <div className='addimginpt'>
                                                <div className='addimg'
                                                 onClick={handleAddInterviewerEmail}
                                                > Trigger addition of email
                                                    <img src={a} alt="..." />
                                                </div>
                                                Display added interviewer emails
                                                {values?.interviewerEmail?.map((email, index) => (
                                            <div key={index} className="added-email">
                                                <input
                                                    type='text'
                                                    className='interdiv'
                                                    value={email}
                                                    onChange={(e) => {
                                                        const updatedInterviewerEmails = [...values.interviewerEmail];
                                                        updatedInterviewerEmails[index] = e.target.value;
                                                        setFieldValue('interviewerEmail', updatedInterviewerEmails);
                                                    }}
                                                />
                                                Display remove button only for additional email fields
                                                {index > 0 && <button type="button" onClick={() => handleRemoveInterviewerEmail(index)}>Remove</button>}
                                            </div>
                                        ))}
                                            </div>
                                        </div> */}

                                        <div className='senddivrxr'>
                                            <div className='rsntxrpdiv'>
                                                <p className='rsntxrp'>No. of Hire<span class="required">*</span></p>
                                            </div>
                                            <div className='hrdivtxtmain'>
                                                <input
                                                    type="number"
                                                    className='hrdivtxt'
                                                    name="openings"
                                                    value={AddJob.openings}
                                                    onChange={handleChange}

                                                />
                                            </div>
                                        </div>
                                        <div className='senddivrxr'>
                                            <div className='rsntxrpdiv'>
                                                <p className='rsntxrp'>Sklils<span class="required">*</span></p>
                                            </div>
                                            <div className='rsntxrptxtdiv'>
                                                <input
                                                    type="text"
                                                    className='rsjobtxtdiv'
                                                    name="keySkills"
                                                    value={AddJob.keySkills}
                                                    onChange={handleChange}

                                                />
                                            </div>
                                        </div>
                                        <div className='senddivrxr'>
                                            <div className='rsntxrpdiv'>
                                                <p className='rsntxrp'>Responsibilities<span class="required">*</span></p>
                                            </div>
                                            <div className='rsntxrptxtdiv'>
                                                <input
                                                    type="text"
                                                    className='rsjobtxtdiv'
                                                    name="keyResponsibilities"
                                                    value={AddJob.keyResponsibilities}
                                                    onChange={handleChange}

                                                />
                                            </div>
                                        </div>
                                        <div className='qualiaddi'>
                                            <div className='minimdiv'>
                                                <div className="addqtmntxt">
                                                    <p className="rsntxrp">Minimum Qualification<span className="required">*</span></p>
                                                </div>
                                                <div className="qulitxtar">
                                                    <input
                                                        type="text"
                                                        className="qulitxtardiv"
                                                        name="qualification"
                                                        value={AddJob.qualification}
                                                        onChange={handleChange}

                                                    />
                                                </div>
                                            </div>
                                            <div className='addnidiv'>
                                                <div className="addqtmntxt">
                                                    <p className="rsntxrp">Additional Qualification(If Any)<span className="required">*</span></p>
                                                </div>
                                                <div className="qulitxtar">
                                                    <input
                                                        type="text"
                                                        className="qulitxtardiv"
                                                        name="addQualification"
                                                        value={AddJob.addQualification}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='senddivrxr'>
                                            <div className='rsntxrpdiv'>
                                                <p className='rsntxrp'>Experience(No. of Years)<span class="required">*</span></p>
                                            </div>
                                            <div className='frmtodivflx'>
                                                <div className='frmstrt'>
                                                    <>

                                                        <select
                                                            name="experience_low"
                                                            value={AddJob.experience_low} engageMentType
                                                            onChange={handleChange}
                                                            className='experience-select'
                                                        >
                                                            <option value="0">0</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>
                                                    </>

                                                </div>
                                                <div className='frmend'>
                                                    <>
                                                        <label htmlFor="">To</label>

                                                        <select
                                                            name="experience_high"
                                                            value={AddJob.experience_high}
                                                            onChange={handleChange}
                                                            className='experience-select'
                                                        >
                                                            <option value="0">0</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>
                                                    </>

                                                </div>
                                            </div>
                                        </div>
                                        <div className='senddivrxr'>
                                            <div className='rsntxrpdiv'>
                                                <p className='rsntxrp'>Competencies and Traits<span class="required">*</span></p>
                                            </div>
                                            <div className='rsntxrptxtdiv'>
                                                <input
                                                    type="text"
                                                    className='rsjobtxtdiv'
                                                    name="Competencies"
                                                    value={AddJob.Competencies}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='senddivrxr'>
                                            <div className='rsntxrpdiv'>
                                                <p className='rsntxrp'>Inclusion Considerations<span class="required">*</span></p>
                                            </div>
                                            <div className='rsntxrptxtdiv'>
                                                <input
                                                    type="text"
                                                    className='rsjobtxtdiv'
                                                    name="inclusion"
                                                    value={AddJob.inclusion}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='positionwhnflx'>
                                            <div className='avgdixflx'>
                                                <div className='avgsldiv'>
                                                    <p className='rsntxrp'>Avg. Salary for the Position<span class="required">*</span></p>
                                                </div>
                                                <div className='avgdivmain'>
                                                    <input
                                                        type="number"
                                                        className='avgdiv'
                                                        name="salary"
                                                        value={AddJob.salary}
                                                        onChange={handleChange}
                                                        min="0"
                                                    />
                                                </div>
                                            </div>
                                            <div className='whendixflx'>
                                                <div className='addldiv'>
                                                    <p className='rsntxrp'>By When<span class="required">*</span></p>
                                                </div>
                                                <div className='caledricontxtflsx'>
                                                    <div className='clndrimg'>
                                                        {/* <img src={Calender} alt="..." /> */}
                                                    </div>
                                                    <div className='avgdivmain'>
                                                        <input
                                                            type="date"
                                                            className='avgdiv'
                                                            name="salaryDate"
                                                            value={AddJob.salaryDate}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='senddivrxr'>
                                            <div className='rsntxrpdiv'>
                                                <p className='rsntxrp'>Interview Process<span class="required">*</span></p>
                                            </div>
                                            <div className='rsntxrptxtdiv'>
                                                <input
                                                    type="text"
                                                    className='rsjobtxtdiv'
                                                    name="interviewProcess"
                                                    value={AddJob.interviewProcess}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='senddivrxr'>
                                            <div className='rsntxrpdiv'>
                                                <p className='rsntxrp'>Evaluation Criteria<span class="required">*</span></p>
                                            </div>
                                            <div className='rsntxrptxtdiv'>
                                                <input
                                                    type="text"
                                                    className='rsjobtxtdiv'
                                                    name="criteria"
                                                    value={AddJob.criteria}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='senddivrxr'>
                                            <div className='prvdlinkdiv'>
                                                <p className='rsntxrp mb-2'>Sample Profile From Job Board</p>
                                                <p className='rsntxrp'>Provided Link <span class="required">*</span></p>
                                            </div>
                                            <div className='rsntxrptxtdiv mt-5'>
                                                <input
                                                    type="text"
                                                    className='rsjobtxtdiv'
                                                    name="profileLink"
                                                    value={AddJob.profileLink}
                                                    onChange={handleChange}

                                                />
                                            </div>
                                        </div>


                                        <div className='senddivrxr'>
                                            <div className='prvdlinkdiv'>
                                                <p className='rsntxrp'>Advertising and Sourcing<span class="required">*</span></p>
                                            </div>
                                            <div className='rsntxrptxtdiv'>
                                                <input
                                                    type="text"
                                                    className='rsjobtxtdiv'
                                                    name="profileLink"
                                                    value={AddJob.profileLink}
                                                    onChange={handleChange}

                                                />
                                            </div>
                                        </div>

                                        <div className='senddivrxr'>
                                            <div className='prvdlinkdiv'>
                                                <p className='rsntxrp'>Additional Comments/Notes<span class="required">*</span></p>
                                            </div>
                                            <div className='rsntxrptxtdiv'>
                                                <input
                                                    type="text"
                                                    className='rsjobtxtdiv'
                                                    name="profileLink"
                                                    value={AddJob.profileLink}
                                                    onChange={handleChange}

                                                />
                                            </div>
                                        </div>
                                        <div className='senddivrxr'>
                                            <div className='prvdlinkdiv'>
                                                <p className='rsntxrp'>Approvals<span class="required">*</span></p>
                                            </div>
                                            <div className='rsntxrptxtdiv'>
                                                <input
                                                    type="text"
                                                    className='rsjobtxtdiv'
                                                    name="profileLink"
                                                    value={AddJob.profileLink}
                                                    onChange={handleChange}

                                                />
                                            </div>
                                        </div>

                                        {/* <div className='sbmtdivmain'>
                                            <button className='sbmtdiv'
                                                type="button"
                                                onClick={submitHandler}
                                            >

                                                <div className='hrtxty'>
                                                    Post job
                                                </div>
                                            </button>
                                        </div> */}
                                        <div className='sbmtdivmain w-50 d-flex '>
                                            <button className='sbmtdiv w-50 bg-success '
                                                type="button"
                                                onClick={Approve}
                                            >

                                                <div className='hrtxty'>
                                                    Approve
                                                </div>
                                            </button>
                                            <button className='sbmtdiv w-50 bg-danger mx-2'
                                                type="button"
                                                onClick={Reject}
                                            >

                                                <div className='hrtxty'>
                                                    Reject
                                                </div>
                                            </button>
                                            <button className='sbmtdiv w-50 bg-warning mx-2'
                                                type="button"
                                                onClick={Defer}
                                            >

                                                <div className='hrtxty'>
                                                    Defer
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div >
                        </div >
                    </div>
                </div>
            </div>
        </>
    )
}

export default Managerjobfirst