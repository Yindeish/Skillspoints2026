import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



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
// Hash the password
// Generate a token for the user.
// Create the user and store the token and the hashed password in it (the user).
// Return the a success msg

// Create the controller function

export async function POST(request: NextRequest) {
// Collect info from the body
  const { email, password, firstName, lastName } = await request.json();

// Validate the info of the user (validation like spellings, ) for the fields and their values
  if (!email || !password || !firstName || !lastName) {
    return NextResponse.json({
        msg: "fields are required",
        status: 400
    })
  }


// Validate if the user already exist
const userExists = await prisma.user.findUnique({
    where:{
        email
      }
});

if (userExists) {
    return NextResponse.json({
        msg: "Email is already taken. Proceed to login",
        status: 409
    })
}


// Hashing the password
const strongness = 10;
const hash = await bcrypt.hash(password, strongness);
// Hashing the password

// Generate a token for the user.
const JWT_PASSWORD = process.env.JWT_PASSWORD;
const token = jwt.sign(email, JWT_PASSWORD);
// Generate a token for the user.


await prisma.user.create({
    data:{
      email,
      firstName,
      lastName,
      // Saving the hashed password in the user
      password: hash,
      // Saving the hashed password in the user
      totalPoints: 0,
      token
    }
  })



  return NextResponse.json(
    {
      msg: "successfully created user",
      token,
      status: 201
    });
}

  // 4. Hash the password
  // 5. Create the user
  // 6. Return the final response




// console.log("email, password" ,email, password)
//   // 2. Validate the data
//   if (!email || !password || !firstName || !lastName) {
//     return NextResponse.json(
//       {
//         message: "All fields are required",
//       },
//       {
//         status: 400,
//       }
//     );
//   }

//   // 3. Search for the user in the database
//   const existingUser = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });

//   // Check if the user already exists
//   if (existingUser) {
//     return NextResponse.json(
//       {
//         message: "User already exists",
//       },
//       {
//         status: 409,
//       }
//     );
//   }

//   const emailExists = await prisma.user.findUnique(

//     {

//      where: email,   
//     }
//   )
//   if (emailExists) {
//     return NextResponse.json({

// message:"email exist already",
 
//     },
//     {status: 400
// }
// )
//   }
