import React from "react";
import StepCard, { StepCardProps } from "./step-card";

const stepsData: StepCardProps[] = [
  {
    iconSrc: "/images/icon-learn.png",
    iconAlt: "Learn Icon",
    title: "Learn",
    description: "Explore short courses created by your colleagues.",
  },
  {
    iconSrc: "/images/icon-share.png",
    iconAlt: "Share Icon",
    title: "Share",
    description: "Create a micro-course and share your expertise.",
  },
  {
    iconSrc: "/images/icon-rewards.png",
    iconAlt: "Earn Rewards Icon",
    title: "Earn rewards",
    description: "Complete courses, earn points, and unlock rewards.",
  },
];

export const StepsSection: React.FC = () => {
  return (
    <section className="w-full my-12 sm:my-16">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 text-center tracking-tight mb-8 sm:mb-12">
        One platform. Three simple steps.
      </h2>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6">
        {stepsData.map((step) => (
          <StepCard key={step.title} {...step} />
        ))}
      </div>
    </section>
  );
};

export default StepsSection;
