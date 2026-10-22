"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Lock, ArrowLeft, Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Temporary UI handler since Formik is not connected yet
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim() && confirmPassword.trim()) {
      setIsSuccess(true);
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

        {!isSuccess ? (
          /* Reset Password Form */
          <form onSubmit={handleSubmit} className="w-full">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-1">
              Reset your password
            </h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              Please enter and confirm your new password.
            </p>

            {/* New Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-900 text-base font-semibold mb-2"
              >
                New password
              </label>

              <div className="relative flex items-center w-full h-[50px] rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus-within:border-[#4788F9] focus-within:ring-2 focus-within:ring-[#4788F9]/20 transition-all overflow-hidden">
                {/* Light blue icon box */}
                <div className="h-full w-12 flex items-center justify-center bg-[#EEF4FF] border-r border-blue-100/60 shrink-0">
                  <Lock className="w-5 h-5 text-[#4788F9]" strokeWidth={2} />
                </div>

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full h-full px-3.5 text-base text-gray-900 placeholder:text-gray-400 bg-transparent outline-none pr-11"
                />

                {/* Show/Hide password toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-5">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-900 text-base font-semibold mb-2"
              >
                Confirm password
              </label>

              <div className="relative flex items-center w-full h-[50px] rounded-xl border border-gray-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus-within:border-[#4788F9] focus-within:ring-2 focus-within:ring-[#4788F9]/20 transition-all overflow-hidden">
                {/* Light blue icon box */}
                <div className="h-full w-12 flex items-center justify-center bg-[#EEF4FF] border-r border-blue-100/60 shrink-0">
                  <Lock className="w-5 h-5 text-[#4788F9]" strokeWidth={2} />
                </div>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full h-full px-3.5 text-base text-gray-900 placeholder:text-gray-400 bg-transparent outline-none pr-11"
                />

                {/* Show/Hide confirm password toggle */}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition p-1"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1.5 pl-1">
                Must be at least 6 characters long.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[50px] rounded-xl bg-[#4788F9] hover:bg-[#3677E8] text-white font-semibold text-base transition-all duration-150 active:scale-[0.99] cursor-pointer shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4788F9]"
            >
              Reset password
            </button>
          </form>
        ) : (
          /* Success Screen Preview */
          <div className="w-full text-center bg-[#F8FAFC] border border-blue-100 rounded-2xl p-6 sm:p-7 shadow-sm">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center text-[#4788F9]">
              <CheckCircle2 className="w-7 h-7 text-[#4788F9]" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Password reset successful!</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Your password has been successfully updated. You can now use your new password to sign in.
            </p>
            <Link
              href="/signin"
              className="flex items-center justify-center w-full h-[50px] rounded-xl bg-[#4788F9] hover:bg-[#3677E8] text-white font-semibold text-base transition-all"
            >
              Sign in now
            </Link>
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
