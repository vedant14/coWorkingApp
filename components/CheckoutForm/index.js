import { useState } from "react";
import { BrandButton } from "../atoms/brandButton";
import { DropDown } from "./dropDown";
import { InputText } from "./inputText";

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

for (let i = 0; i < 30; i++) {
  quanityArray.push({
    id: i,
    name: i,
  });
}
export function CheckoutForm({ bookingData }) {
  const [selectedPass, setSelectedPass] = useState(passArray[2]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(quanityArray[10]);
  var label = `No. of ${selectedPass.metric}`;
  function callPaymentGateway() {
    console.log("PG");
  }
  return (
    <div className="block w-full mx-auto mt-6">
      <DropDown
        type="location"
        label="Selected Location"
        optionsArray={bookingData.locations}
        selected={selectedLocation}
        setSelected={setSelectedLocation}
      />
      <InputText label="Phone" type="text" placeholder="Phone Number" />
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
  );
}
