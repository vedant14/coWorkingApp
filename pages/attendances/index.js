import { AttendanceLayout, PageHeading, PrivateLayout } from "../../components";

const bookingData = [
  {
    id: 1,
    bookingId: 1,
    bookingName: "Vedant",
    bookingEmail: "vedant@gmail.com",
    bookingPhone: "9767137428",
    brands: {
      name: "First Brand",
      location: "Location",
    },
  },
];
export default function AttendancePage() {
  return (
    <PrivateLayout>
      <PageHeading
        name="Attendances"
        primaryText="New Entry"
        primaryLink="/attendances/new-attendance"
      />
      <AttendanceLayout bookingData={bookingData} />
    </PrivateLayout>
  );
}
