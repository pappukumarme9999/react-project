import React,{useState} from "react";
import { GoogleLogin, googleLogout} from "@react-oauth/google";
export default function Login(){
    const clientId = "740256034848-kc4vjuc6ddiqs0s22bce0bo1gg24he1m.apps.googleusercontent.com";
    const [showLoginButton,setShowLoginButton] = useState(true);
    const [showLogOutButton,setShowLogOutButton] = useState(false);
    const onSuccess = (res)=>{
        setShowLoginButton(false);
        setShowLogOutButton(true);
    }
    const onLoginFailure = (res)=>{
    }
    const onSignOutSuccess = ()=>{
        alert("Sign Out success....");
        setShowLogOutButton(false);
        setShowLoginButton(true);
    }
    return <>
        {showLoginButton ? 
        <GoogleLogin
                clientId={clientId}
                buttonText={"Login"}
                onSuccess={onSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />:null
        }
        {showLogOutButton ? 
        <googleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSignOutSuccess}
            /> : null
        }
    </>
}