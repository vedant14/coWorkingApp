import { useEffect, useState } from "react";
import {
  OfflineForm,
  PageHeading,
  PageLoader,
  PrivateLayout,
} from "../../components";
import { useAuth } from "../../context/AuthContext";
import { getAdminBrandData } from "../../utils/supabaseGetRequests";

export default function OfflineBooking() {
  const { currentUser } = useAuth();
  const [brandData, setBrandData] = useState(null);
  useEffect(() => {
    if (currentUser) {
      getAdminBrandData(currentUser.id, function (data) {
        setBrandData(
          data.map((item) => ({
            ...item.brands,
            id: item.brands.id,
          }))
        );
      });
    }
  }, [currentUser]);

  if (brandData === false) {
    return <NoBrands />;
  } else if (!brandData) {
    return <PageLoader />;
  } else {
    return <OfflineFormRender />;
  }

  function NoBrands() {
    return <div>No Brands</div>;
  }
  function OfflineFormRender() {
    const breadCrumbs = [
      {
        name: "All Bookings",
        link: "/bookings",
      },
    ];
    return (
      <PrivateLayout>
        <PageHeading
          name="Create offline booking"
          subtext="Cash payments/etc."
          breadcrumbs={breadCrumbs}
        />
        <OfflineForm brandData={brandData} />
      </PrivateLayout>
    );
  }
}
