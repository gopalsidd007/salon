import React from 'react'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';


const EditDeleteIcon = ({ onClickEdit, onClickDelete, onClickView }) => {
    return (
        <div className='d-flex justify-content-between'>
            {onClickView && <div

                style={{ fontSize: "1.6rem", color: "#af0606", cursor: "pointer", marginRight: '7px' }}
                onClick={onClickView}
            >
                <i className="fa-solid fa-eye "
                    style={{ cursor: "pointer", color: 'darkBlue', fontSize: '18px' }}></i>
            </div>}
            {onClickEdit && <div
                style={{ fontSize: "1.5rem", color: "#545423", cursor: "pointer" }}
                onClick={onClickEdit}
            >
                <FaEdit />
            </div>}

            {onClickDelete && <div
                style={{ fontSize: "1.6rem", color: "#af0606", cursor: "pointer" }}
                onClick={onClickDelete}
            >
                <MdDelete />
            </div>}


        </div>
    )
}

export default EditDeleteIcon
