import { useState } from "react";
import { BookingContainer } from "../atoms/bookingContainer";
import { BrandButton } from "../atoms/brandButton";
import { ConfirmationButton } from "./confirmationButton";
export function BrandShowCase({ slug, bookingData }) {
  const [open, setOpen] = useState(false);
  const button = [
    {
      text: "About Us",
      link: "book",
    },
    {
      text: "Reviews",
      link: "book",
    },
    {
      text: "FAQs",
      link: "book",
    },
    {
      text: "Photo gallery",
      link: "book",
    },
    {
      text: "Events",
      link: "book",
    },
  ];

  return (
    <div className="bg-amber-300 min-h-screen">
      <BookingContainer>
        <div className="mx-auto py-24 px-12">
          <div id="logo">
            <img
              src="https://images.unsplash.com/photo-1545231027-637d2f6210f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
              alt="Logo"
              className="rounded-full h-32 w-32 object-center object-cover mx-auto"
            />
          </div>
          <div className="my-4">
            <p className="text-xl font-bold text-white text-center">
              {bookingData.name}
            </p>
            <span className="flex space-x-4 mx-auto w-fit my-4">
              <img src="/icons/social/instagram.svg" />
              <img src="/icons/social/twitter.svg" />
            </span>
          </div>
          <div className="mt-10 space-y-8">
            <ConfirmationButton
              open={open}
              setOpen={setOpen}
              slug={slug}
              locationData={bookingData.locations}
            />
            {open === false && (
              <>
                {button.map((item, i) => (
                  <BrandButton key={i} text={item.text} link={item.link} />
                ))}
              </>
            )}
          </div>
        </div>
      </BookingContainer>
    </div>
  );
}
