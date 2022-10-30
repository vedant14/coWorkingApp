import { BrandDetailsSection } from "./brandDetails";
import { CreateSlug } from "./createSlug";
import { LocationList } from "./locationList";
import { UserList } from "./userList";
export function BrandInfoPage({ brandData }) {
  return (
    <div>
      <div className="max-w-3xl mx-auto lg:max-w-7xl">
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <BrandDetailsSection brandData={brandData} />
            <CreateSlug brandData={brandData} />
          </div>
          <div>
            <LocationList
              brandId={brandData.id}
              locationData={brandData.locations}
            />
            <UserList userData={brandData.brand_users} />
          </div>
        </div>
      </div>
    </div>
  );
}
