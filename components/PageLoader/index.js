import { useEffect } from "react";
import { useRouter } from "next/router";
import { TailSpin } from "react-loader-spinner";

export function PageLoader() {
  const router = useRouter();
  useEffect(() => {
    const timeId = setTimeout(() => {
      router.push("/");
    }, 5000);
    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <div className="absolute flex slate-100 w-screen h-screen">
      <div className="m-auto">
        <TailSpin ariaLabel="loading-indicator" color="#B1E5FC" />
      </div>
    </div>
  );
}
