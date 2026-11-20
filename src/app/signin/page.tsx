"use client";

import Link from "next/link";
import { useFormik } from "formik";
import { object, string } from "yup";
import { toast } from "sonner";

const Page = () => {
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: object({
      email: string()
        .required("Email is required")
        .email("Enter a valid email address"),
      password: string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;

      try {
        const response = await fetch("/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(data.msg);
        } else {
          toast.error(data.msg);
        }
      } catch {
        toast.error("Unable to sign in. Please try again.");
      }
    },
    // connect the page to signup api
  });

  const fields = [
    {
      name: "email",
      placeholder: "Your email",
      type: "email",
      label: "Email",
      autoComplete: "email",
      error: form.errors.email,
    },
    {
      name: "password",
      placeholder: "Your password",
      type: "password",
      label: "Password",
      autoComplete: "current-password",
      error: form.errors.password,
    },
  ];

  return (
    <main className="min-h-screen bg-[#F5F8FF] px-4 py-30 md:px-8 xl:px-12">
      <div className="mx-auto grid max-w-6xl gap-6 rounded-[32px] bg-white p-4 shadow-[0_18px_50px_rgba(7,27,61,0.08)] lg:grid-cols-[1.08fr_0.92fr] lg:p-6">
        <section className="flex flex-col justify-center rounded-[28px] bg-white p-6 md:p-8">
          <Link href="/" className="mb-6 inline-block self-center">
            <img
              src="/images/Logo.png"
              alt="SkillsPoints"
              className="h-auto w-24 object-contain"
            />
          </Link>

          <div className="mb-6"></div>

          <form
            className="flex flex-col gap-5"
            onSubmit={form.handleSubmit}
          >
            {fields.map((field, index) => (
              <div key={index}>
                <label
                  htmlFor={field.name}
                  className="mb-2 block text-sm font-semibold"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  placeholder={field.placeholder}
                  autoComplete={field.autoComplete}
                  value={form.values[field.name]}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  data-error={Boolean(field.error)}
                  className="h-12 w-full rounded-xl border border-[#D8DEE9] bg-white px-4 text-base text-[#071B3D] outline-none transition placeholder:text-[#56637A] focus:border-[#4788F9] focus:ring-2 focus:ring-[#E8F1FF] data-[error=true]:border-red-500"
                />

                <span className="text-rose-600">{field.error}</span>
              </div>
            ))}
            <button
              type="submit"
              disabled={form.isSubmitting}
              className="mt-2 h-12 w-full rounded-xl bg-[#4788F9] font-semibold text-white transition hover:bg-[#3677E8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4788F9]"
            >
              {form.isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                  />
                  Loading...
                </span>
              ) : (
                "Sign In"
              )}{" "}
            </button>
          </form>
          <p className="mt-5 text-center text-sm leading-5 text-[#56637A] flex justify-center gap-2">
            Don't have an account? {""}
            <Link
              href="/signup"
              className=" self-center text-sm font-semibold text-[#4788F9] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4788F9]"
            >
              Sign up
            </Link>
          </p>

          <Link
            href="/forget-password"
            className="mt-4 self-center text-sm font-semibold text-[#4788F9] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4788F9]"
          >
            Forget password?
          </Link>
        </section>

        <section className="hidden flex-col items-center justify-center rounded-[28px] bg-[#E8F1FF] px-3 py-3 text-center lg:flex">
          <img
            src="/images/LogoAuth.png"
            alt="Learners developing their skills together"
            className="mt-3 h-auto max-h-[440px] w-full max-w-[480px] object-contain"
          />
        </section>
      </div>
    </main>
  );
};

export default Page;