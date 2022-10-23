import { useEffect, useState } from "react";
import {
  PrivateLayout,
  PageHeading,
  UserAvailabilityComponent,
} from "../components";
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
      <PageHeading name="Schedule" subtext="Set Your Weekly Hours" />
      <UserAvailabilityComponent editData={editData} />
    </PrivateLayout>
  );
}
