import { useState, useEffect } from "react";
import {
  LocationForm,
  NoDataPage,
  PageHeading,
  PageLoader,
  PrivateLayout,
} from "../../../components";
import { useRouter } from "next/router";
import { getBrandName } from "../../../utils/supabaseGetRequests";

export default function NewLocation() {
  const router = useRouter();
  const [brandData, setBrandData] = useState(null);
  const { brand } = router.query;
  useEffect(() => {
    if (brand) {
      getBrandName(brand, function (fetchedData) {
        setBrandData(fetchedData);
      });
    }
  }, [brand]);

  if (brandData === false) {
    return <NoDataPage />;
  } else if (!brandData) {
    return <PageLoader />;
  } else {
    return <LocationDetails />;
  }

  function LocationDetails() {
    const breadCrumbsData = [
      { name: "All Brands", link: "/brands" },
      {
        name: brandData.name,
        link: `/brands/${brand}`,
      },
    ];
    return (
      <PrivateLayout>
        <PageHeading name="New Location" breadcrumbs={breadCrumbsData} />
        <LocationForm brandId={brand} />
      </PrivateLayout>
    );
  }
}
