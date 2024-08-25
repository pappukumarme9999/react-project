import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {GoogleLogin} from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../router-config/userSlice";
import { useNavigate } from "react-router-dom";
import './extragoogle.css'

function WithGoogle(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return <>
        <div className="main-container">
     
            <GoogleOAuthProvider clientId="253200048380-kj5s3efrn407rl6tfuvuuafg014qp8vg.apps.googleusercontent.com">
                <GoogleLogin className='googlebutton'
                    onSuccess={credentialResponse =>{
                        const details =jwt_decode(credentialResponse.credential);
                        const userData = {name : details.given_name+" "+details.family_name,email : details.email,photo : details.picture,status:true};
                        dispatch(setCurrentUser(userData));
                        navigate("/");
                        navigate("/");
                    }}
                    onError={()=>{
                        ("Login Failed");
                    }}
                    />
            </GoogleOAuthProvider>
        </div>
    </>
}
export default WithGoogle;