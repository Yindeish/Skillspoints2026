import { NextRequest, NextResponse } from "next/server";

// CRUD
// Create - POST
// Read - GET
// Update - PUT (Replace) & PATCH (Merge)
// Delete - DELETE


// ! 3 ways of getting info from a request
// 1. Request Body (Sensitive or Vital and are much)
// 2. Request Params (Not sensitive and not much)
// 3. Url Params (Hashed)

// ! QA (Question and Answer)
// !What are we doing?
// !Register a user
// !What do we need?
// !Info of the user
// !Where do we get them?
// !From the request body
// !How do we use them?
// ! We use them to create a profile  or an account for the user


// !Steps
// Create the controller function
// Collect info from the body
// Validate the info of the user (validation like spellings, ) for the fields and their values
// Validate if the user already exist
// Create the user
// Return the user for the frontend


// Destructuring in Javascript

const person = {
    name: 'Rehab',
    age: 15,
    married: true
};

// const name = person.name;
// const age = person.age;
// const married = person.married;


// To avoid repetition
// To maintain simplicity (To keep things simple)
// 


const { age, married } = person;

export async function POST(request: NextRequest) {
    // const { email, password, } = await request.json();
    const body = await request.json();
    const { email, firstName, lastName, password } = body;

    // email
    // Email
    // eMail
    // emAil
    // emaIl
    // emaiL
    // if (!email) {
    //     return NextResponse.json({ msg: 'No email!' })
    // }
    // if (!firstName) {
    //     return NextResponse.json({ msg: 'No first name!' })
    // }
    // if (!lastName) {
    //     return NextResponse.json({ msg: 'No last name!' })
    // }
    // if (!password) {
    //     return NextResponse.json({ msg: 'No password!' })
    // }

    type A = string | number;

    if (!email || !firstName || !lastName || !password)

        console.log({ email })
    return NextResponse.json({ msg: email })
}