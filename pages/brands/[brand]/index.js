import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  BrandInfoPage,
  NoDataPage,
  PageHeading,
  PageLoader,
  PrivateLayout,
  UserList,
} from "../../../components";
import { useAuth } from "../../../context/AuthContext";
import { getBrandDetails } from "../../../utils/supabaseGetRequests";

export default function BrandPage() {
  const uniqueId = "9030169c-e80c-4e73-9655-9cb14565ac65";
  const router = useRouter();
  const { brand } = router.query;
  const [brandData, setBrandData] = useState(null);
  useEffect(() => {
    if (brand && uniqueId) {
      getBrandDetails(uniqueId, brand, function (fetchedData) {
        console.log("HRE", fetchedData);
        setBrandData(fetchedData);
      });
    }
  }, [brand, uniqueId]);

  if (brandData === false) {
    return <NoDataPage />;
  } else if (!brandData) {
    return <NoDataPage />;
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
