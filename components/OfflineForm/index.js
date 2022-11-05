import { Card } from "../atoms/card";
import { InputText } from "../atoms/inputText";
import { DropDown } from "../atoms/dropDown";
import { useState } from "react";
import passArray from "../../data/passArray.json";
import { BrandButton } from "../atoms/brandButton";
import { incrementArray } from "../../utils/helperFunctions";
import { createBooking } from "../../utils/supabasePostRequests";
import { toastNotification } from "../atoms/toastNotification";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

var passCountArray = [];
var seatsArray = [];

incrementArray(passCountArray, 1, 30);
incrementArray(seatsArray, 1, 10);

export function OfflineForm({ brandData }) {
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [seatCount, setSeatCount] = useState(seatsArray[0]);
  const [passType, setPassType] = useState(passArray[2]);
  const [passCount, setPassCount] = useState(passCountArray[0]);
  const [selectedBrand, setSelectedBrand] = useState(brandData[0]);
  const router = useRouter();
  const { currentUser } = useAuth();

  function callSaveBooking(e) {
    e.preventDefault();
    if (selectedBrand && bookingName && bookingEmail && bookingPhone) {
      createBooking(
        selectedBrand.id,
        null,
        bookingName,
        bookingPhone,
        bookingEmail,
        passCount.id,
        seatCount.id,
        passType.id,
        currentUser.id,
        function (response) {
          if (response === true) {
            toastNotification("Succcess", "Booking Creatd", "success");
            router.push("/bookings");
          }
        }
      );
    }
  }
  return (
    <Card>
      <div className="p-6 mb-10">
        <div className="grid  gap-4 grid-cols-2 ">
          <DropDown
            type="location"
            label="Select brand"
            optionsArray={brandData}
            selected={selectedBrand}
            setSelected={setSelectedBrand}
          />
          <InputText id="number" placeholder="Number" label="Location" />
          <InputText
            id="name"
            placeholder="Company or individual name"
            label="Booking Name"
            value={bookingName}
            onChangeValue={setBookingName}
          />
          <InputText
            id="email"
            placeholder="email@email.com"
            label="Email"
            value={bookingEmail}
            onChangeValue={setBookingEmail}
          />
          <InputText
            id="phone"
            placeholder="Phone"
            label="Phone Number"
            value={bookingPhone}
            onChangeValue={setBookingPhone}
          />
          <DropDown
            type="pass"
            label="Select No. of seats"
            optionsArray={seatsArray}
            selected={seatCount}
            setSelected={setSeatCount}
          />
          <DropDown
            type="pass"
            label="Pass Type"
            optionsArray={passArray}
            selected={passType}
            setSelected={setPassType}
          />
          <DropDown
            type="pass"
            label="No. of passes (day/weeks/months)"
            optionsArray={passCountArray}
            selected={passCount}
            setSelected={setPassCount}
          />
        </div>
        <div>
          <BrandButton
            text="Confirm Booking"
            onClickAction={callSaveBooking}
            width="fit"
          />
        </div>
      </div>
    </Card>
  );
}
