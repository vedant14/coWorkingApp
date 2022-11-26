import { AttendanceForm, PageHeading, PrivateLayout } from "../../components";

export default function NewAttendancePage() {
  const breadCrumbs = [
    {
      name: "All Attendance",
      link: "/attendances",
    },
  ];
  return (
    <PrivateLayout>
      <PageHeading
        name="New Attendance"
        breadCrumbs={breadCrumbs}
        subText="Add a new attendance"
      />
      <AttendanceForm />
    </PrivateLayout>
  );
}
