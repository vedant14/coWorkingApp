import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  NoDataPage,
  PageHeading,
  PageLoader,
  PrivateLayout,
} from "../../../../components";
import { getLocationName } from "../../../../utils/supabaseGetRequests";

export default function BrandPage() {
  const router = useRouter();
  const [locationData, setLocationData] = useState("");
  const { brand, location } = router.query;
  useEffect(() => {
    if (location) {
      getLocationName(location, function (locationFetchedData) {
        setLocationData(locationFetchedData);
      });
    }
  }, [location]);

  if (locationData === false) {
    return <NoDataPage />;
  } else if (!locationData) {
    return <PageLoader />;
  } else {
    return <ShowLocationPage />;
  }

  function ShowLocationPage() {
    const breadCrumbsData = [
      {
        name: "All brands",
        link: "/brands",
      },
      {
        name: `${locationData.brands.name}`,
        link: `/brands/${brand}`,
      },
    ];
    return (
      <PrivateLayout>
        <PageHeading
          name={locationData.name}
          breadCrumbs={breadCrumbsData}
          primaryText="Add Schedule"
          primaryLink={`/brands/${location}/new-location`}
          secondaryLink={`/brands/${brand}/${location}/edit`}
          secondaryText="Star Location"
        />
      </PrivateLayout>
    );
  }
}
