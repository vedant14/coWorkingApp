import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  BrandInfoPage,
  LocationList,
  NoDataPage,
  PageHeading,
  PageLoader,
  PrivateLayout,
  UserList,
} from "../../../components";
import { useAuth } from "../../../context/AuthContext";
import { getBrandDetails } from "../../../utils/firebaseGetRequests";

export default function BrandPage() {
  const { uniqueId } = useAuth();
  const router = useRouter();
  const [brandData, setBrandData] = useState(null);
  const { brand } = router.query;
  useEffect(() => {
    if (brand && uniqueId) {
      getBrandDetails(uniqueId, brand, function (fetchedData) {
        setBrandData(fetchedData);
      });
    }
  }, [brand, uniqueId]);

  if (brandData === false) {
    return <NoDataPage />;
  } else if (!brandData) {
    return <PageLoader />;
  } else {
    return <ShowBrandPage />;
  }

  function ShowBrandPage() {
    const breadCrumbsData = [
      {
        name: "All brands",
        link: "/brands",
      },
    ];
    return (
      <PrivateLayout>
        <PageHeading
          name={brandData.name}
          subtext="All information of this brand"
          breadcrumbs={breadCrumbsData}
          primaryText="New Location"
          primaryLink={`/brands/${brand}/new-location`}
          secondaryLink={`/brands/${brand}/edit`}
          secondaryText="Edit Brand"
        />
        <BrandInfoPage brandData={brandData} />
        <UserList />
      </PrivateLayout>
    );
  }
}
