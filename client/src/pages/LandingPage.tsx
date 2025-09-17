import React from "react";
import Navbar from "../components/layout/Navbar";
import Overview from "../components/sections/Overview";
import TrustedBy from "../components/sections/TrustedBy";
import Features from "../components/sections/Features";
import PricingPlan from "../components/sections/PricingPlan";
import Reviews from "../components/sections/Reviews";
import Footer from "../components/sections/Footer";

export default function HeroSection() {
  return (
    <div>
      <Navbar />
      <div
        id="Home"
        className="mt-24 flex flex-col justify-center items-center gap-3 text-center px-4 "
      >
        {/* Headline */}
        <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-slate-900">
          Need more focus?
        </h1>
        <h2 className="font-heading text-4xl md:text-5xl font-bold leading-tight text-slate-900">
          Planora keeps you on track.
        </h2>

        {/* Small text */}
        <p className="font-body text-base md:text-lg text-gray-600 max-w-2xl">
          From personal to team projects, Planora makes managing work effortless
          — stay productive, stay organized, stay ahead.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="px-6 py-3 bg-amber-300 text-black font-medium rounded-full shadow cursor-pointer hover:bg-amber-400transition hover:bg-amber-400">
            Start for Free
          </button>
          <button className="px-6 py-3 bg-slate-800 text-white font-medium rounded-full hover:bg-slate-900 cursor-pointer   transition">
            Explore Features
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Overview />
        <TrustedBy />
        <Features />
        <PricingPlan />
        <Reviews />
        <Footer />
      </div>
    </div>
  );
}
