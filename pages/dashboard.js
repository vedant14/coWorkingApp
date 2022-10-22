import React from "react";
import { PrivateLayout, UpcomingBookings } from "../components";
export default function Dashboard() {
  return (
    <PrivateLayout>
      <UpcomingBookings today={true} />
    </PrivateLayout>
  );
}
