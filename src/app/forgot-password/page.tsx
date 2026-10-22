"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft, KeyRound } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendCooldown, setResendCooldown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus the first OTP input when transitioning to OTP screen
  useEffect(() => {
    if (isSubmitted) {
      inputRefs.current[0]?.focus();
    }
  }, [isSubmitted]);

  // Handle resend countdown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Auto-redirect to reset password once all 6 digits are entered
  useEffect(() => {
    const fullOtp = otp.join("");
    if (fullOtp.length === 6) {
      const timer = setTimeout(() => {
        router.push("/reset-password");
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [otp, router]);

  // Handle Step 1 email submission
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setResendCooldown(30);
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const cleaned = rawValue.replace(/\D/g, "");

    if (!cleaned && rawValue !== "") {
      return;
    }

    const char = cleaned.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);

    // Auto-advance to next box if character was entered
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
      inputRefs.current[index + 1]?.select();
    }
  };

  // Handle backspace and navigation keys in OTP inputs
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle pasting full 6-digit code into any input
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pastedData[i] || "";
    }
    setOtp(newOtp);

    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  // Handle manual OTP submission
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/reset-password");
  };

  // Handle Resend Code action
  const handleResend = () => {
    if (resendCooldown > 0) return;
    setResendCooldown(30);
    toast.success("A new verification code has been sent to your email.");
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
          /* Step 1: Request Password Reset Form */
          <form onSubmit={handleEmailSubmit} className="w-full">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-1">
              Forgot your password?
            </h1>
            <p className="text-sm text-gray-500 text-center mb-6">
              Enter your email address to receive a verification code.
            </p>

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
                  required
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
              Send verification code
            </button>
          </form>
        ) : (
          /* Step 2: OTP Verification Form */
          <div className="w-full text-center bg-[#F8FAFC] border border-blue-100 rounded-2xl p-6 sm:p-7 shadow-sm">
            {/* Key / Security Icon */}
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center text-[#4788F9] border border-blue-100/60">
              <KeyRound className="w-6 h-6 text-[#4788F9]" strokeWidth={2.2} />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Enter verification code
            </h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              We’ve sent a 6-digit OTP code to{" "}
              <span className="font-semibold text-gray-900">{email || "your email"}</span>.
              <br className="hidden sm:inline" /> Please enter it below to reset your password.
            </p>

            <form onSubmit={handleOtpSubmit} className="w-full">
              {/* 6 Digit Inputs */}
              <div className="flex justify-center items-center gap-2 sm:gap-2.5 mb-6">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={handleOtpPaste}
                    onFocus={(e) => e.target.select()}
                    className={`w-11 h-13 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold rounded-xl border bg-white text-gray-900 outline-none transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus:border-[#4788F9] focus:ring-2 focus:ring-[#4788F9]/20 ${
                      digit
                        ? "border-[#4788F9] bg-blue-50/20 text-[#4788F9]"
                        : "border-gray-200"
                    }`}
                    aria-label={`Digit ${index + 1}`}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-[50px] rounded-xl bg-[#4788F9] hover:bg-[#3677E8] text-white font-semibold text-base transition-all duration-150 active:scale-[0.99] cursor-pointer shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4788F9]"
              >
                Verify & proceed
              </button>
            </form>

            {/* Resend and change email actions */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-gray-500 pt-4 border-t border-gray-200/60 gap-2">
              <span>Didn’t receive the code?</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendCooldown > 0}
                  className={`font-semibold transition cursor-pointer ${
                    resendCooldown > 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-[#4788F9] hover:text-[#3677E8] hover:underline"
                  }`}
                >
                  {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
                </button>
                <span className="text-gray-300">|</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setOtp(["", "", "", "", "", ""]);
                  }}
                  className="font-medium text-gray-600 hover:text-gray-900 hover:underline transition cursor-pointer"
                >
                  Change email
                </button>
              </div>
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
