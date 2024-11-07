import "./SignUp.css";
import SignIn from "../SignIn/SignIn.js";
import { useRef, useState } from 'react';
import Header from "../../Header/Header.js";
import Footer from "../../Footer/Footer.js";
import axios from "../../../Interceptor.js";
import { toast, ToastContainer } from "react-toastify";
import { apiEndPoint } from "../../../WebApi/WebApi.js";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { imageToBase64 } from "../../../utils/imageToBase64.js";
import Loader from "../../Spinner/Loader";

function SignUp() {
    const changeHome = () => {
        navigate("/")
    }
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [modal, setModal] = useState(false);
    const [profileImage, setProfileImage] = useState("");
    const [formReady, setFormReady] = useState(false);
    const navigate = useNavigate();


    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const contactRef = useRef("");
    const otpRef = useRef("");

    // Convert image to base64 on file selection
    const handleImageUpload = async (event) => {
        try {
            const file = event.target.files[0];
            if (file) {
                const base64String = await imageToBase64(file);
                setProfileImage(base64String);
                console.log("Image converted to base64 successfully.");
            }
        } catch (error) {
            console.error("Error converting image to base64:", error);
            toast.error("Failed to process image.");
        }
    };

    // Submit email verification
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(apiEndPoint.USER_VERIFY, { 
                name: nameRef.current.value, 
                email: emailRef.current.value 
            });
            setOtp(response.data.otp);
            setModal(true);
            console.log("OTP sent successfully.");
        } catch (err) {
            console.error("Error during email verification:", err);
            setModal(false);
            toast.warning(err.response?.status === 400 ? "User already exists" : "Something went wrong.");
        }
    };

    // Register user
    const handleRegistration = async () => {
        if (otp !== otpRef.current.value) {
            toast.error("Invalid OTP.");
            return;
        }
        
        setIsLoading(true);
        const formData = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            contact: contactRef.current.value,
            password: passwordRef.current.value,
            profileImage: profileImage // Using base64 image
        };

        try {
            const response = await axios.post(apiEndPoint.USER_SIGNUP, formData);
            if (response.data.status) {
                console.log("User registered successfully.");
                toast.success("Registration successful!");
                navigate("/signIn");
            } else {
                toast.error("Failed to register user.");
            }
        } catch (err) {
            console.error("Error during registration:", err);
            toast.error("Registration failed.");
        } finally {
            setIsLoading(false);
        }
    };

    // Enable/Disable submit button based on input validation
    const validateForm = () => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const contact = contactRef.current.value;
        
        if (email && password.length >= 8 && name && contact.length === 10) {
            setFormReady(true);
        } else {
            setFormReady(false);
        }
    };

    return <>
        <Header />
        <ToastContainer />
        {isLoading && <Loader/>}
        <div className="breadcrumbs-area ">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumbs-menu">
                            <ul>
                                <li><a onClick={changeHome}>Home</a></li>
                                <li><a href="#" className="active">SignUp</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section className="vh-100">
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">

                        <div className="row justify-content-center">
                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-2 order-lg-1 mb-3 " >
                                <img
                                    src="https://images.unsplash.com/photo-1608099269227-82de5da1e4a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGJvb2tzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60"
                                 
                                    className="img-fluid img responsive signupimg" style={{ borderRadius: "0px 10% 0% 10%", boxShadow: "0px 0px 15px gray", height: "400px", width: " 90%", backgroundSize: "contain" }}
                                    alt="Sample image"
                                />
                            </div>
                            <div className="col-md-10 col-lg-6 col-xl-5 order-1 order-lg-2">
                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4" style={{ color: "#00796B", textShadow: "2px 2px 2px gray" }}>
                                    Sign up
                                </p>
                                <form onSubmit={handleSubmit} id='registrationForm'>
                                    <div className="form-group">

                                        <input ref={nameRef} type="text" onBlur={validateForm} placeholder="Enter name" className="form-control" id="name" name="name" required />
                                    </div>
                                    <div className="form-group">
                                        <input ref={emailRef} type="email" onBlur={validateForm} placeholder="Enter email" className="form-control" id="email" name="email" required />
                                    </div>
                                    <div className="form-group">

                                        <input ref={passwordRef} type="password" onBlur={validateForm} placeholder="Enter password" className="form-control" id="password" name="password" required />
                                    </div>
                                    <div className="form-group">
                                        <input ref={contactRef} type="text" onBlur={validateForm} placeholder="Enter contact number" id="contact" className="form-control" required />
                                    </div>
                                    <div>
                                        <i className="fa fa-mars-stroke me-3" style={{ fontSize: "18px" }}></i>
                                        <input className="" type="radio" value="MALE" name="gender" defaultChecked /> Male
                                        <input className="mb-4 ms-4" type="radio" value="FEMALE" name="gender" /> Female
                                        <input className="mb-4 ms-4" type="radio" value="OTHER" name="gender" /> Other
                                    </div>
                                    <div>
                                        <i className="fa fa-user me-3"></i>
                                        <input onChange={handleImageUpload} className="mb-4" type="file" accept="image/*" required />
                                    </div>
                                    <div className="form-group text-center">
                                            {modal ?
                                                <button type="submit" className="btn submitbtn w-100" disabled={!formReady}>
                                            Sign Up
                                        </button> : <button type="submit" className="btn submitbtn w-100" data-toggle="modal" data-target="#exampleModalCenter">
                                            Sign Up
                                        </button>
                                            }
                                    </div>

                                    <div className="text-center">
                                        <Link to="/signIn">I Already Have an Account</Link>
                                    </div>

                                </form>
                            </div>
                                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header" id="modal">
                                            Registration Page
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                            <div className="modal-body">
                                            <div className="container height-100 d-flex justify-content-center align-items-center">
                                                <div className="position-relative">
                                                    <div className="card p-2 text-center">
                                                        <h6>Please enter the one time password <br /> to verify your account</h6>
                                                        <div> <span>A code has been sent to</span> <small>Your Email Id</small> </div>
                                                        <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2">
                                                            <input ref={otpRef} className="m-2 text-center form-control rounded width:10" type="text" id="fourth" maxlength="4" />
                                                        </div>
                                                        <div className="mt-4">
                                                            {modal ? <button onClick={handleRegistration} className="btn btn-warning px-4 validate" id="verify" data-dismiss="modal">Validate</button> :  <button onClick={() => handleRegistration} className="btn btn-warning px-4 validate" id="verify">Validate</button>}
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
            </div>
        </section>
        <Footer />
    </>
}
export default SignUp;
