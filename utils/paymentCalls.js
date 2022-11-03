import axios from "axios";
import { createOrder } from "./supabasePostRequests";
const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
export async function makePayment(bookingData, setLoader, setModal) {
  const res = await initializeRazorpay();
  if (!res) {
    alert("Razorpay SDK Failed to load");
    return;
  }
  createOrder("9767137428", bookingData.id, 2, function (data) {
    const newData = {
      orderId: "data",
    };
    makePaymentCall(newData, setLoader, setModal);
  });
}

async function makePaymentCall(data, setLoader, setModal) {
  var config = {
    method: "post",
    url: `https://us-central1-coworkingspaces-48082.cloudfunctions.net/app`,
    headers: {
      ContentType: "application/json",
    },
    data: data,
  };
  await axios(config)
    .then(function (response) {
      completeTransaction(response.data, setLoader, setModal);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
}
function completeTransaction(responseData, setLoader, setModal) {
  setLoader(false);
  var options = {
    key: process.env.NEXT_PUBLIC_RZP_ID, // Enter the Key ID generated from the Dashboard
    name: "GrowthSchool",
    currency: responseData.currency,
    amount: responseData.amount,
    order_id: responseData.id,
    prefill: {},
    handler: function (response) {
      // Validate payment at server - using webhooks is a better idea.
      if (response.razorpay_payment_id) {
        setModal(true);
      }
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
