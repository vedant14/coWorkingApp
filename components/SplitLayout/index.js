import { SEO } from "../SEO";
export function SplitLayout({ title, description, children }) {
  return (
    <>
      <SEO title={title} description={description} />
      <div className="grid md:grid-cols-2">
        <div className="bg-white-700 md:h-screen overflow-hidden">
          <div className="mx-auto my-24 max-w-md w-full">{children}</div>
        </div>
        <div className="bg-dark-green overflow-clip relative  flex">
          <img
            src="/vectors/pattern.svg"
            alt="pattern"
            className="absolute -top-14 left-32 right-auto"
          />
          <img
            style={{ maxWidth: "500px" }}
            src="/vectors/sign-up-image.svg"
            alt="Growth-mate"
            className="m-auto"
          />
          <img
            src="/vectors/pattern.svg"
            alt="pattern"
            className="absolute -bottom-14 right-32 left-auto"
          />
        </div>
      </div>
    </>
  );
}
