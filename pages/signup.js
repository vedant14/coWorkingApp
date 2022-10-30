import { useState } from "react";
import { SplitLayout } from "../components";
import { userSignUpEmail } from "../utils/supabaseUserRequests";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { InputText } from "../components/atoms/inputText";
import { GradientButton } from "../components/atoms/gradientButton";
export default function SignUp() {
  const [userEmail, setUserEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const router = useRouter();
  async function callUserSignup(e) {
    e.preventDefault();
    if (
      userEmail === "" ||
      firstName === "" ||
      lastName === "" ||
      password === ""
    ) {
      setError("Please fill all the fields");
    } else {
      userSignUpEmail(
        firstName.trim(),
        lastName.trim(),
        userEmail.trim(),
        password,
        function (response) {}
      );
    }
  }
  if (currentUser) {
    router.push("/dashboard");
  }
  return (
    <SplitLayout title="Sign-Up">
      <div>
        <img src="/logo.svg" />
        <h2 className="mt-16 text-3xl font-extrabold text-gray-900">
          Create Account
        </h2>
        <p className="mt-6 text-base font-normal">Lifetime free only for you</p>
        <p className="mt-3 text-red-600">{error}</p>
      </div>
      <form className="mt-4 space-y-6">
        <div className="w-full flex space-x-2">
          <InputText
            id="user-name"
            label="First Name"
            type="text"
            placeholder="First name"
            value={firstName}
            onChangeValue={setFirstName}
            width="full"
          />
          <InputText
            id="user-name"
            label="Last Name"
            type="text"
            placeholder="Enter your name"
            value={lastName}
            onChangeValue={setLastName}
            width="full"
          />
        </div>
        <InputText
          id="email-id"
          label="Email"
          type="email"
          placeholder="Your email address"
          value={userEmail}
          onChangeValue={setUserEmail}
          width="full"
        />
        <InputText
          id="password"
          label="Password"
          type="password"
          placeholder="Create a secure password"
          value={password}
          onChangeValue={setPassword}
          width="full"
        />

        <GradientButton label="Get Started" onClickFunction={callUserSignup} />
        <div className="text-center">
          <Link href="/login" passHref>
            <a className="font-medium text-black underline text-center hover:text-slate-700">
              Already registered? Log in
            </a>
          </Link>
        </div>
      </form>
    </SplitLayout>
  );
}
