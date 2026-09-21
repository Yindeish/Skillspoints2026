import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#1D3A8A] text-white py-8 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        {/* Brand / Logo */}
        <div className="flex items-center">
          <Link href="/" className="inline-block">
            <Image
              src="/images/footer-logo.png"
              alt="SkillsPoints"
              width={220}
              height={50}
              className="h-10 w-auto object-contain brightness-100"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-sm font-medium text-blue-100/90">
          <Link
            href="/"
            className="hover:text-white transition-colors duration-150"
          >
            Home
          </Link>
          <Link
            href="/courses"
            className="hover:text-white transition-colors duration-150"
          >
            Micro-courses
          </Link>
          <Link
            href="/learning"
            className="hover:text-white transition-colors duration-150"
          >
            My learning
          </Link>
          <Link
            href="/rewards"
            className="hover:text-white transition-colors duration-150"
          >
            Reward
          </Link>
        </nav>

        {/* Copyright notice */}
        <div className="text-xs sm:text-sm text-blue-200/75 text-center md:text-right">
          © 2026 SkillsPoints. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
