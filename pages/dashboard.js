import React from "react";
import { useRouter } from "next/router";
import { PageHeading, PrivateLayout } from "../components";
import { userSignOut } from "../utils/supabaseUserRequests";
export default function Dashboard() {
  const router = useRouter();
  function callSignOut() {
    userSignOut(function (response) {
      if (response === true) {
        router.push("/");
      }
    });
  }
  return (
    <PrivateLayout>
      <PageHeading name="Welcome Vedant" />
      <button onClick={(e) => callSignOut()}>Logout</button>
    </PrivateLayout>
  );
}
