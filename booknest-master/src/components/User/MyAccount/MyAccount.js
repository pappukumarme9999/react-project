import { useSelector } from "react-redux";
import"./MyAccount.css"
import{Link, useNavigate} from "react-router-dom"

import Payment from "./Payment";
import BillingAddress from "./Billing";
import Account from "./Account.js";
import SideBar from "./SideBar.js";
import UserBooks from "./UserBooks";
import Order from "./Order/Order.js";
import Header from "../../Header/Header.js";
import Footer from "../../Footer/Footer.js";
function MyAccount(){
    console.log("Rendering MyAccount component");

    return(
    <>
    <Header/>
    
    <div className="entry-header-area mt-3">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="entry-header-title">
                        <h2>My-Account</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
  
    <div className="my-account-wrapper ">
        <div className="container">
            <div className="section-bg-color">
                <div className="row">
                    <div className="col-lg-12">
                      
                        <div className="myaccount-page-wrapper">
                         
                            <div className="row">
                               <SideBar/>
                              
                                <div className="col-lg-9 col-md-8 mb-4" style={{marginTop:'-70px'}}>
                                    <div className="tab-content" id="myaccountContent">
                                       
                                        <UserBooks/>
                                         <Order/>
                                         <Payment/>
                                       <BillingAddress/>
                                       <Account/>   
                                    </div>
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
    );
}

export default MyAccount;