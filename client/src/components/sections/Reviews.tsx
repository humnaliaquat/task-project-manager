import React from "react";

const reviews = [
  {
    id: 1,
    name: "Aisha Khan",
    title: "Product Manager — Nova Labs",
    avatarBg: "bg-emerald-500",
    rating: 5,
    text: "Planora completely changed how our team plans sprints. Tasks are clear, priorities are visible, and our delivery speed improved noticeably.",
  },
  {
    id: 2,
    name: "Omar Rizvi",
    title: "Freelance Designer",
    avatarBg: "bg-pink-500",
    rating: 5,
    text: "I switched to Planora from a dozen scattered tools — now I manage client work, deadlines, and feedback all in one place. Super intuitive.",
  },
  {
    id: 3,
    name: "Leah Park",
    title: "Engineering Lead — BrightApps",
    avatarBg: "bg-indigo-500",
    rating: 4,
    text: "The project boards and progress views keep our team aligned. The interface is clean and fast — exactly what we needed.",
  },
  {
    id: 4,
    name: "Daniel Cruz",
    title: "Operations Manager",
    avatarBg: "bg-sky-500",
    rating: 5,
    text: "Assigning tasks and tracking completion is a breeze. Planora reduced our meeting time and helped us focus on actual work.",
  },
];

export default function Reviews() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-white">
      <div className="max-w-6xl mx-auto text-center mb-10 flex flex-col justify-center items-center">
        <p className="inline-block px-4 py-2 mb-4 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">
          Loved by teams who get things done
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Real feedback from users who improved their workflows with Planora.
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {reviews.map((r) => (
          <blockquote
            key={r.id}
            className="flex flex-col justify-between bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full text-white ${r.avatarBg}`}
                >
                  {/* initials */}
                  <span className="font-semibold">
                    {r.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">{r.name}</p>
                  <p className="text-sm text-gray-500">{r.title}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-4">“{r.text}”</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={i < r.rating ? "currentColor" : "none"}
                    stroke="currentColor"
                    className={`w-4 h-4 ${
                      i < r.rating ? "text-amber-400" : "text-gray-300"
                    }`}
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0L5.18 17.96c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L1.183 8.2c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.97z" />
                  </svg>
                ))}
              </div>

              <span className="text-sm text-gray-500">Verified user</span>
            </div>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
