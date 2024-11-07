import React, { useState } from 'react';
function Payment(props) {
  const [amount, setamount] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!amount == "") {
    //   let newData = "fgdfgfd";
    // }

    if (!props.money || props.money <= 0) {
      alert('Invalid amount');
      return;
    }


    var options = {
      key: "",
      key_secret: "",
      amount: props.money * 100,
      currency: "INR",
      name: "BookNest",
      description: "Thanks for choosing BookNest",
      handler: function (response) {
        // Handle successful payment here (add your logic to verify the payment)
        alert(
          `Payment successful! Payment ID: ${response.razorpay_payment_id}`
        );
        console.log(response);
        // You can now send the response data to your backend for verification
      },
      prefill: {
        name: "Pappu Kumar",
        email: "pappukumarme9999@gmail.com",
        contact: "9504860538",
      },
      notes: {
        address: "Razorpay Corporate office",
      },
      theme: {
        color: "#00796B",
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div className="App">
      <button className="btn-dark mb-2 razorpaybutton" onClick={handleSubmit}>
        PAY ₹{props.money}
      </button>
    </div>
  );
}

export default Payment;
