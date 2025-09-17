import React from "react";

export default function PricingPlan() {
  const plans = [
    {
      name: "Essential",
      price: "$9/mo",
      tagline: "Perfect for freelancers",
      features: [
        "Unlimited tasks & projects",
        "Basic collaboration tools",
        "Email support",
        "Access on all devices",
      ],
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$19/mo",
      tagline: "Best for small teams",
      features: [
        "Everything in Essential",
        "Advanced collaboration",
        "File sharing & attachments",
        "Priority support",
      ],
      highlighted: true, // highlight middle plan
    },
    {
      name: "Team",
      price: "$49/mo",
      tagline: "For growing companies",
      features: [
        "Everything in Pro",
        "Team analytics",
        "Custom integrations",
        "Dedicated support",
      ],
      highlighted: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="mt-15  py-4 px-6 md:px-12 lg:px-24 w-[88%]"
    >
      {/* Section Heading */}
      <div className="text-center mb-12">
        <p className="inline-block px-4 py-2 mb-4 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
          Pricing
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Flexible plans for every team size
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Whether you’re freelancing solo or running a growing team, Planora has
          the right plan for you.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`flex flex-col p-6 rounded-2xl shadow-sm border transition hover:shadow-md ${
              plan.highlighted
                ? "border-violet-500 bg-violet-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <p className="text-sm font-medium text-gray-500">{plan.name}</p>
            <h1 className="text-3xl font-bold mt-2">{plan.price}</h1>
            <p className="text-gray-600 mb-6">{plan.tagline}</p>

            {/* Features */}
            <ul className="flex-1 space-y-3 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  ✅ <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-2 rounded-lg font-medium transition ${
                plan.highlighted
                  ? "bg-violet-600 text-white hover:bg-violet-700"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
