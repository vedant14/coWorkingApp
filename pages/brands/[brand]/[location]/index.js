import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  CreateSlug,
  NoDataPage,
  PageHeading,
  PageLoader,
  PrivateLayout,
  UserList,
} from "../../../../components";
import { getLocationName } from "../../../../utils/firebaseGetRequests";

export default function BrandPage() {
  const router = useRouter();
  const [locationData, setLocationData] = useState("");
  const { location } = router.query;
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
    return <ShowBrandPage />;
  }

  function ShowBrandPage() {
    const breadCrumbsData = [
      {
        name: "All brands",
        link: "/brands",
      },
      {
        name: `${locationData.brandName}`,
        link: `/brands/${locationData.brandId}`,
      },
    ];
    return (
      <PrivateLayout>
        <PageHeading
          name={locationData.name}
          breadcrumbs={breadCrumbsData}
          primaryText="Add Schedule"
          primaryLink={`/brands/${location}/new-location`}
          secondaryLink={`/brands/${locationData.brandId}/${location}/edit`}
          secondaryText="Star Location"
        />
        <CreateSlug locationData={locationData} />
        <UserList />
      </PrivateLayout>
    );
  }
}
