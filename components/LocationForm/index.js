import React, { useState } from "react";
import { updateBrand } from "../../utils/firebasePostRequests";
import { createLocation } from "../../utils/supabasePostRequests";
import { InputText } from "../atoms/inputText";
import { useAuth } from "../../context/AuthContext";
import { toastNotification } from "../atoms/toastNotification";
export function LocationForm({ brandId, locationId, locationData }) {
  const [name, setName] = useState("");
  const uniqueId = "9030169c-e80c-4e73-9655-9cb14565ac65";
  function callCreateBrand(e) {
    e.preventDefault();
    if (name === "" && brandId && uniqueId) {
      toastNotification(
        "Oops looks like you missed something",
        "Add a name to your brand",
        "danger"
      );
    } else {
      if (locationData) {
        updateBrand({ name, brandId });
      } else {
        createLocation(name, uniqueId, brandId, function (response) {
          // toastNotification(response)
        });
      }
    }
  }
  return (
    <div>
      <InputText
        id="user-name"
        label="Name your coworking"
        type="text"
        placeholder="Enter your name"
        value={name}
        onChangeValue={setName}
        width="w-full"
      />
      <div className="mt-4 ml-1">
        <button
          className="w-fit py-2 px-4 rounded-md bg-dark-green shadow-sm text-white text-base font-medium inline-flex items-center space-x-4"
          onClick={(e) => callCreateBrand(e)}
        >
          Create CoWorking Brand
        </button>
      </div>
    </div>
  );
}
