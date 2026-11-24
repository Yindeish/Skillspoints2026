"use client";

import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { toast } from "sonner";
import { object, string } from "yup";

const VerifyOtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const form = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: object({
      code: string()
        .required("Verification code is required")
        .matches(/^[0-9]{6}$/, "Enter a 6-digit verification code"),
    }),
    onSubmit: async (values) => {
      if (!email) {
        toast.error("Missing email. Please request a new code.");
        router.push("/forget-password");
        return;
      }
      try {
        const response = await fetch("/api/auth/verify-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otpCode: values.code }),
        });
        const data = await response.json();
        if (response.ok) {
          toast.success(data?.msg || "Code verified");
        } else {
          toast.error(data?.msg || "Invalid verification code");
        }
      } catch {
        toast.error("Unable to verify the code. Please try again.");
      }
    },
  });

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5faff] bg-[radial-gradient(ellipse_at_top_left,#dbeafe,transparent_50%),radial-gradient(ellipse_at_bottom_right,#dbeafe,transparent_50%)] px-4 py-10">
      <section
        aria-labelledby="verify-password-title"
        className="w-full max-w-[520px] rounded-[32px] bg-white p-6 text-[#071B3D] shadow-[0_18px_50px_rgba(7,27,61,0.08)] sm:p-10"
      >
        <Image
          src="/images/Logo.png"
          alt="SkillsPoints"
          width={200}
          height={200}
          className="mx-auto mb-6 h-auto w-40"
          priority
        />

        <h1
          id="verify-password-title"
          className="text-center text-2xl font-semibold"
        >
          Check your email
        </h1>
        <p
          id="code-instructions"
          className="mt-3 text-center text-sm leading-6 text-[#56637A]"
        >
          Enter the 6-digit verification code from your password reset email.
        </p>

        <form onSubmit={form.handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="verification-code"
              className="mb-2 block text-sm font-medium"
            >
              Verification code
            </label>
            <input
              id="verification-code"
              name="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              value={form.values.code}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              required
              aria-describedby="code-instructions"
              title="Enter a 6-digit verification code"
              placeholder="000000"
              className="h-14 w-full rounded-xl border border-[#D8E1EF] bg-white px-4 text-center text-2xl tracking-[0.4em] outline-none transition placeholder:text-[#A2AEC0] focus:border-[#4788F9] focus:ring-2 focus:ring-[#4788F9]/25"
            />
          </div>

          <button
            type="submit"
            disabled={form.isSubmitting}
            className="h-12 w-full rounded-xl bg-[#4788F9] font-semibold text-white transition hover:bg-[#3677E8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4788F9]"
          >
            {form.isSubmitting ? "Verifying..." : "Verify code"}
          </button>
          <p role="status" className="text-center text-sm text-[#56637A]">
            {form.touched.code && form.errors.code}
          </p>
        </form>

        <p className="mt-4 text-center text-sm text-[#56637A]">
          Didn’t receive a code?{" "}
          <Link
            href="/forget-password"
            className="font-medium text-[#3677E8] underline underline-offset-4"
          >
            Try another email
          </Link>
        </p>
        <Link
          href="/signin"
          className="mt-6 block text-center text-sm font-medium text-[#56637A] underline underline-offset-4"
        >
          Back to sign in
        </Link>
      </section>
    </main>
  );
};

const VerifyForgetPassword = () => (
  <Suspense>
    <VerifyOtpForm />
  </Suspense>
);

export default VerifyForgetPassword;
