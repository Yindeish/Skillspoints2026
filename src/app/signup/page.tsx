'use client';

import { useFormik } from "formik";
import { object, ref, string } from "yup";



const page = () => {


  const form = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: object({
      firstName: string().required().min(3).max(30),
      lastName: string().required().min(3).max(30),
      email: string().required().email(),
      password: string().required().min(8).max(15),
      confirmPassword: string()
        .oneOf([ref('password'), null], 'Passwords must match')
        .required('Confirm password is required')
    }),
    onSubmit: () => {
      console.log('submitting!')
      alert('submitting!')
    }
  })

  return (

    <main className="min-h-screen md:grid md:grid-cols-2 place-content-center px-6">

      {/* form */}
      <section className="">
        <h1 className=" flex justify-center text-3xl font-bold pb-10">Welcome to auth</h1>
        <form className="flex flex-col gap-8">

          {[
            {
              feildName: 'firstName',
              type: 'text',
              placeholder: 'Your first name',
              label: 'First Name',
              value: form.values.firstName,
              error: form.errors.firstName,
            },
            {
              feildName: 'lastName',
              type: 'text',
              placeholder: 'Your last name',
              label: 'Last Name',
              value: form.values.lastName,
              error: form.errors.lastName,
            },
            {
              feildName: 'email',
              type: 'email',
              placeholder: 'Your email address',
              label: 'Email',
              value: form.values.email,
              error: form.errors.email,
            },
            {
              feildName: 'password',
              type: 'password',
              placeholder: 'Your password',
              label: 'Password',
              value: form.values.password,
              error: form.errors.password,
            },
            {
              feildName: 'confirmPassword',
              type: 'password',
              placeholder: 'Confirm your password',
              label: 'Confirm Password',
              value: form.values.confirmPassword,
              error: form.errors.confirmPassword,
            },
          ].map((field, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <label htmlFor={field.feildName}>{field.label}</label>
              <input type={field.type}
                id={field.feildName}
                value={field.value}
                onChange={form.handleChange}
                // name=""
                placeholder={field.placeholder}
                className="w-auto rounded-xl border border-gray-300 px-4 py-1 bg-[#FFFFFF]" />

              <span className="text-[10px] text-red-500">{field.error}</span>
            </div>
          ))}


          <button
            onClick={() => form.handleSubmit()}
            type="button" className="w-full rounded-xl bg-[#4788F9] text-white py-2 cursor-pointer" >Sign Up</button>

        </form>

        <p className="text-center py-10">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500  font-bold hover:underline">
            Log In
          </a>
        </p>



      </section>
      {/* form */}


      {/* Image */}
      <section className="flex items-center justify-center p-6-">

        <img
          className="w-auto h-[500px] bg-red-700 flex justify-center items-center"
          src="/images/LogoAuth.png" alt="" />

      </section>
      {/* Image */}

    </main>

  );
}

export default page;