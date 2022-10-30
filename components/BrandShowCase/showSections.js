import { LocationMarkerIcon, StarIcon } from "@heroicons/react/solid";
import { classNames } from "../../utils/helperFunctions";
import { Fragment } from "react";
import { Tab } from "@headlessui/react";
const license = {
  href: "#",
  summary:
    "For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.",
  content: `
      <h4>Overview</h4>
      
      <p>For personal and professional use. You cannot resell or redistribute these icons in their original or modified state.</p>
      
      <ul role="list">
      <li>You\'re allowed to use the icons in unlimited projects.</li>
      <li>Attribution is not required to use the icons.</li>
      </ul>
      
      <h4>What you can do with it</h4>
      
      <ul role="list">
      <li>Use them freely in your personal and professional work.</li>
      <li>Make them your own. Change the colors to suit your project or brand.</li>
      </ul>
      
      <h4>What you can\'t do with it</h4>
      
      <ul role="list">
      <li>Don\'t be greedy. Selling or distributing these icons in their original or modified state is prohibited.</li>
      <li>Don\'t be evil. These icons cannot be used on websites or applications that promote illegal or immoral beliefs or activities.</li>
      </ul>
    `,
};
const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
          <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
        `,
      date: "July 16, 2021",
      datetime: "2021-07-16",
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
          <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
        `,
      date: "July 12, 2021",
      datetime: "2021-07-12",
      author: "Hector Gibbons",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};
const faqs = [
  {
    question: "What format are these icons?",
    answer:
      "The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.",
  },
  {
    question: "Can I use the icons at different sizes?",
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
  },
  // More FAQs...
];
const tabs = ["About Us", "Reviews", "FAQs"];
export function ShowSections() {
  return (
    <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
      <Tab.Group as="div">
        <div className="border-b border-gray-200">
          <Tab.List className="-mb-px flex space-x-8">
            {tabs.map((tabItem, i) => (
              <Tab
                key={i}
                className={({ selected }) =>
                  classNames(
                    selected
                      ? "border-dark-green text-dark-green"
                      : "border-transparent text-gray-700 hover:text-gray-800 hover:border-light-green",
                    "whitespace-nowrap py-6 border-b-2 font-medium text-sm"
                  )
                }
              >
                {tabItem}
              </Tab>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels as={Fragment}>
          <Tab.Panel className="pt-10">
            <h3 className="sr-only">License</h3>

            <div
              className="prose prose-sm max-w-none text-gray-500"
              dangerouslySetInnerHTML={{ __html: license.content }}
            />
          </Tab.Panel>
          <Tab.Panel className="-mb-10">
            <h3 className="sr-only">Customer Reviews</h3>

            {reviews.featured.map((review, reviewIdx) => (
              <div
                key={review.id}
                className="flex text-sm text-gray-500 space-x-4"
              >
                <div className="flex-none py-10">
                  <img
                    src={review.avatarSrc}
                    alt=""
                    className="w-10 h-10 bg-gray-100 rounded-full"
                  />
                </div>
                <div
                  className={classNames(
                    reviewIdx === 0 ? "" : "border-t border-gray-200",
                    "py-10"
                  )}
                >
                  <h3 className="font-medium text-gray-900">{review.author}</h3>
                  <p>
                    <time dateTime={review.datetime}>{review.date}</time>
                  </p>

                  <div className="flex items-center mt-4">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          review.rating > rating
                            ? "text-yellow-400"
                            : "text-gray-300",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{review.rating} out of 5 stars</p>

                  <div
                    className="mt-4 prose prose-sm max-w-none text-gray-500"
                    dangerouslySetInnerHTML={{ __html: review.content }}
                  />
                </div>
              </div>
            ))}
          </Tab.Panel>

          <Tab.Panel as="dl" className="text-sm text-gray-500">
            <h3 className="sr-only">Frequently Asked Questions</h3>

            {faqs.map((faq) => (
              <Fragment key={faq.question}>
                <dt className="mt-10 font-medium text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 prose prose-sm max-w-none text-gray-500">
                  <p>{faq.answer}</p>
                </dd>
              </Fragment>
            ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
