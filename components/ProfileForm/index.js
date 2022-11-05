import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Card } from "../atoms/card";
import { InputText } from "../atoms/inputText";
import { InputTextArea } from "../atoms/inputTextArea";
import { MultiSelectOptions } from "../atoms/multiSelect";
import { toastNotification } from "../atoms/toastNotification";
export function ProfileForm() {
  const { currentUser } = useAuth();
  const [firstName, setFirstName] = useState(currentUser.firstName);
  const [lastName, setLastName] = useState(currentUser.lastName);
  const [slug, setSlug] = useState(currentUser.slug);
  const [bio, setBio] = useState(currentUser.bio ? currentUser.bio : "");
  const [linkedInUrl, setLinkedInUrl] = useState(
    currentUser.linkedInUrl ? currentUser.linkedInUrl : ""
  );
  const [amount, setAmount] = useState(
    currentUser.amount ? currentUser.amount : ""
  );
  const [selectedLanguages, setSelectedLanguages] = useState(
    currentUser.selectedLanguages ? currentUser.selectedLanguages : []
  );
  const [profilePic, setProfilePic] = useState(
    currentUser.profilePic ? currentUser.profilePic : ""
  );
  const [mentorServices, setMentorServices] = useState(
    currentUser.mentorServices ? currentUser.mentorServices : []
  );
  const [serviceInput, setServiceInput] = useState("");
  const languageOptions = ["Hindi", "English"];
  const [serviceDefaults, setServiceDefaults] = useState([
    "Mock Interview",
    "Resume Check",
    "1-on-1 Catch up",
  ]);

  function callSaveProfile(e) {
    e.preventDefault();
    if (isNumeric(amount) === false) {
      toastNotification(
        "Amount can only be a number!",
        "Amount field accepts integers or numbers with max. 2 decimal points",
        "danger"
      );
    } else if (slug === "") {
      toastNotification(
        "Unique URL cannot be empty!",
        "Set a unique URL so that people can find you",
        "danger"
      );
    } else if (firstName === "") {
      toastNotification("First name cannot be empty!", " ", "danger");
    } else if (lastName === "") {
      toastNotification("Last name cannot be empty!", " ", "danger");
    } else {
      // updateUserProfile({
      //   userId: currentUser.id,
      //   firstName: firstName,
      //   lastName: lastName,
      //   slug: slug,
      //   bio: bio,
      //   amount: amount,
      //   linkedInUrl: linkedInUrl,
      //   selectedLanguages: selectedLanguages,
      //   profileForm: true,
      //   profilePic: profilePic === null ? false : profilePic,
      //   mentorServices: mentorServices,
      // });
    }
  }

  function isNumeric(amount) {
    var regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
    if (regex.test(amount)) {
      return true;
    } else {
      return false;
    }
  }

  function uploadFileCheck(e) {
    // uploadUserProfilePic(
    //   e.target.files[0],
    //   currentUser.id,
    //   currentUser.email,
    //   setProfilePic
    // );
  }

  function copyText() {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/book/${currentUser.slug}`
    );
    toastNotification("URL Copied", "", "success");
  }

  function addServiceInput(e) {
    e.preventDefault();
    if (serviceInput) {
      setMentorServices((oldArray) => [...oldArray, serviceInput]);
      setServiceInput("");
    }
  }

  function deleteService(i) {
    setMentorServices((oldArray) => [
      ...oldArray.slice(0, i),
      ...oldArray.slice(i + 1, oldArray.length),
    ]);
  }

  function quickAddService(i) {
    if (serviceDefaults[i]) {
      setMentorServices((oldArray) => [...oldArray, serviceDefaults[i]]);
      setServiceDefaults((oldArray) => [
        ...oldArray.slice(0, i),
        ...oldArray.slice(i + 1, oldArray.length),
      ]);
    }
  }

  return (
    <Card>
      <form className="mt-4 mb-10 p-6 w-2/3 gap-x-6">
        <div className="space-y-6">
          <div className="w-full flex space-x-4 items-start">
            <div className="shrink-0">
              <label className="block text-sm text-neutral-400 sm:mt-px sm:pt-2">
                Photo
              </label>
              <div className="mt-2 flex space-x-2 items-center">
                {!profilePic || profilePic === false ? (
                  <img
                    src="/vectors/avatar.svg"
                    className="w-10 h-10 object-cover rounded-md"
                  />
                ) : (
                  <img
                    src={`${profilePic}&random=+${new Date().getTime()}`}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                )}
                <label className="cursor-pointer h-10 bg-neutral-200 px-5 flex rounded-md">
                  <p className="m-auto text-sm text-neutral-600">
                    Upload Picture
                  </p>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/png, image/jpeg"
                    onInput={(e) => uploadFileCheck(e)}
                  />
                </label>
              </div>
            </div>
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
          <InputTextArea
            id="user-name"
            label="Short bio"
            type="text"
            placeholder="Tell us about yourself"
            value={bio}
            onChangeValue={setBio}
          />
          <div>
            <label className="block text-sm text-neutral-400 sm:mt-px sm:pt-2">
              Mentor Services
            </label>
            {serviceDefaults.length > 0 && (
              <div className="my-3">
                <label className="block text-sm text-neutral-400 sm:mt-px sm:pt-2">
                  Quick Add:
                </label>
                <div className="flex flex-wrap text-xs">
                  {serviceDefaults.map((item, i) => (
                    <div
                      key={i}
                      className="bg-neutral-100 cursor-pointer mr-3 mt-2 rounded-full px-2 h-7 flex text-dark-green"
                      onClick={() => quickAddService(i)}
                    >
                      <p className="m-auto">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="text-sm flex items-centre flex-wrap">
              {mentorServices.map((item, i) => (
                <div
                  key={i}
                  className="bg-neutral-100 mr-3 mt-2 rounded pl-3 pr-2 h-10 flex text-dark-green space-between"
                >
                  <p className="m-auto">{item}</p>
                  <img
                    onClick={() => deleteService(i)}
                    src="/icons/display/close.svg"
                    className="w-5 ml-1 mr-0  my-auto"
                  />
                </div>
              ))}
              <div className="flex mt-2 items-center space-x-3">
                <input
                  placeholder="Add a new service"
                  value={serviceInput}
                  onChange={(e) => setServiceInput(e.target.value)}
                  className="w-40 border border-neutral-100 rounded h-10 px-2"
                />
                <button
                  className="bg-neutral-100 rounded h-10 w-10 shrink-0 flex"
                  onClick={(e) => addServiceInput(e)}
                >
                  <img src="/icons/display/plus.svg" className="m-auto" />
                </button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <label className="block text-sm text-neutral-400 sm:mt-px sm:pt-2">
              Price for 30 minutes
            </label>
            <div className="flex items-center mt-2">
              <input
                className=" sm:text-sm px-3 h-10 border-l border-t border-b border-neutral-100 rounded-l
            appearance-none bg-neutral-50 block placeholder-gray-500 text-neutral-700 focus:outline-none"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="flex px-6 h-10 border-t border-r border-b border-neutral-100 bg-neutral-200 rounded-r">
                <p className="text-dark-green m-auto text-sm ">INR</p>
              </div>
            </div>
          </div>
          <MultiSelectOptions
            id="language-selector"
            label="Languages"
            placeholder="Pick languages"
            options={languageOptions}
            value={selectedLanguages}
            onChangeValue={setSelectedLanguages}
          />

          <InputText
            id="linkedIn"
            label="LinkedIn Url"
            type="text"
            placeholder="http://linkedin.com/in/bruce-wayne"
            value={linkedInUrl}
            onChangeValue={setLinkedInUrl}
            width="full"
          />
        </div>
        <div className="mt-6">
          <button
            className="w-fit py-2 px-4 rounded-md bg-dark-green shadow-sm text-white text-base font-medium inline-flex items-center space-x-4"
            onClick={(e) => callSaveProfile(e)}
          >
            Save Changes
          </button>
        </div>
      </form>
    </Card>
  );
}
