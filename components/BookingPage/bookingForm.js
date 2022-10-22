import { useState } from "react";
import axios from "axios";
import { InputText } from "../atoms/inputText";
import { InputTextArea } from "../atoms/inputTextArea";
import { saveBookingData } from "../../utils/firebasePostRequests";
import { displayDate, displaySlotData } from "../../utils/helperFunctions";
import { TailSpin } from "react-loader-spinner";
export default function BookingForm({
  selectedDate,
  selectedTime,
  showBookingForm,
  setShowCalendar,
  setShowBookingSlots,
  setShowBookingForm,
  mentorData,
}) {
  if (showBookingForm == false) {
    return null;
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState(30);
  const [mentorService, setMentorService] = useState("default");
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState(false);

  function callSaveBookingData() {
    if (name && email && mentorService) {
      setError(null);
      setLoader(true);
      makePayment();
    } else {
      setError("Please ensure that name, email and the service is selected");
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
    const data = {
      userId: mentorData.id,
    };

    var config = {
      method: "post",
      url: `https://us-central1-growthschool-35828.cloudfunctions.net/app/create-order`,
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

  function completeTransaction(data) {
    saveBookingData(
      data.id,
      name,
      email,
      message || null,
      duration,
      mentorService,
      new Date(selectedDate.setHours(0, 0, 0, 0)),
      selectedTime,
      mentorData.id
    );
    setLoader(false);
    var options = {
      key: process.env.NEXT_PUBLIC_RZP_ID, // Enter the Key ID generated from the Dashboard
      name: "GrowthSchool",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      prefill: {
        name: `${mentorData.firstName} ${mentorData.lastName}`,
        email: mentorData.email,
      },
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

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function PageLoaderSpinner() {
    if (loader === true) {
      return (
        <div className="fixed z-50 flex left-0 top-0 min-h-screen w-full bg-dark-green opacity-40">
          <div className="m-auto">
            <TailSpin ariaLabel="loading-indicator" color="#B1E5FC" />;
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  function SuccessModal() {
    if (modal === true) {
      return (
        <div className="fixed z-50 flex left-0 top-0 min-h-screen w-full bg-neutral-200/50">
          <div className="m-auto bg-dark-green px-10 py-10 rounded-md text-center max-w-xs space-y-2">
            <div>
              <img
                src="/icons/display/meeting-confirmed.svg"
                alt="meeting"
                className="mx-auto"
              />
            </div>
            <div>
              <p
                className="bg-primary-gradient bg-clip-text font-medium text-xl"
                style={{ webkitTextFillColor: "transparent" }}
              >
                Booking confirmed
              </p>
            </div>
            <div>
              <span className="text-neutral-50 text-sm">
                Confirmation has also been sent to the mail
              </span>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <>
      <PageLoaderSpinner />
      <SuccessModal />
      <div className="w-full space-y-6 col-span-2 container px-12">
        <div className="flex space-x-4 text-neutral-600">
          <button
            onClick={() => {
              setShowBookingForm(false),
                setShowBookingSlots(true),
                setShowCalendar(true);
            }}
          >
            <img src="/icons/display/arrow-left.svg" alt="Arrow" />
          </button>
          <div>
            {displayDate(selectedDate)} at {displaySlotData(selectedTime)}
          </div>
        </div>
        <p className="text-sm text-red-700">{error}</p>
        <div>
          <InputText
            id="name"
            label="Your Name"
            type="text"
            placeholder="Your name here"
            value={name}
            onChangeValue={setName}
            width="full"
          />
          <InputText
            id="email"
            label="Your Email"
            type="email"
            placeholder="Your email here"
            value={email}
            onChangeValue={setEmail}
            width="full"
          />
          <div className="grid grid-cols-2 gap-x-10">
            <div>
              <label className="block text-sm text-neutral-400 sm:mt-px sm:pt-2">
                Service
              </label>
              <select
                className="mt-1 block bg-neutral-50 w-full h-10 px-3 border border-neutral-100 rounded shadow-sm focus:outline-none focus:dark-green focus:dark-green sm:text-sm"
                value={mentorService}
                onChange={(e) => setMentorService(e.target.value)}
              >
                <option value="default" disabled>
                  Choose a service
                </option>
                {mentorData.mentorServices.map((item, i) => (
                  <option key={i}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 sm:mt-px sm:pt-2">
                Call Duration
              </label>
              <div className="mt-1 flex justify-between space-x-2 w-full">
                <button
                  className="bg-neutral-50 flex justify-between space-x-2 items-center rounded text-sm border border-neutral-100 px-3 h-10 shrink-0"
                  onClick={() => setDuration(30)}
                >
                  <div
                    className={classNames(
                      duration === 30 ? "bg-dark-green" : "bg-white",
                      "w-3 h-3 rounded-full border border-dark-green"
                    )}
                  >
                    &nbsp;
                  </div>
                  <div className="px-3">30 Mins</div>
                </button>

                <button
                  className="bg-neutral-50 flex justify-between space-x-2 items-center rounded text-sm border border-neutral-100 px-3 h-10 shrink-0"
                  onClick={() => setDuration(60)}
                >
                  <div
                    className={classNames(
                      duration === 60 ? "bg-dark-green" : "bg-white",
                      "w-3 h-3 rounded-full border border-dark-green"
                    )}
                  >
                    &nbsp;
                  </div>
                  <div className="px-3">60 Mins</div>
                </button>
              </div>
            </div>
          </div>
          <InputTextArea
            id="message"
            label="Please share anything that will help prepare for our meeting"
            placeholder="Requests"
            value={message}
            onChangeValue={setMessage}
          />
        </div>
        <div>
          <button
            className="w-fit py-3 px-4 rounded-md bg-dark-green shadow-sm text-white text-base font-medium inline-flex items-center space-x-4"
            onClick={callSaveBookingData}
          >
            <div>
              Pay Rs. {mentorData.amount * (duration === 30 ? 1 : 2)} and Book
            </div>
            <div>
              <img src="/icons/display/arrow-right.svg" alt="arrow" />
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
