import { useState } from "react";
import Link from "next/link";
import { userLoginEmail } from "../utils/supabaseUserRequests";
import { SplitLayout } from "../components";
import { InputText } from "../components/atoms/inputText";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { GradientButton } from "../components/atoms/gradientButton";
export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { uniqueId } = useAuth();
  const router = useRouter();
  async function userLogin(e) {
    e.preventDefault();
    if (userEmail === "" || password === "") {
      setError("Please fill all the fields");
    } else {
      userLoginEmail(userEmail, password, function (response) {});
    }
  }
  if (uniqueId) {
    router.push("/dashboard");
  }
  return (
    <SplitLayout title="Login">
      <div>
        <img src="/logo.svg" />
        <h2 className="mt-16 text-3xl font-extrabold text-gray-900">Sign in</h2>
        <p className="mt-6 text-base font-normal">Lifetime free only for you</p>
        <p className="mt-3 text-red-600">{error}</p>
      </div>
      <form className="mt-4 space-y-6">
        <div className="rounded-md  -space-y-px">
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
        </div>
        <div className="text-sm text-right">
          <Link href="/forgot-password" passHref>
            <a className="text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </Link>
        </div>
        <GradientButton label="Sign In" onClickFunction={userLogin} />
        <div className="text-center">
          <Link href="/signup" passHref>
            <a className="font-medium text-black underline text-center hover:text-slate-700">
              Don’t have an account? Get Started
            </a>
          </Link>
        </div>
      </form>
    </SplitLayout>
  );
}
