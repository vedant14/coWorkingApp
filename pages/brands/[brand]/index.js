import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  LocationList,
  NoDataPage,
  PageHeading,
  PageLoader,
  PrivateLayout,
  UserList,
} from "../../../components";
import { getBrandDetails } from "../../../utils/firebaseGetRequest";

export default function BrandPage() {
  const router = useRouter();
  const [brandData, setBrandData] = useState(null);
  const { brand } = router.query;
  useEffect(() => {
    if (brand) {
      getBrandDetails(brand, setBrandData);
    }
  }, [brand]);

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
          breadcrumbs={breadCrumbsData}
          primaryText="New Location"
          primaryLink={`/brands/${brand}/new-location`}
          secondaryLink={`/brands/${brand}/edit`}
          secondaryText="Edit Brand"
        />
        <LocationList brandId={brand} />
        <UserList />
      </PrivateLayout>
    );
  }
}
