"use client";

import { useFormik } from "formik";
import { object, string } from "yup";

const ForgetPssword = () => {
  const formForgetPssword = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: object({
      email: string()
        .required("Email is required")
        .email("Enter a valid email address"),
    }),
    onSubmit: async (values) => {
      const email = values.email; // connect the page to forget-password api
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.msg);
      } else {
        alert(data.msg);
      }
    },
  });
  const fields = [
    {
      name: "email",
      placeholder: "Enter your email address",
      type: "email",
      label: "Email",
      autoComplete: "email",
    },
  ];
  return (
    <>
      <div className=" w-full min-h-screen flex justify-center items-center  bg-[#f5faff] bg-[radial-gradient(ellipse_at_top_left,#dbeafe,transparent_50%),radial-gradient(ellipse_at_bottom_right,#dbeafe,transparent_50%)] p-10">
        <div className=" w-full max-w-[600px] rounded-[32px] bg-red-400 p-4 shadow-[0_18px_50px_rgba(7,27,61,0.08)] m:grid-cols-[1.08fr_0.92fr]- lg:p-6">
          <div className="bg-blue-600- flex justify-center items-center">
            <img
              src="images/Logo.png"
              alt="LogoAuth"
              width={200}
              height={200}
            />
          </div>
          <div className="bg-green-500  w-full">
            <div className="w-full p-5 flex flex-col gap-5 p-[20px] ">
              <h1 className="px-[5px] text-[20px]">Email address</h1>
              <form
                onSubmit={formForgetPssword.handleSubmit}
                className="w-full bg-amber-300-"
              >
                {fields.map((field, index) => (
                  <div key={index}>
                    <label htmlFor={field.name} className=" "></label>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      id={field.name}
                      autoComplete={field.autoComplete}
                      value={formForgetPssword.values.email}
                      onChange={formForgetPssword.handleChange}
                      onBlur={formForgetPssword.handleBlur}
                      className="w-full h-auto rounded-xl border bg-white px-5 py-3 text-base text-[#071B3D] outline-none transition placeholder:text-[#56637A] focus:ring-2"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="mt-2 h-12 w-full rounded-xl bg-[#4788F9] font-semibold text-white transition hover:bg-[#3677E8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4788F9]"
                >
                  Send otp code
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPssword;