// DetailsModal.js
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for accessibility



const DetailsModal = ({ isOpen, closeModal, details }) => {

    const [tableData, setTableData] = useState([]);
    console.log("details", tableData);


    // fetch Category DAta
    const getCategoryData = async () => {
        // setIsLoading(true);


        setTableData(details);
    }
    useEffect(() => {
        getCategoryData();
    }, [details]);
    return (

        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Details Modal"
            className=""
        >
            <a href='#' className='mtclose' onClick={closeModal}><i class="fa-solid fa-xmark"></i></a>

            {
                tableData?.map((item, i) => {
                    return (<>
                        <div className=' container'>
                            <div className=' row '>
                                <div className='col-12 d-flex justify-content-center '>
                                    <h2 className='  border-bottom border-danger mb-3'>Job Details</h2>

                                </div>
                                <hr />
                                <div className='col-12 d-flex mt-3'>
                                    <h4 className='item-description col-4'>Job title :</h4>
                                    &nbsp;&nbsp;&nbsp;
                                    <p className='mt-1'>{item?.jobTitle}</p>
                                </div>
                                <div className='col-12 d-flex mt-3'>
                                    <h4 className='item-description col-4'>Job description :</h4>
                                    &nbsp;&nbsp;&nbsp;
                                    <p className='mt-1'>{item?.description}</p>
                                </div>
                                <div className='col-12 d-flex mt-3'>
                                    <h4 className='item-description col-4'>Designation :</h4>
                                    &nbsp;&nbsp;&nbsp;
                                    <p className='mt-1'>{item?.designation}</p>
                                </div>
                                <div className='col-12 d-flex mt-3'>
                                    <h4 className='item-description col-4' >Employment type :</h4>
                                    &nbsp;&nbsp;&nbsp;
                                    <p className='mt-1'>{item?.employmentType}</p>
                                </div>
                                <div className='col-12 d-flex mt-3'>
                                    <h4 className='item-description col-4'>Work Mode :</h4>
                                    &nbsp;&nbsp;&nbsp;
                                    {item?.workMode?.map((item, i) => {
                                        return (<div>
                                            <p className='mt-1'>{item},&nbsp;&nbsp;</p>

                                        </div>)
                                    })}
                                </div>
                                <div className='col-12 d-flex mt-3'>
                                    <h4 className='item-description col-4'>Skills required :</h4>
                                    &nbsp;&nbsp;&nbsp;
                                    <p className='mt-1'>{item?.keySkills}</p>
                                </div>
                                <div className='col-12 d-flex mt-3'>
                                    <h4 className='item-description col-4'>Responsibilities :</h4>
                                    &nbsp;&nbsp;&nbsp;
                                    <p className='mt-1'>{item?.role}</p>
                                </div>
                                <div className='col-12 d-flex mt-3'>
                                    <h4 className='item-description col-4'>Qualifications :</h4>
                                    &nbsp;&nbsp;&nbsp;
                                    <p className='mt-1'>{item?.qualification}</p>
                                </div>
                                <div className='col-12 d-flex mt-3'>
                                    <h4 className='item-description col-4'>Job location :</h4>
                                    &nbsp;&nbsp;&nbsp;
                                    <p className='mt-1'>{item?.jobLocation[0] ? item?.jobLocation[0] : "N/A"}</p>
                                </div>
                                <div className='col-12 d-flex mt-3 '>
                                    <h4 className='item-description col-4'>Experience :</h4>
                                    &nbsp;&nbsp;&nbsp;
                                    <p className='mt-1'>{item?.experience}</p>
                                </div>
                                <div className='col-12 d-flex mt-3'>
                                    <h4 className='item-description col-4'>Salary :</h4>
                                    &nbsp;&nbsp;&nbsp;
                                    <p className='mt-1'>{item?.salary}</p>
                                </div>
                                <div className='col-12 d-flex mt-3'>
                                    <h4 className='item-description col-4'>Number of openings :</h4>
                                    &nbsp;&nbsp;&nbsp;
                                    <p className='mt-1'>{item?.openings}</p>
                                </div>
                            </div>
                        </div>
                    </>)
                })
            }


        </Modal >

    );
};

export default DetailsModal;
