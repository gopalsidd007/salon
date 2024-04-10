import React, { useEffect, useState } from 'react'
import { headLineStyle } from '../../Layout/Header'
import CustomLoader from '../../CustomComponents/loader/CustomLoader'
import DataTable from 'react-data-table-component';
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import HttpClient from '../../utils/HttpClient';
import toast from 'react-hot-toast';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
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


const ManageTheme = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [AllData, setAllData] = useState([]);
    const [themeColor, setThemeColor] = useState("");
    const [themeName, setThemeName] = useState("");
    const [editedData, seteditedData] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    console.log(themeName, themeColor, editedData?._id, "theme")



    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,

        },
        {
            name: 'Year',
            selector: row => row.year,

        },
        {
            name: 'Month',
            selector: row => row.month,

        },
        {
            name: 'Theme Name',
            selector: row => row.themename,

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
            name: 'Action',
            selector: row => row.action,
        }
    ];


    const getThemeData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-calendar-theme", "POST", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({

                sl: i + 1,
                year: item?.year,
                month: item?.monthName,
                themename: item?.themeName,
                color: <div className=" mt-2 mb-2 rounded mx-2" style={{ width: "25px", height: "25px", background: item?.themeColor, display: "flex", fontWeight: "bolder" }}>
                </div>,
                colorCode: <span className=" m-auto fw-bold ">{item?.themeColor}</span>,
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
        setThemeColor(item?.themeColor);
        setThemeName(item?.themeName)

    }
    //submit edit part
    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const data = {
            "themeName": themeName,
            "themeColor": themeColor
        }

        const res = await HttpClient.requestData("edit-calendar-theme/" + editedData._id, "PUT", data);
        if (res && res?.status) {
            toast.success("Edited Successfully");
            setThemeColor('');
            setThemeName('')
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
            const res = await HttpClient.requestData("delete-calendar-theme/" + id, "DELETE")
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
                        Theme Data
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
                        <div class="col-12 d-flex justify-content-end">
                            {

                                <button
                                    type="submit"
                                    onClick={(e) => handleEditSubmit(e)}
                                    class="btn btn-primaryb mt-1 mb-2 btn-grad"
                                    //style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                >
                                    Update Theme Color
                                </button>

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

export default ManageTheme