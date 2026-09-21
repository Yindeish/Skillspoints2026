import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "./btn";

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/images/logo.png"
            alt="SkillsPoints Logo"
            width={60}
            height={60}
            priority
            className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </Link>

        {/* Authentication Actions */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Button
            href="/signin"
            variant="outline"
            size="md"
            className="min-w-[120px] sm:min-w-[140px] text-center"
          >
            Log in
          </Button>

          <Button
            href="/signup"
            variant="primary"
            size="md"
            className="min-w-[120px] sm:min-w-[140px] text-center"
          >
            Sign in
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;