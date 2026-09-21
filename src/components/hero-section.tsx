import React from "react";
import Image from "next/image";
import Button from "./btn";
import { ArrowRight } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="w-full">
      <div className="bg-[#EEF5FD] rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#E1EDFA] relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Learn . Share .Grow
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl">
              SkillsPoints is an internal micro-learning platform where employees
              share knowledge, learn new skills, and earn rewards.
            </p>

            {/* Buttons with subtle indicator arrows underneath */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              {/* Get Started Button */}
              <div className="flex flex-col items-center">
                <Button
                  href="/signup"
                  variant="primary"
                  size="md"
                  className="w-40 sm:w-48 py-3 text-base shadow-sm"
                >
                  Get started
                </Button>
                <span className="text-blue-300 text-sm mt-1 select-none flex items-center justify-center opacity-60">
                  <ArrowRight className="w-4 h-4 text-blue-300" />
                </span>
              </div>

              {/* Log In Button */}
              <div className="flex flex-col items-center">
                <Button
                  href="/signin"
                  variant="outline"
                  size="md"
                  className="w-40 sm:w-48 py-3 text-base"
                >
                  Log in
                </Button>
                <span className="text-blue-300 text-sm mt-1 select-none flex items-center justify-center opacity-60">
                  <ArrowRight className="w-4 h-4 text-blue-300" />
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Illustration Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-lg bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100/80 flex items-center justify-center">
              <Image
                src="/images/hero-illustration.png"
                alt="Colleagues learning and sharing together on SkillsPoints"
                width={700}
                height={460}
                priority
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
