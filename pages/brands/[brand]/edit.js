import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  CreateCoworking,
  NoDataPage,
  PageHeading,
  PageLoader,
  PrivateLayout,
} from "../../../components";

export default function Edit() {
  const router = useRouter();
  const [brandData, setBrandData] = useState(null);
  const { brand } = router.query;
  useEffect(() => {
    if (brand) {
      // getBrandDetails(brand, setBrandData);
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
        name: "All Brands",
        link: "/brands",
      },
      {
        name: brandData.name,
        link: `/brands/${brand}`,
      },
    ];
    return (
      <PrivateLayout>
        <PageHeading name="Edit" breadcrumbs={breadCrumbsData} />
        <CreateCoworking brandId={brand} brandData={brandData} />
      </PrivateLayout>
    );
  }
}
