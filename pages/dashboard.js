import React from "react";
import {
  CreateCoworking,
  PageHeading,
  PrivateLayout,
  UpcomingBookings,
} from "../components";
import { ShowAllBrands } from "../components/ShowAllBrands";
export default function Dashboard() {
  return (
    <PrivateLayout>
      <PageHeading name="Welcome Vedant" />
    </PrivateLayout>
  );
}
