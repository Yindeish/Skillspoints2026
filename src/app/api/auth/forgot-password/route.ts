import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import otpGenerator from 'otp-generator';
import bcrypt from 'bcrypt';


export async function POST(request: NextRequest) {
  // Read the email address from the request body.

  const body = await request.json();
  const email = body?.email;

  // Read the email address from the request body.

  // Validate the email address
  if (!email) {
    return NextResponse.json({
      msg: 'Email is required!',
      error: true
    })
  }
  // Validate the email address


  // Check whether an account with that email exists.
  const accountExist = await prisma.user.findUnique({
    where: {
      email
    }
  })
  // Check whether an account with that email exists.


  // Validate the account 
  if (!accountExist) {
    return NextResponse.json({
      msg: 'Account with this email does not exist!',
      error: true
    })
  }
  // Validate the account 


  // Generate OTP
  const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, digits: true, specialChars: false });
  // Generate OTP

  // Saving 2 copies of th OTP
  // (one we hash it and the other is sent to the user email).

  // Saving 2 copies of th OTP


  // First copy -> Hash and save it in the database
  // step 1. Hash the OTP
  const strongness = 10;
  const hashedOtp = await bcrypt.hash(otp, strongness);
  // step 1. Hash the OTP

  // Step 2 -> Save the Hash
  await prisma.oTP.create({
    data: {
      expiryTime: '10mins',
      otpCode: hashedOtp,
      userEmail: email,
    }
  })
  // Step 2 -> Save the Hash
  // First copy -> Hash and save it in the database

}