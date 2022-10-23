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
import { getBrandDetails } from "../../../utils/firebaseGetRequests";

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
        <div className="bg-white py-5">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Brand Locations
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            All the users of this brand - these do not include location users
          </p>
        </div>
        <div className="bg-white shadow overflow-hidden mb-4 sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            <LocationList brandId={brand} />
          </ul>
        </div>
        <UserList />
      </PrivateLayout>
    );
  }
}
