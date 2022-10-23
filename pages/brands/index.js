import React from "react";
import { PrivateLayout, PageHeading, ShowAllBrands } from "../../components";
export default function Brands() {
  return (
    <PrivateLayout>
      <PageHeading
        name="All Brands"
        primaryText="New Brand"
        primaryLink="/brands/new-brand"
      />
      <ShowAllBrands />
    </PrivateLayout>
  );
}
