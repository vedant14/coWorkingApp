import { useEffect, useState } from "react";
import { PrivateLayout, UserAvailabilityComponent } from "../components";
import { useAuth } from "../context/AuthContext";
import { getEditScheduleData } from "../utils/firebaseGetRequest";
export default function SchedulePage() {
  const [editData, setEditData] = useState(null);
  const { uniqueId } = useAuth();

  useEffect(() => {
    if (uniqueId) {
      getEditScheduleData(uniqueId, setEditData);
    }
  }, [uniqueId]);

  return (
    <PrivateLayout>
      <p className="text-2xl text-dark-green font-semibold">Schedule</p>
      <p className="text-neutral-500"> Set your weekly hours</p>
      <UserAvailabilityComponent editData={editData} />
    </PrivateLayout>
  );
}
