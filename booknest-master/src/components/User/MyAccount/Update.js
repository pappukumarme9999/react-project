// booknest-master/src/components/User/MyAccount/Update.js
import SideBar from "./SideBar.js";
import './MyAccount.css'
import { useState } from "react";
import axios from "../../../Interceptor.js";
import { apiEndPoint } from "../../../WebApi/WebApi.js";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateProfile } from "../../../router-config/userSlice.js";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import Header from "../../Header/Header.js";
import Footer from "../../Footer/Footer.js";
import { imageToBase64 } from "../../../utils/imageToBase64.js";

function Update() {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState(currentUser?.name || "");
    const [email, setEmail] = useState(currentUser?.email || "");
    const [contact, setContact] = useState(currentUser?.contact || "");
    const [photoBase64, setPhotoBase64] = useState(null);

    // Handles image upload and converts it to base64
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log("Selected file for upload:", file.name);
            try {
                const base64Image = await imageToBase64(file);
                setPhotoBase64(base64Image);
                console.log("Image converted to base64 successfully:", base64Image);
            } catch (error) {
                console.error(error);
                toast.error("Failed to convert image to base64.");
            }
        }
    };

    // Handles profile update form submission
    const updateProfile = async (event) => {
        event.preventDefault();
        try {
            console.log("Updating profile with:", { name, email, contact, photoBase64 });

            const formData = new FormData();
            formData.set("name", name);
            formData.set("email", email);
            formData.set("contact", contact);
            formData.set("_id", currentUser?._id);

            if (photoBase64) {
                formData.set("photo", photoBase64); // Set base64 string directly if available
            }

            const response = await axios.post(apiEndPoint.USER_UPDATEPROFILE, formData);
            console.log("Profile update response:", response);

            dispatch(setUpdateProfile(response.data.updatedUser));
            toast.success("Profile Updated Successfully");

            setTimeout(() => {
                navigate('/myaccount');
            }, 5000);
        } catch (err) {
            console.error("Error updating profile:", err);
            toast.error("Something Went Wrong");
        }
    };

    return (
        <>
            <Header />
            <div className="breadcrumbs-area mb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumbs-menu">
                                <ul>
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#" className="active">Update Profile</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-account-wrapper mb-70">
                <ToastContainer />
                <div className="container">
                    <div className="section-bg-color">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="myaccount-page-wrapper">
                                    <div className="row ">
                                        <div className="col-lg-3"></div>
                                        <div className="col-lg-8 col-md-8">
                                            <div className="tab-content" id="myaccountContent">
                                                <div className="updateaccount">
                                                    <h5 className="text-center text-uppercase cardtitle p-4 ">Update Profile</h5>
                                                    <div className="row">
                                                        <form onSubmit={updateProfile}>
                                                            <div className="col-lg-10 m-auto mt-2">
                                                                <div className="row form-group">
                                                                    <input onChange={(event) => setName(event.target.value)} value={name} className="form-control" placeholder="Name" />
                                                                </div>
                                                                <div className="row form-group">
                                                                    <input onChange={(event) => setEmail(event.target.value)} value={email} className="form-control" placeholder="Email" />
                                                                </div>
                                                                <div className="row form-group">
                                                                    <input onChange={(event) => setContact(event.target.value)} value={contact} className="form-control" placeholder="Contact" />
                                                                </div>
                                                                <div className="row form-group">
                                                                    <input onChange={handleImageUpload} type="file" className="form-control" />
                                                                </div>
                                                                <div className="row form-group">
                                                                    <button className="editbutton" type="submit"><i className="fa fa-edit"></i> Update</button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Update;
