import React from "react";
import { CreateCoworking, PageHeading, PrivateLayout } from "../../components";
export default function Dashboard() {
  const breadcrumbData = [
    {
      name: "All Brands",
      link: "/brands",
    },
  ];
  return (
    <PrivateLayout>
      <PageHeading name="Create a new brand" breadcrumbs={breadcrumbData} />
      <CreateCoworking />
    </PrivateLayout>
  );
}
