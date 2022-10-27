import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateLocationSlug } from "../../utils/firebasePostRequests";
import { toastNotification } from "../atoms/toastNotification";

export function CreateSlug({ locationData }) {
  const { uniqueId } = useAuth();
  const [slugData, setSlugData] = useState(
    locationData.slug ? locationData.slug : null
  );

  function copyText() {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/book/${slugData}`
    );
    toastNotification("URL Copied", "", "success");
  }

  function callSaveSlug(e) {
    e.preventDefault();
    updateLocationSlug(
      uniqueId,
      locationData.id,
      slugData,
      function (fetchedData) {
        if (fetchedData.success === false) {
          toastNotification("URL is wrong", fetchedData.message, "danger");
        } else {
          toastNotification("URL is working", fetchedData.message, "success");
        }
      }
    );
  }

  return (
    <form>
      <div className="lg:mt-0 mt-6 pr-4">
        <div className="bg-neutral-50 border border-neutral-100 p-4 rounded">
          <div className="flex items-center space-x-2">
            <div className="shrink-0 cursor-pointer" onClick={copyText}>
              <img src="/icons/display/link-blue.svg" alt="link" />
            </div>
            <div className="font-bold text-neutral-700">
              Edit your Custom URL
            </div>
          </div>
          <div className="text-sm text-neutral-500 mt-2">
            Personalize the URL for this location
          </div>

          <div className="my-3">
            <div className="flex rounded-md">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                {`www.${process.env.NEXT_PUBLIC_URL}/book/`}
              </span>
              <input
                id="slug"
                type="text"
                className="min-w-0 block w-1/4 px-3 py-2 rounded-r-md focus:outline-none sm:text-sm border border-gray-300"
                placeholder="asterisk-nagpur"
                onChange={(e) => setSlugData(e.target.value)}
                value={slugData}
              />

              <button
                className="inline-flex mx-3 items-center px-5 bg-dark-green rounded-md border border-l-0 border-gray-300 text-light-green sm:text-sm"
                onClick={(e) => callSaveSlug(e)}
              >
                Save Link
              </button>
            </div>
            <div className="my-2">
              <span
                className="italic text-sm font-medium text-gray-700 cursor-pointer underline"
                onClick={(e) => copyText()}
              >
                Copy URL
              </span>
              <span> / </span>
              <span
                className="italic text-sm font-medium text-gray-700 cursor-pointer underline"
                onClick={(e) => copyText()}
              >
                <a
                  href={`${process.env.NEXT_PUBLIC_URL}/book/${locationData.slug}`}
                  target="_blank"
                >
                  Open URL
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
