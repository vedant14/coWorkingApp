import { useState } from "react";
import { PageHeading, PrivateLayout } from "../../../components";
import { useRouter } from "next/router";

export default function NewLocation() {
  const router = useRouter();
  const { brand } = router.query;

  console.log(brand);

  const breadCrumbsData = [{ name: "All Brands", link: "/brands" }];
  return (
    <PrivateLayout>
      <PageHeading name="New Location" breadcrumbs={breadCrumbsData} />
      <div>
        <div>a</div>
      </div>
    </PrivateLayout>
  );
}
