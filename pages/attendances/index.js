import { useEffect, useState } from "react";
import {
  AttendanceLayout,
  NoDataPage,
  PageHeading,
  PageLoader,
  PrivateLayout,
} from "../../components";
import { useAuth } from "../../context/AuthContext";
import { getAdminAttendanceData } from "../../utils/supabaseGetRequests";

export default function AttendancePage() {
  const [attendanceData, setAttendanceData] = useState(null);
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) {
      getAdminAttendanceData(currentUser.id, function (fetchedData) {
        if (fetchedData) {
          setAttendanceData(fetchedData);
        }
      });
    }
  }, [currentUser]);
  if (!attendanceData) {
    return <NoDataPage />;
  } else if (attendanceData === null) {
    return <PageLoader />;
  } else return <ShowAttendancePage />;

  function ShowAttendancePage() {
    return (
      <PrivateLayout>
        <PageHeading
          name="Attendances"
          primaryText="New Entry"
          primaryLink="/attendances/new-attendance"
        />
        <AttendanceLayout attendanceData={attendanceData} />
      </PrivateLayout>
    );
  }
}
