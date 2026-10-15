"use client";

import { useFormik } from "formik";
import { toast } from "sonner";
import { object, string } from "yup";


const Page = () => {

    const form = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: object({
            email: string().required('Email is required!').min(8, 'Invalid email').max(30, 'Invalid email').email('Invalid email'),
            password: string().required('Password is required!').min(8, 'INvalid password').max(15, 'Invalid password'),
        }),
        // onSubmit: (values) => {

        //     // Connecting the page to the signin endpoint
        //     // fetch('/api/auth/sigin', {
        //     //     method: 'POST',
        //     //     headers: {
        //     //         'Content-Type': 'application/json'
        //     //     },
        //     //     // body: 
        //     // })

        //     // Connecting the page to the signin endpoint
        // }
        onSubmit: async (values) => {
            // convert the values to json - because the endpoint only undertsands json
            const json = JSON.stringify(values);
            // convert the values to json - because the endpoint only undertsands json

            // Connecting the page to the signin endpoint
            // res -  result
            const res = await fetch('/api/auth/signin', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            })
            // Connecting the page to the signin endpoint

            // clean the result and extract the data
            const data = await res.json();

            const msg = data?.msg;
            const token = data?.token;
            // clean the result and extract the data

            console.log(token, 'token')

            // display the message to the screen
            toast(msg)
            // display the message to the screen
        }
    });


    // DRY - Don't Repeat Yourself
    const fields = [
        {
            name: 'email',
            label: 'Email address',
            placeholder: 'xyz@gmail.com',
            type: 'email',
            // value: form.values.email,
            // error: form.errors.email,
        },
        {
            name: 'password',
            label: 'Password',
            placeholder: '12334',
            type: 'password',
            // value: form.values.password,
            // error: form.errors.password,
        },
    ] as const;

    const arr = ['name', 'email'];


    // extract properties from an object
    // dot notation which uses .
    // e.g: form.values.email
    // form.touched, form.errrors.password

    // square braces notation which uses []


    return (
        <main className="min-h-screen bg-red-400- px-4 py-8 md:px-8 xl:px-12">
            <div className="mx-auto grid max-w-6xl gap-6 rounded-[32px] bg-white p-4 shadow-[0_18px_50px_rgba(7,27,61,0.08)] lg:grid-cols-[1.08fr_0.92fr] lg:p-6">
                <section className="bg-blue-900- p-4 w-auto">
                    <div className=" flex flex-col items-center justify-center">
                        <img src="images/logo.png" alt="Logo"
                            width="200"
                            height="200"
                        />
                    </div>

                    {/* {arr.map((field) => (
                        
                    ))} */}


                    <form className="flex flex-col gap-3"
                    >

                        {fields.map((field, index) => (
                            <div
                                key={index}
                            >
                                <label
                                    htmlFor={field.name}
                                    className=" bg-red-400- text-stone-950 text-[22px] px-2 py-5 ">
                                    {field.label}
                                </label>
                                <input
                                    type={field['type']}
                                    name={field.name}
                                    id={field['name']}
                                    placeholder={field.placeholder}
                                    value={form.values[field.name]}
                                    onChange={form.handleChange}
                                    onBlur={form.handleBlur}
                                    className="w-full h-auto rounded-xl border bg-white px-5 py-3 text-base text-[#071B3D] outline-none transition placeholder:text-[#56637A] focus:ring-2"
                                />
                                <span className="text-[10px] text-red-500">{form.errors[field.name]}</span>
                                {/* {formLogin.touched[fields.fieldName] && formLogin.errors[fields.fieldName] &&
                                <span className="text-rose-600"> {formLogin.errors[fields.fieldName]}

                                </span>
                            } */}

                            </div>
                        ))}

                        <button
                            onClick={() => form.handleSubmit()}
                            type="button" className="mt-2 h-12 w-full rounded-xl bg-[#4788F9] font-semibold text-white transition hover:bg-[#3677E8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4788F9]">
                            Sign In
                        </button>
                    </form>
                </section>

                <section>
                    <div className="flex ">
                        <img src="images/LogoAuth.png" alt="Sign Up" />
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Page;