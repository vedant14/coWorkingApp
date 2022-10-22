import React from "react";
import {
  CreateCoworking,
  PrivateLayout,
  UpcomingBookings,
} from "../components";
import { ShowAllBrands } from "../components/ShowAllBrands";
export default function Dashboard() {
  return (
    <PrivateLayout>
      <CreateCoworking />
      <ShowAllBrands />
    </PrivateLayout>
  );
}
