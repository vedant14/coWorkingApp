export function MentorIntro({ mentorData }) {
  return (
    <div className="grid grid-cols-8 gap-1">
      <div className="col-span-2">
        {!mentorData[0].profilePic || mentorData[0].profilePic === false ? (
          <img src="/vectors/avatar.svg" alt={mentorData[0].slug} />
        ) : (
          <img
            src={`${mentorData[0].profilePic}&random=+${new Date().getTime()}`}
            className="w-40 h-40 object-cover rounded-full"
          />
        )}
      </div>
      <div className="col-span-6 text-dark-green">
        <p className="font-semibold text-xl mb-2">
          {mentorData[0].firstName} {mentorData[0].lastName}
        </p>
        <p className="text-sm my-2 text-neutral-400">{mentorData[0].bio}</p>
        {mentorData[0].linkedInUrl && (
          <a
            href={mentorData[0].linkedInUrl}
            className="text-base bg-neutral-100 w-fit text-dark-green flex items-center py-2 px-4 my-5 rounded space-x-2  "
            target="_blank"
          >
            <div>
              <span>Connect on Linkedin</span>
            </div>
            <div className="shrink-0">
              <img src="/icons/social/linkedIn.svg" alt="LinkedIn" />
            </div>
          </a>
        )}
        <div className="flex items-center">
          <p className="text-sm text-neutral-500">Speaks:</p>
          {mentorData[0].selectedLanguages?.map((language, i) => (
            <p
              className="text-xs text-neutral-500 bg-neutral-100 py-1.5 px-3 rounded-lg ml-2"
              key={i}
            >
              {language}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
