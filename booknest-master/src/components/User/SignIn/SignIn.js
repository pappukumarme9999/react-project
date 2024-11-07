import { useState } from 'react';
import './SignIn.css'
import axios from '../../../Interceptor.js';
import { apiEndPoint } from "../../../WebApi/WebApi.js";
import {toast,ToastContainer} from "react-toastify";
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../router-config/userSlice.js';
import 'react-toastify/dist/ReactToastify.css'
import {Link, useNavigate } from "react-router-dom";
// import TopBar from '../../TopBar/TopBar.js';
import Header from "../../Header/Header.js";
import Footer from "../../Footer/Footer.js";
import { fetchCart} from '../../../router-config/cartSlice.js';
import GoogleLogin from '../../ExtraServices/GoogleLogin.js';
import Loader from '../../Spinner/Loader.js';
import pappu from 'lodash';

function SignIn(){
  const [email, SetEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const [isLoading,setIsLoading] = useState(true);
  const [loader,setLoader] = useState(false);

  const handleSubmit=async(event)=>{
    try{
    event.preventDefault();
    setLoader(true);
    let response = await axios.post(apiEndPoint.USER_SIGNIN,{email,password});
    if(response.data.status){
      let carts = await axios.post(apiEndPoint.FETCH_CART,{userId:response.data.user._id})
      dispatch(setCurrentUser(response.data.user));
      dispatch(fetchCart(response.data.user._id));
      setIsLoading(false);
      toast("Welcome to BookNest");

      setTimeout(()=>{
        navigate("/");
        return response.data.user;
      },2000);
      }
      
    } catch (err) {
      toast.error("Sign In Failed");
      setLoader(false);
    }
  }
  const throttleFunction = pappu.throttle(handleSubmit,5000);
 function sub () {
    var email = document.getElementById('floatingInput').value;
    var pass = document.getElementById('floatingPassword').value;
    if(email.length && pass.length>=6 )
       document.getElementById('submitbtn').removeAttribute('disabled');
}
  const changeHome = () => {
    navigate("/")
  }
    return <>
    <Header/>
    <ToastContainer/>
    {loader&&isLoading&&<Loader/>}
    <div className='container-fluid'>
     <div className="breadcrumbs-area ">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="breadcrumbs-menu">
                        <ul>
                            <li><a onClick={changeHome}>Home</a></li>
                            <li><a href="#" className="active">SignIn</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div className="container-fluid ps-md-0">
     
  <div className="row g-0">
    <div className="d-none d-md-flex col-md-4 col-lg-5 ms-5 sign-image signupimg">
      
    </div>
    <div className="col-md-8 col-lg-6">
      <div className="login d-flex align-items-center py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-lg-8 mx-auto">
              <h3 className="login-heading mb-4 welcome">Welcome Back!</h3>
              <form id='SigninForm' onSubmit={throttleFunction}>
                <div className="form-floating mb-3">
                  <input  onChange={(event)=>SetEmail(event.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required/>
                  <label for="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input  onChange={(event)=>setPassword(event.target.value)}type="password" className="form-control" onKeyUp={sub} id="floatingPassword" placeholder="Password" required/>
                  <label for="floatingPassword">Password</label>
                </div>
                <div className="d-grid">
                  <button id='submitbtn' disabled className="btn btn-lg btn-login text-uppercase fw-bold mb-2  btn btn-dark" type="submit">Sign in</button>
                  <GoogleLogin/>
                  <div className="text-center">
                   <Link to='/forgetPassword'>Forgot password?</Link>
                  </div>
                  <div className="text-center">
                   <Link
                    to='/signup'>I Don't Have an Account</Link>
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
<Footer/>
    </>
}

export default SignIn;