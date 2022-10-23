import React, { useState } from "react";
import {
  createBrand,
  createLocation,
  updateBrand,
} from "../../utils/firebasePostRequests";
import { InputText } from "../atoms/inputText";
import { useAuth } from "../../context/AuthContext";
import { toastNotification } from "../atoms/toastNotification";
export function LocationForm({ brandId, locationId, locationData }) {
  const [name, setName] = useState("");
  const { uniqueId } = useAuth();
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
        createLocation({ name, brandId, uniqueId });
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
