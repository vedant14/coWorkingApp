import { TailSpin } from "react-loader-spinner";

export function PageLoaderSpinner({ loader }) {
  if (loader === true) {
    return (
      <div className="fixed z-50 flex left-0 top-0 min-h-screen w-full bg-dark-green opacity-40">
        <div className="m-auto">
          <TailSpin ariaLabel="loading-indicator" color="#B1E5FC" />;
        </div>
      </div>
    );
  } else {
    return null;
  }
}
