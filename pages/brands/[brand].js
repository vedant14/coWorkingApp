import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PageLoader, PrivateLayout } from "../../components";
import { getBrandDetails } from "../../utils/firebaseGetRequest";

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
    return <NoMentorPage />;
  } else if (!brandData) {
    return <PageLoader />;
  } else {
    return <ShowMentorPage />;
  }

  function NoMentorPage() {
    return (
      <PrivateLayout>
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-4 text-dark-green">
            <p className="font-semibold text-3xl mb-2">404</p>
            <p>Uh ho, we could not find the page you were looking for</p>
            <button className="w-fit mt-4 py-3 px-4 rounded-md bg-dark-green shadow-sm text-white text-base font-medium inline-flex items-center space-x-4">
              Find more mentors
            </button>
          </div>
        </div>
      </PrivateLayout>
    );
  }

  function ShowMentorPage() {
    return (
      <PrivateLayout>
        <div>{brandData.name}</div>
        <div>Add Locations</div>
      </PrivateLayout>
    );
  }
}
