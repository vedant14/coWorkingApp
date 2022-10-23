import { PageHeading, PrivateLayout, ProfileForm } from "../components";
export default function Profile() {
  return (
    <PrivateLayout>
      <PageHeading name="Profile Details" />
      <ProfileForm />
    </PrivateLayout>
  );
}
