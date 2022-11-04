import React, { useState } from "react";
import { createBrand } from "../../utils/supabasePostRequests";
import { InputText } from "../atoms/inputText";
import { useAuth } from "../../context/AuthContext";
import { toastNotification } from "../atoms/toastNotification";
export function CreateCoworking({ brandId, brandData }) {
  const [name, setName] = useState(brandData ? brandData.name : "");
  const { currentUser } = useAuth();
  function callCreateBrand(e) {
    e.preventDefault();
    if (name === "") {
      toastNotification(
        "Oops looks like you missed something",
        "Add a name to your brand",
        "danger"
      );
    } else {
      if (brandData) {
        // updateBrand({ name, brandId });
      } else {
        createBrand(name, currentUser.id, function (response) {
          // toastNotification(response, "HEY", )
        });
      }
    }
  }

  function callDeleteBrand(e) {
    e.preventDefault;
    // postDeleteBrand(brandId);
    toastNotification("Deleted", "All locations as well", "success");
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
      <div className="flex space-x-2 mt-4 ml-1">
        <button
          className="w-fit py-2 px-4 rounded-md bg-dark-green shadow-sm text-white text-base font-medium inline-flex items-center space-x-4"
          onClick={(e) => callCreateBrand(e)}
        >
          Save
        </button>
        {brandId && (
          <button
            className="w-fit py-2 px-4 rounded-md bg-red-700 shadow-sm text-white text-base font-medium inline-flex items-center space-x-4"
            onClick={(e) => callDeleteBrand(e)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
