import React, { useState, useEffect } from "react";
import { Layout } from "../components";
import Link from "next/link";
import { signOutUser } from "../utils/firebaseUserRequests";

export default function Home() {
  const [error, setError] = useState(null);
  function logout() {
    signOutUser();
  }

  // function googleAuth() {
  //   signInWithGoogle();
  // }

  // useEffect(() => {
  //   getGoogleAuthResults(setError);
  // }, []);
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Link href="/signup">Signup</Link>
      <Link href="/login">Login</Link>
      {/* <button onClick={googleAuth}> Google Auth</button> */}
      <button onClick={logout}>Logout</button>
    </Layout>
  );
}
