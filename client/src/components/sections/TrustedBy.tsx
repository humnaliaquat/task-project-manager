import React from "react";

export default function TrustedBy() {
  const categories = [
    "Tech Startups",
    "Agencies",
    "Freelancers",
    "Product Teams",
  ];

  return (
    <section className="bg-orange-50 mt-16 py-8 px-6 md:px-12 lg:px-24 text-center w-[88%] rounded-3xl">
      <h2 className="text-sm md:text-base font-medium text-slate-800 mb-8">
        Trusted by teams and individuals around the world
      </h2>
      <div className="flex flex-wrap justify-center gap-6 md:gap-12">
        {categories.map((item, index) => (
          <div
            key={index}
            className="text-lg font-medium bg-white text-gray-700  px-6 py-3 rounded-full shadow-sm hover:shadow-md transition"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
