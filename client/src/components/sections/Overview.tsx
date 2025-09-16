import React from "react";
import { CheckCircle, Clock, Users } from "lucide-react"; // icons

export default function Overview() {
  return (
    <div className="mt-16 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {/* Card 1 */}
        <div className="border border-amber-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <CheckCircle className="mx-auto text-amber-500 w-10 h-10 mb-3" />
          <h3 className="text-lg font-semibold">Stay Organized</h3>
          <p className="text-sm text-gray-600 mt-2">
            Break tasks into simple steps and keep your workflow smooth.
          </p>
        </div>

        {/* Card 2 */}
        <div className="border border-amber-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <Clock className="mx-auto text-sky-500 w-10 h-10 mb-3" />
          <h3 className="text-lg font-semibold">Save Time</h3>
          <p className="text-sm text-gray-600 mt-2">
            Focus on what matters — let Planora handle the structure.
          </p>
        </div>

        {/* Card 3 */}
        <div className="border border-amber-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
          <Users className="mx-auto text-pink-500 w-10 h-10 mb-3" />
          <h3 className="text-lg font-semibold">Work Together</h3>
          <p className="text-sm text-gray-600 mt-2">
            Collaborate with your team and track progress in real time.
          </p>
        </div>
      </div>
    </div>
  );
}
