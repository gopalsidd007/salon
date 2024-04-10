import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import HttpClient from "../../utils/HttpClient";
import toast from "react-hot-toast";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import CustomLoader from "../../CustomComponents/loader/CustomLoader";

const EditAdvoCategory = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [id, setId] = useState("")
    const params = useParams();
    const location = useLocation()
    const [catName, setCatName] = useState();
    const [isLoading, setIsLoading] = useState(false);


    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!catName) {
            return toast.error("Category Name is Required");
        }

        const data = {
            categoryName: catName
        }

        setIsLoading(true);
        const res = await HttpClient.requestData(`update-advocacy-category/${id}`, "PUT", data);
        if (res && res?.status) {
            toast.success("Category Updated Successfully")
            navigate('/manage-advocaycategory');
            setIsLoading(false);
        } else {
            toast.error(res?.message)
            setIsLoading(false);
        }

    };

    // get single Category data
    const getSingleCategory = async () => {
        setIsLoading(true);
        const res = await HttpClient.requestData("view-single-category/" + params.id, "GET", {})
        console.log("resSingg", res);
        if (res && res?.status) {
            const sinData = res?.data[0]
            setCatName(sinData?.name)
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    }

    const handleChange = (e) => {
        // console.log("pallab", e.target.value)
        setCatName(e.target.value)
    }

    useEffect(() => {
        setCatName(location?.state?.categoryName);
        setId(location?.state?._id)
    }, [])

    return (
        <Box m="20px">
            <CustomLoader loading={isLoading} />

            <Header title="Edit Category" subtitle="" />

            <form>
                <div className="row">
                    <div className="col">
                        <label for="formGroupExampleInput">Category Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Category Name"
                            onChange={(e) => setCatName(e.target?.value)}
                            value={catName}
                            name="category"
                        />
                    </div>
                </div>

                <Box display="flex" justifyContent="end" mt="20px">
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        onClick={(e) => handleSubmit(e)}
                    >
                        Update Category
                    </Button>
                </Box>
            </form>
        </Box>
    );
};


export default EditAdvoCategory;
