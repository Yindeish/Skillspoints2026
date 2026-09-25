import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

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
// Return the a success msg


// Destructuring in Javascript

// const person = {
//     name: 'Rehab',
//     age: 15,
//     married: true
// };

// const name = person.name;
// const age = person.age;
// const married = person.married;


// To avoid repetition
// To maintain simplicity (To keep things simple)
// 


// const { age, married } = person;

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

// type A = string | number; // one-stroke OR -  it's used for comparing types alone
// type B = boolean | null;

// type C = A | B;

// let name = 'Adam' || true;



const greet = () => {
    return 'I am greeting..';
}

const greeting = greet();


const person = {
    speak: (word: string) => {
        return word;
    }
}

// console.log('greeting', greeting)

const word = person.speak(greeting);

console.log(word, 'lloggin')



export async function POST(request: NextRequest) {
    // const { email, password, } = await request.json();
    const body = await request.json();
    const { email, firstName, lastName, password } = body;

    // Validate the info of the user (validation like spellings, ) for the fields and their values
    if (!email || !firstName || !lastName || !password) {
        // two-stroke OR - is used for comapring variables or values

        return NextResponse.json({
            erorr: true,
            msg: 'All fields are required!'
        })
    }
    // Validate the info of the user (validation like spellings, ) for the fields and their values


    // Validate if the user already exist
    const userExist = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userExist)
        return NextResponse.json({
            error: true,
            msg: 'Account already exist. Proceed to login'
        })
    // Validate if the user already exist

    const strongness = 10;
    const hash = await bcrypt.hash(password, strongness);

    // Create the user
    await prisma.user.create({
        data: {
            email,
            password: hash,
            firstName,
            lastName,
            totalPoints: 0
        }
    });

    // Return a success msg
    return NextResponse.json({
        error: false,
        msg: 'You have successfully signed up'
    })
    // Return a success msg
}