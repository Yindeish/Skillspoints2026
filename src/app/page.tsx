import React from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import StepsSection from "@/components/steps-section";
import CtaBanner from "@/components/cta-banner";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-4">
        {/* Hero Section */}
        <HeroSection />

        {/* 3 Steps Section */}
        <StepsSection />

        {/* CTA Section */}
        <CtaBanner />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
