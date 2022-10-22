import { useState, useEffect } from "react";
import { AvailabilityInput } from "./availabilityInput";
import { useAuth } from "../../context/AuthContext";
import { saveSlotData } from "../../utils/firebasePostRequests";
import { Store } from "react-notifications-component";

export function UserAvailabilityComponent({ editData }) {
  const { uniqueId } = useAuth();
  const slotInputDays = [
    { name: "Sunday", value: 0 },
    { name: "Monday", value: 1 },
    { name: "Tuesday", value: 2 },
    { name: "Wednesday", value: 3 },
    { name: "Thursday", value: 4 },
    { name: "Friday", value: 5 },
    { name: "Saturday", value: 6 },
  ];
  const slotData = {
    0: {
      slots: [],
    },
    1: {
      slots: [],
    },
    2: {
      slots: [],
    },
    3: {
      slots: [],
    },
    4: {
      slots: [],
    },
    5: {
      slots: [],
    },
    6: {
      slots: [],
    },
  };
  const [userAvailability, setUserAvailability] = useState(slotData);
  function callSaveSlotData() {
    saveSlotData(uniqueId, userAvailability, Store);
  }

  useEffect(() => {
    if (editData && editData.data) {
      setUserAvailability(editData.data.scheduleData);
    }
  }, [editData]);

  return (
    <div>
      <div className="border mt-6 px-10 py-2 border-neutral-200 max-w-2xl rounded-md">
        <div className="mx-auto divide-y divide-solid">
          {slotInputDays.map((day, i) => (
            <AvailabilityInput
              key={i}
              day={day}
              userAvailability={userAvailability}
              setUserAvailability={setUserAvailability}
            />
          ))}
        </div>
      </div>
      <button
        className="inline-flex justify-center my-5 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-dark-green"
        onClick={() => callSaveSlotData()}
      >
        Save Schedule
      </button>
    </div>
  );
}
