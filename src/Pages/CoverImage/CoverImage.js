import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import CustomLoader from '../../CustomComponents/loader/CustomLoader';
import toast from 'react-hot-toast';
import HttpClient from '../../utils/HttpClient';
const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "35px",
    fontWeight: "bold"

}

const CoverImage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [AllData, setAllData] = useState("");
    const [coverImg, setCoverImg] = useState(null);
    //const [imageFile, setimageFile] = useState(null);


    const getCategoryData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("get-profile", "GET", {});
        console.log("resGet", res?.data?.coverImage)
        let apiData = {}
        if (res && res?.status) {
            setIsLoading(false);
            apiData = {
                id: res?.data?._id,
                type: res?.data?.userType,
                name: res?.data?.firstName,
                // image: <img src={res?.data?.coverImage} style={{ height: "100px", width: "100px", margin: "5px" }}/>,
                image: res?.data?.coverImage,
                // action:
                //     <div
                //         style={{ fontSize: "1.5rem", color: "#545423", cursor: "pointer" }}
                //     >
                //         <FaEdit />
                //     </div>
                // action:<input type="file"/>
            }

        } else {
            setIsLoading(false);
        }
        setAllData(apiData.image !== null ? [apiData] : []);
    }
    // const handleEdit = (item) => {
    //     navigate("/edit-advocacy", { state: item })
    // }

    // delete
    // column
    const columns = [

        {
            name: ' Type',
            selector: row => row.type,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Image',
            cell: row => (row.image ? <img alt='no image' src={row.image} style={{ height: "100px", width: "100px", margin: "5px" }} /> : null),
        },
    ];

    const handleImage = async (e) => {
        // console.log("e",e.target.files);
        // setimageFile(URL.createObjectURL(e.target.files[0]))
        let formData = new FormData()

        formData.append("image", e.target.files[0])
        // setIsLoading(true);
        const res = await HttpClient.fileUplode("image-upload", "POST", formData);
        if (res && res?.status) {
            toast.success("Image Uploaded Successfully");
            // setAllData({ ...AllData, image: res.image })
            setCoverImg(res?.image);
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }

    }



    // const handleSubmit = async (e) => {
    //     // console.log("valuesdd");
    //     // console.log("formValue",formValue);
    //     e.preventDefault();



    //     const data = {
    //         coverImage: coverImg
    //     }
    //     setIsLoading(true);
    //     const res = await HttpClient.requestData("update-cover-image", "PUT", data);
    //     // console.log("resCat", res)
    //     if (res && res?.status) {
    //         toast.success("Advocacy Data Added Successfully");
    //         setCoverImg("");
    //         getCategoryData();
    //         setIsLoading(false);
    //     } else {
    //         toast.error(res?.message || "Something Wrong");
    //         setIsLoading(false);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {};
        if (coverImg !== null) {
            data.coverImage = coverImg;
        }

        setIsLoading(true);
        const res = await HttpClient.requestData("update-cover-image", "PUT", data);

        if (res && res?.status) {
            toast.success("Advocacy Data Added Successfully");
            setCoverImg(null); // Reset the local state
            getCategoryData();
            setIsLoading(false);
        } else {
            toast.error(res?.message || "Something Wrong");
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getCategoryData();
    }, [])

    return (
        <div>

            <div className="d-flex justify-content-end">


                <CustomLoader loading={isLoading} />

                {/* form */}
                <div className="form-header">
                    <section className="piechartsBox_area ">
                        <div
                            style={headLineStyle}
                            className="page-headline"
                        >
                            Manage Cover Image
                        </div>

                        <form class="row g-3 m-2">

                            <div className="mb-5">
                                <input type="file" onChange={handleImage} />

                                {coverImg && (<div>
                                    <img
                                        alt="not found"
                                        width={"250px"}
                                        src={coverImg}
                                    />
                                    <br />
                                    <button
                                        type="button"
                                        className="btn btn-primaryb mt-3"
                                        style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                        onClick={() => setCoverImg(null)}>Remove</button>
                                </div>)}
                                <div className="d-flex mt-3">
                                    <div>
                                        <button
                                            type="submit"
                                            onClick={(e) => handleSubmit(e)}
                                            className="btn btn-primaryb mt-3"
                                            style={{ background: "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))", color: "#fff" }}
                                        >
                                            Add Cover Image
                                        </button>
                                    </div>
                                    <div>
                                        <span><i class="fa-solid fa-circle-info mx-1" 
                                        style={{
                                            marginTop:"35px",
                                            color:"gray"
                                        }}></i>1280x720 pixels</span>
                                    </div>
                                </div>

                            </div>





                        </form>
                    </section>
                </div>

            </div>


            <div className="datatable-view ">

                <div
                    style={headLineStyle}
                    className="page-headline"
                >
                    View Cover Image
                </div>

                <DataTable
                    columns={columns}
                    data={AllData}
                    pagination
                    striped
                />
            </div>

        </div>
    )
}

export default CoverImage