import React, { useEffect, useState } from 'react'
import { headLineStyle } from '../../Layout/Header'
import CustomLoader from '../../CustomComponents/loader/CustomLoader'
import DataTable from 'react-data-table-component';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import HttpClient from '../../utils/HttpClient';
import toast from 'react-hot-toast';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
import { ImCross } from 'react-icons/im';
const customStyles = {
    rows: {
        style: {
            minHeight: '48px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            backgroundColor: '#cee0eb', // set the background color for head cells
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
        },
    },
};


const ViewCardDetails = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [AllData, setAllData] = useState([]);
    const [themeColor, setThemeColor] = useState("");
    const [themeName, setThemeName] = useState("");
    const [themeImage, setThemeImage] = useState("");
    const [editedData, seteditedData] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [imageFile, setimageFile] = useState("");
    console.log(editedData?._id, "theme")
    console.log(themeImage, "themeImage")



    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,

        },

        {
            name: 'Card Name',
            selector: row => row.cardname,

        },
        {
            name: 'Theme Color',
            selector: row => row.color,

        },
        {
            name: 'Color Code',
            selector: row => row.colorCode,

        },
        {
            name: 'cardImage',
            selector: row => row.cardImage,
        },
        {
            name: 'Action',
            selector: row => row.action,
        }
    ];


    const getThemeData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-reward-card", "GET", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({

                sl: i + 1,

                cardname: item?.cardName,
                color: <div className=" mt-2 mb-2 rounded mx-2" style={{ width: "25px", height: "25px", background: item?.cardColor, display: "flex", fontWeight: "bolder" }}>
                </div>,
                colorCode: <span className=" m-auto fw-bold ">{item?.cardColor}</span>,
                cardImage: <div className='mb-1 mt-1'><img src={item?.cardImage} style={{
                    height: '82px',
                    width: '82px',
                    objectFit: 'fill'
                }} /></div>,
                action: <EditDeleteIcon
                    onClickEdit={(e) => handleEdit(item)}
                    onClickDelete={(e) => handleDelete(item?._id)}
                />
            }));
        } else {
            setIsLoading(false);
        }

        setAllData(apiData);
    }
    // edit part
    const handleEdit = async (item) => {
        console.log(item, "themeEdit");
        seteditedData(item)
        window.scrollTo(0, 0);
        setIsEdit(true);
        setThemeColor(item?.cardColor);
        setThemeName(item?.cardName);
        setThemeImage(item?.cardImage)
        setimageFile(item?.cardImage)

    }
    //cancel edit
    //cancel edit
    const handleisCancelSubmit = (e) => {
        setIsEdit(false);
        setThemeColor('');
        setThemeName('')
        setThemeImage('')
        setimageFile('')
    }
    //submit edit part
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const data = {
            "cardName": themeName,
            "cardColor": themeColor,
            "cardImage": themeImage
        }

        const res = await HttpClient.requestData("update-reward-card/" + editedData._id, "PUT", data);
        if (res && res?.status) {
            toast.success("Edited Successfully");
            setThemeColor('');
            setThemeName('')
            setThemeImage('')
            setimageFile('')
            setIsEdit(false)
            setIsLoading(false);
            getThemeData();

        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);

        }
    }
    //Delete part 
    const handleDelete = (id) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("delete-reward-card/" + id, "PUT")
            if (res && res?.status) {
                setIsLoading(false);
                getThemeData();

                toast.success("id Deleted Successfully");
            } else {
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }
    //handle image
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
            setThemeImage(res?.image)
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }


    }
    useEffect(() => {
        getThemeData();
    }, [])
    return (
        <div className="d-flex justify-content-end">
            <div className="form-header">

                <CustomLoader loading={isLoading} />
                <section className="piechartsBox_area">
                    <div
                        style={headLineStyle}
                        className="page-headline"
                    >
                        Reward Card Data
                    </div>
                    {isEdit ? <><form>
                        <div className="row">



                            <div className="col-12">
                                <label htmlFor="formGroupExampleInput">Theme Name<span className="text-danger">&nbsp;*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Theme Name"
                                    name="themeName"
                                    value={themeName}
                                    onChange={(e) => setThemeName(e.target.value)}
                                />
                            </div>



                            <div className="col-4 mt-3" >
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
                            <div className="col-8 mt-3" >
                                <div className="row">
                                    <div className=''>
                                        <label htmlFor="formGroupExampleInput col-12"
                                            style={{ marginRight: "50px" }}>Select your theme Image<span className="text-danger">&nbsp;*</span></label>

                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            className='mx-1'

                                            // value={themeImage}
                                            onChange={handleImage}

                                        />
                                    </div>
                                    {imageFile && (
                                        <div style={{ paddingLeft: "238px" }}>
                                            <img
                                                alt="not found"
                                                width={"250px"}
                                                src={imageFile}
                                            />
                                            <br />
                                            <button onClick={() => { setimageFile(null); setThemeImage(''); }}
                                                className='btn btn-danger btn-grad-cancel mt-1'
                                                style={{ marginLeft: "167px" }}>Remove</button>
                                        </div>
                                    )}

                                </div>

                                {/* <label htmlFor="formGroupExampleInput" className=" mt-2 p-2">Selected color code : <span style={{ color: themeColor, fontWeight: "bold" }}>{themeColor}</span></label> */}
                            </div>




                        </div>
                        {/* Button */}
                        <div class="col-12 d-flex justify-content-end">
                            {

                                <div className=' d-flex '>
                                    <button
                                        type="submit"
                                        onClick={(e) => handleEditSubmit(e)}
                                        class="btn btn-primaryb mt-1 mb-2 btn-grad"
                                    //style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                    >
                                        Update Theme Color
                                    </button>
                                    <ImCross onClick={(e) => handleisCancelSubmit(e)} style={{ fontSize: "25px", cursor: "pointer" }} className=" mx-3 mt-2 text-danger " />
                                </div>

                            }
                        </div>
                    </form></> : ''}

                    <form>

                        <div>

                            <DataTable
                                columns={columns}
                                data={AllData}
                                pagination
                                striped
                                className=" rounded "
                                customStyles={customStyles}
                            />
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default ViewCardDetails