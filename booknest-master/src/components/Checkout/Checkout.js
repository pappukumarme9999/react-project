// import TopBar from "../Topbar/topbar";
// import Footer from "../footer/footer";
// import Header from "../header/header";

// function Checkout(){
//         return <>
//             <Header/>
//             <TopBar/>
//             <Footer/>

//         </>
// }
// export default Checkout;


import React, { useState } from 'react';
import TopBar from "../TopBar/TopBar";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Payment from "../Payment/Razorpay";  // Import the Payment component

function Checkout() {
    const [amount, setAmount] = useState(5000); // Set default amount (in INR)

    return (
        <>
            <Header />
            {/* <TopBar /> */}
            <div className="checkout-container">
                <h2>Checkout</h2>
                <p>Total Amount: ₹{amount}</p>
                {/* Render the Payment component, passing the amount as a prop */}
                <Payment money={amount} />
            </div>
            <Footer />
        </>
    );
}

export default Checkout;