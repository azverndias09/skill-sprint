import React, { useState, useEffect } from "react";
import axios from "axios";

const RazorpayPaymentButton = ({ amount }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    loadRazorpayScript()
      .then(() => {
        setScriptLoaded(true);
      })
      .catch((error) => {
        console.error("Error loading Razorpay script:", error);
      });
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };

  const initPayment = async () => {
    try {
      const orderUrl = "http://localhost:3001/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount });
      console.log(data);

      const options = {
        key: process.env.KEY_ID,
        amount: data.data.amount,
        currency: data.data.currency,
        description: "Test Transaction",
        order_id: data.data.id,
        handler: async (response) => {
          try {
            const verifyUrl = "http://localhost:3001/api/payment/verify";
            const { data } = await axios.post(verifyUrl, response);
            console.log(data);
          } catch (error) {
            console.error(error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {scriptLoaded ? (
        <button onClick={initPayment} className="buy_btn">
          Pay Now
        </button>
      ) : (
        <p>Loading Razorpay script...</p>
      )}
    </div>
  );
};

export default RazorpayPaymentButton;
