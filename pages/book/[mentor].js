import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  BookingLayout,
  MentorIntro,
  ServiceList,
  BookingPage,
  PageLoader,
} from "../../components";
import { getMentorPublicDetails } from "../../utils/firebasePublicDataRequests";
export default function MentorPage() {
  const router = useRouter();
  const [mentorData, setMentorData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const { mentor } = router.query;
  useEffect(() => {
    if (mentor) {
      getMentorPublicDetails(mentor, setMentorData);
    }
  }, [mentor]);

  if (mentorData === false) {
    return <NoMentorPage />;
  } else if (!mentorData) {
    return <PageLoader />;
  } else {
    return <ShowMentorPage />;
  }

  function NoMentorPage() {
    return (
      <BookingLayout>
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-4 text-dark-green">
            <p className="font-semibold text-3xl mb-2">404</p>
            <p>Uh ho, we could not find the page you were looking for</p>
            <button className="w-fit mt-4 py-3 px-4 rounded-md bg-dark-green shadow-sm text-white text-base font-medium inline-flex items-center space-x-4">
              Find more mentors
            </button>
          </div>
        </div>
      </BookingLayout>
    );
  }

  function ShowMentorPage() {
    return (
      <BookingLayout>
        <MentorIntro mentorData={mentorData} />
        {currentStep === 0 && (
          <ServiceList
            mentorData={mentorData}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 1 && <BookingPage mentorData={mentorData} />}
      </BookingLayout>
    );
  }
}
