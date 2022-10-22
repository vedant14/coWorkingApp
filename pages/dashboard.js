import React from "react";
import {
  CreateCoworking,
  PrivateLayout,
  UpcomingBookings,
} from "../components";
export default function Dashboard() {
  return (
    <PrivateLayout>
      <CreateCoworking />
    </PrivateLayout>
  );
}
