import { useEffect, useState } from "react";
import {
  PrivateLayout,
  PageHeading,
  UserAvailabilityComponent,
} from "../components";
import { useAuth } from "../context/AuthContext";

export default function SchedulePage() {
  const [editData, setEditData] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      // getEditScheduleData(currentUser.id, setEditData);
    }
  }, [currentUser]);

  return (
    <PrivateLayout>
      <PageHeading name="Schedule" subtext="Set Your Weekly Hours" />
      <UserAvailabilityComponent editData={editData} />
    </PrivateLayout>
  );
}
