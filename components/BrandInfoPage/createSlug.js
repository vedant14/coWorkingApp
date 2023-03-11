import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toastNotification } from "../atoms/toastNotification";
import { Card } from "../atoms/card";
import { updateSlug } from "../../utils/supabasePostRequests";

export function CreateSlug({ brandData }) {
  const { currentUser } = useAuth();
  const [updated, setUpdated] = useState(false);
  const [slugData, setSlugData] = useState(
    brandData.slug ? brandData.slug : ""
  );

  function copyText() {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/book/${slugData}`
    );
    toastNotification("URL Copied", "", "success");
  }

  function callSaveSlug(e) {
    e.preventDefault();
    updateSlug(currentUser.id, brandData.id, slugData, function (fetchedData) {
      if (fetchedData !== true) {
        toastNotification("URL is wrong", fetchedData.message, "danger");
      } else {
        toastNotification("URL is updated!", fetchedData.message, "success");
        setUpdated(true);
      }
    });
  }

  return (
    <Card>
      <div className="py-5 lg:mt-0 mt-6 px-6">
        <div className="flex items-center space-x-2">
          <div className="shrink-0 cursor-pointer" onClick={copyText}>
            <img src="/icons/display/link-blue.svg" alt="link" />
          </div>
          <div className="font-bold text-neutral-700">Edit your Custom URL</div>
        </div>
        <div className="text-sm text-neutral-500 mt-2">
          Personalize the URL for this location
        </div>
        <div className="my-3">
          <div className="flex rounded-md">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
              {`${process.env.NEXT_PUBLIC_URL}/book/`}
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
            {updated === true ? (
              <div>Refresh the page</div>
            ) : (
              <>
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
                    href={`${process.env.NEXT_PUBLIC_URL}/book/${brandData.slug}`}
                    target="_blank"
                  >
                    Open URL
                  </a>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
