"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Temporary UI handler since Formik is not connected yet
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-white px-4 py-8 sm:px-6">
      <div className="w-full max-w-[440px] flex flex-col items-center">
        {/* SP Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/images/Logo.png"
            alt="SkillsPoint Logo"
            width={120}
            height={120}
            priority
            className="h-auto w-24 sm:w-28 object-contain"
          />
        </div>

        {!isSubmitted ? (
          /* Forgot Password Form */
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-gray-900 text-base sm:text-[17px] font-semibold mb-2.5"
              >
                Email address
              </label>

              {/* Styled Input Container with Light Blue Left Icon Inset */}
              <div className="relative flex items-center w-full h-[50px] rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus-within:border-[#4788F9] focus-within:ring-2 focus-within:ring-[#4788F9]/20 transition-all overflow-hidden">
                {/* Light blue icon box matching design */}
                <div className="h-full w-12 flex items-center justify-center bg-[#EEF4FF] border-r border-blue-100/60 shrink-0">
                  <Mail className="w-5 h-5 text-[#4788F9]" strokeWidth={2} />
                </div>

                {/* Input field */}
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-full px-3.5 text-base text-gray-900 placeholder:text-gray-400 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[50px] rounded-xl bg-[#4788F9] hover:bg-[#3677E8] text-white font-semibold text-base transition-all duration-150 active:scale-[0.99] cursor-pointer shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4788F9]"
            >
              Send reset link
            </button>
          </form>
        ) : (
          /* Confirmation / Success Preview State */
          <div className="w-full text-center bg-[#F8FAFC] border border-blue-100 rounded-2xl p-6 sm:p-7 shadow-sm">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center text-[#4788F9]">
              <CheckCircle2 className="w-7 h-7 text-[#4788F9]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Check your email</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              We’ve sent a password reset link to{" "}
              <span className="font-semibold text-gray-900">{email}</span>. Please check your inbox or spam folder.
            </p>
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="w-full h-11 rounded-xl bg-[#4788F9] hover:bg-[#3677E8] text-white font-medium text-sm transition"
              >
                Resend link or change email
              </button>
            </div>
          </div>
        )}

        {/* Back to sign in link */}
        <div className="mt-8">
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-gray-900 hover:text-[#4788F9] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" strokeWidth={2.2} />
            <span>Back to sign in</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
