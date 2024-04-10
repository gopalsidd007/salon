


import React, { useEffect, useState } from 'react'
import CustomLoader from '../../CustomComponents/loader/CustomLoader'
import EditDeleteIcon from '../../CustomComponents/EditDeleteIcon';
import HttpClient from '../../utils/HttpClient';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import toast from 'react-hot-toast';
import { DeleteConfirmModal } from '../../CustomComponents/DeleteConfirmModal';
// import { FaExchangeAlt } from 'react-icons/fa';

const headLineStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#868e96",
    margin: "11px",
    fontWeight: "bold"

}

const ManagePosts = () => {
    const [AllData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    console.log(AllData, "AllData")


    // column
    const columns = [
        {
            name: 'SL',
            selector: row => row.sl,
            width: "3.4rem"
        },
        {
            name: 'User Type',
            selector: row => row.usertype,
            width: "5.4rem"
        },
        {
            name: 'Name',
            selector: row => row.name,
            width: "11.6rem"
        },
        {
            name: 'Post Type',
            selector: row => row.postType,
            width: "6.4rem"
        },
        {
            name: 'Post',
            selector: row => row.post,
            width: "16.6rem"
        },
        //Multiple Image logic
        // {
        //     name: 'Image',
        //     cell: row => (row.image && row?.image?.map((item, i) => {
        //         console.log(item, "image")
        //         return <img alt='no image' src={item} style={{ height: "75px", width: "75px", margin: "5px" }} />
        //     })),
        //     width: "7.7rem"

        // },
        {
            name: 'Image',
            cell: row => (row?.image && <img alt='no image' src={row?.image} style={{ height: "75px", width: "75px", margin: "5px" }} />),
            width: "7.7rem"

        },

        {
            name: 'Reaction',
            selector: row => row.totalReaction,
            width: "5.1rem"
        },
        {
            name: 'Date Created',
            selector: row => row.createdDate,
            width: "6.6rem"
        },

        {
            name: 'Action',
            selector: row => row.action,
        }
    ];





    const getCategoryWiseData = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-all-post", "POST", {});
        console.log("resGetCat", res)
        let apiData = []
        if (res && res?.status) {
            setIsLoading(false);
            apiData = res?.data?.map((item, i) => ({
                id: i + 1,
                sl: i + 1,
                usertype: item?.type,
                name: item?.firstName + " " + item?.lastName,
                postType: item?.postType,
                post: item?.description,
                image: item?.image[0],
                totalReaction: item?.totalReaction ? item?.totalReaction : "-",
                createdDate: moment(item?.createdOn).format("DD-MM-YYYY"),


                action: <EditDeleteIcon

                    // onClickEdit={(e) => handleEdit(item)}
                    onClickDelete={(e) => handleDelete(item?._id)}
                />
            }));
        } else {
            setIsLoading(false);
        }
        // Filter data based on search input
        const filteredData = apiData?.filter(item =>
            item?.name?.toLowerCase()?.includes(searchInput?.toLowerCase()) ||
            item?.usertype?.toLowerCase()?.includes(searchInput?.toLowerCase()) ||
            item?.postType?.toLowerCase()?.includes(searchInput?.toLowerCase()) ||
            item?.post?.toLowerCase()?.includes(searchInput?.toLowerCase()) ||
            item?.totalReaction?.toString()?.includes(searchInput)

        );
        setAllData(filteredData);
    }
    const handleDelete = (id) => {
        const del = async () => {
            setIsLoading(true);
            const res = await HttpClient.requestData("owner-delete-post/" + id, "PUT")
            if (res && res?.status) {
                setIsLoading(false);
                getCategoryWiseData();

                toast.success("id Deleted Successfully");
            } else {
                setIsLoading(false);
                toast.error(res?.message || "Something Wrong");
            }
        }

        DeleteConfirmModal(del);
    }
    useEffect(() => {
        getCategoryWiseData();
    }, [searchInput])



    return (
        <div className="d-flex justify-content-end">
            <div className="form-header">

                <CustomLoader loading={isLoading} />
                <section className="piechartsBox_area">
                    <div
                        style={headLineStyle}
                        className="page-headline"
                    >
                        Post Data
                    </div>
                    <div className=" d-flex justify-content-end mb-2" >
                        <div className="Search_box">
                            <form className="form-inline">
                                <input
                                    className="form-control h-75"
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                />
                                <div className="Search_icon">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                            </form>
                        </div>
                    </div>


                    <form>

                        <div>

                            <DataTable
                                columns={columns}
                                data={AllData}
                                pagination
                                striped
                                className=" rounded "
                            />
                        </div>
                    </form>
                </section>
            </div>
        </div>

    )
}

export default ManagePosts;
