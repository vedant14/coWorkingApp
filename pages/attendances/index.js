import {
  AttendanceTable,
  BookingsLayout,
  PageHeading,
  PrivateLayout,
} from "../../components";

const bookingData = [
  {
    id: 1,
  },
];
export default function AttendancePage() {
  return (
    <PrivateLayout>
      <PageHeading name="Attendances" primaryText="New Entry" primaryLink="/" />
      <AttendanceTable />
    </PrivateLayout>
  );
}
