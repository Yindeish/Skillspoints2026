'use client';

import { useFormik } from "formik";
import { toast } from "sonner";
import { object, ref, string } from "yup";



const page = () => {

  const form = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: object({
      firstName: string().required('First name is required').min(3).max(30),
      lastName: string().required('Last Name is required').min(3).max(30),
      email: string().required('Email is required!').email().min(14).max(50),
      password: string().required('Input your password').min(6).max(15),
      // confirmPassword: string().required().oneOf(['password'], 'Passwords do not match')
    }),
    onSubmit: async (values) => {
      const { email, firstName, lastName, password, } = values;
      const formData = { email, firstName, lastName, password };

      const stringifiedData = JSON.stringify(formData);

      // connect the page to signup api
      // fetch API
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: stringifiedData
      });

      const data = await response.json();

      const msg = data?.msg;
      toast(msg)
    }
  });


  return (

    <main className="min-h-screen md:grid md:grid-cols-2 place-content-center px-6">

      {/* form */}
      <section className="">
        <h1 className=" flex justify-center text-3xl font-bold pb-10">Welcome to auth</h1>
        <form className="flex flex-col gap-8">

          {
            [
              {
                fieldName: 'firstName',
                placeholder: 'Input your first name',
                type: 'text',
                label: 'First Name',
                value: form.values.firstName,
                error: form.errors.firstName
              },
              {
                fieldName: 'lastName',
                placeholder: 'Input your last name',
                type: 'text',
                label: 'Last Name',
                value: form.values.lastName,
                error: form.errors.lastName
              },
              {
                fieldName: 'email',
                placeholder: 'Input your email',
                type: 'email',
                label: 'Email Address',
                value: form.values.email,
                error: form.errors.email
              },
              {
                fieldName: 'password',
                placeholder: 'Input your password',
                type: 'password',
                label: 'Password',
                value: form.values.password,
                error: form.errors.password
              },
              {
                fieldName: 'confirmPassword',
                placeholder: 'Confirm your password',
                type: 'password',
                label: 'Confirm Password',
                value: form.values.confirmPassword,
                error: form.errors.confirmPassword
              },
            ].map((field, index) => {
              return (
                <div className="flex flex-col gap-2" key={index}>
                  <label htmlFor={field.fieldName}>{field.label}</label>
                  <input type={field.type}
                    name={field.fieldName}
                    // name marks the field uniquely to make sure it's the only only being update when the user types
                    onChange={form.handleChange}
                    // we use it to update the value of the field when the user types
                    value={field.value}
                    placeholder={field.placeholder}
                    className="w-auto rounded-xl border border-gray-300 px-4 py-1 bg-[#FFFFFF]" />

                  <span className="text-[10px] text-red-500">{field.error}</span>
                </div>
              )
            })
          }


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
          className="w-auto h-[500px] bg-red-500 flex justify-center items-center"
          src="/images/LogoAuth.png" alt="" />

      </section>
      {/* Image */}

    </main>

  );
}

export default page;