import { useState } from "react";
import axios from "axios";
import { createOrder } from "../../utils/supabasePostRequests";
import { BrandButton } from "../atoms/brandButton";
import { DropDown } from "./dropDown";
import { InputText } from "./inputText";
import { PageLoaderSpinner } from "./pageLoader";
import { SuccessModal } from "./successModal";

const passArray = [
  {
    id: "1",
    name: "Daily Pass",
    metric: "days",
  },
  {
    id: "2",
    name: "Weekly Pass",
    metric: "weeks",
  },
  {
    id: "3",
    name: "Monthly Pass",
    metric: "months",
  },
];
var quanityArray = [];

for (let i = 1; i < 30; i++) {
  quanityArray.push({
    id: i,
    name: i,
  });
}
export function CheckoutForm({ bookingData }) {
  const [selectedPass, setSelectedPass] = useState(passArray[2]);
  const [selectedLocation, setSelectedLocation] = useState(
    bookingData.locations[0]
  );
  const [selectedQuantity, setSelectedQuantity] = useState(quanityArray[10]);
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);
  var label = `No. of ${selectedPass.metric}`;
  function callPaymentGateway() {
    if (selectedPass && selectedLocation && selectedQuantity) {
      // setLoader(true);
      makePayment();
    } else {
      console.log("Please ensure that name, email and the service is selected");
    }
  }

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
  async function makePayment() {
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    createOrder("9767137428", bookingData.id, 2, function (data) {
      const newData = {
        orderId: "data",
      };
      makePaymentCall(newData);
    });
  }

  async function makePaymentCall(data) {
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
        completeTransaction(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  function completeTransaction(responseData) {
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

  return (
    <>
      <SuccessModal modal={modal} />
      <PageLoaderSpinner loader={loader} />
      <div className="block w-full mx-auto mt-6">
        <DropDown
          type="location"
          label="Selected Location"
          optionsArray={bookingData.locations}
          selected={selectedLocation}
          setSelected={setSelectedLocation}
        />
        <InputText
          label="Phone"
          type="text"
          value="97"
          placeholder="Phone Number"
        />
        <DropDown
          type="Pass"
          label="Pass"
          optionsArray={passArray}
          selected={selectedPass}
          setSelected={setSelectedPass}
        />
        <DropDown
          type="Quanity"
          label={label}
          optionsArray={quanityArray}
          selected={selectedQuantity}
          setSelected={setSelectedQuantity}
        />
        <div className="mt-6 pt-6 border-t space-y-2">
          <div className="flex justify-between">
            <div>Location</div>
            <div>{selectedLocation.name}</div>
          </div>
          <div className="flex justify-between">
            <div>Pass type</div>
            <div>Monthly</div>
          </div>
          <div className="flex justify-between">
            <div>{label}</div>
            <div> {selectedQuantity.name}</div>
          </div>
          <div
            className="flex justify-between border-t pt-2 font-medium
        "
          >
            <div>Amount</div>
            <div>$133.2</div>
          </div>
          <div>
            <BrandButton
              text="Complete Payment"
              type="dark"
              onClickAction={callPaymentGateway}
            />
          </div>
        </div>
      </div>
    </>
  );
}
