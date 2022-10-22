import { PrivateLayout, ProfileForm } from "../components";
export default function Profile() {
  return (
    <PrivateLayout>
      <p className="text-2xl text-dark-green font-semibold">Profile Details</p>
      <ProfileForm />
    </PrivateLayout>
  );
}
