import { useState } from "react";
import { BrandButton } from "../atoms/brandButton";
import { DropDown } from "../atoms/dropDown";
import { InputText } from "./inputText";
import { PageLoaderSpinner } from "./pageLoader";
import { SuccessModal } from "./successModal";
import { makePayment } from "../../utils/paymentCalls";
import passArray from "../../data/passArray.json";
import { incrementArray } from "../../utils/helperFunctions";

var passCountArray = [];
var seatsArray = [];

incrementArray(passCountArray, 1, 30);
incrementArray(seatsArray, 1, 10);

export function CheckoutForm({ bookingData }) {
  const [selectedPass, setSelectedPass] = useState(passArray[2]);
  const [selectedLocation, setSelectedLocation] = useState(
    bookingData.locations[0]
  );
  const [passCount, setPassCount] = useState(passCountArray[10]);
  const [selectedSeats, setSelectedSeats] = useState(seatsArray[0]);
  const [modal, setModal] = useState(false);
  const [loader, setLoader] = useState(false);
  var label = `No. of ${selectedPass.metric}`;
  function callPaymentGateway() {
    if (selectedPass && selectedLocation && passCount) {
      setLoader(true);
      makePayment(bookingData, setLoader, setModal);
    } else {
      // console.log("Please ensure that name, email and the service is selected");
    }
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
          type="Seats"
          label="No of seats"
          optionsArray={seatsArray}
          selected={selectedSeats}
          setSelected={setSelectedSeats}
        />
        <DropDown
          type="Quanity"
          label={label}
          optionsArray={passCountArray}
          selected={passCount}
          setSelected={setPassCount}
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
            <div># of seats</div>
            <div> {selectedSeats.name} </div>
          </div>
          <div className="flex justify-between">
            <div>{label}</div>
            <div> {passCount.name}</div>
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
