import prisma from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { compare } from 'bcrypt';

// Create the controller function.
// Read the email address and OTP from the request body.
// check if the user with the email exist
// Find the OTP that’s related to the user for their password reset request.
// Check that the OTP if it is correct, has not expired, and has not already been used.
// Limit failed verification attempts to like 3.
// If verification succeeds (that is, the OTP is correct and hasn’t expired), invalidate the OTP (that is,  set the OTP to maybe used so that the user can’t reuse it).
// Generate a temporary, single-use reset token linked to the user and restricted to password reset.
// Return the reset token so the user can proceed to the reset password form.
// Invalidate the reset token and any remaining password reset codes.
// Invalidate existing login sessions.
// Return a success message.


// Create the controller function.
export async function POST(request: NextRequest) {

  // Read the email address and OTP from the request body.
  const body = await request.json();
  const { otpCode, email } = body;
  // Read the email address and OTP from the request body.

  if (!email || !otpCode || otpCode.length !== 6 || email.trim() === "") {
    return NextResponse.json({
      msg: "email and otpCode are required",
    });
  }

  if (otpCode.length !== 6) {
    return NextResponse.json({
      msg: "otpCode must be 6 digits",
      error: true,
    }, {
      status: 400,
    });
  }

  // check if the user with the email exist
  const userExist = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (!userExist) {
    return NextResponse.json({
      error: true,
      msg: 'Account with this email was not found!'
    }, { status: 404 })
  }
  // check if the user with the email exist

  // Find the OTP that’s related to the user for their password reset request.
  const userOtp = await prisma.otp.findUnique({
    where: {
      email
    }
  });

  const unhashedOtp = compare(otpCode, userOtp.otpHashed);
  console.log('unhashedOtp', unhashedOtp);

  // if (!userOtp) {
  //   return NextResponse.json({
  //     error: true,
  //     msg: ''
  //   })
  // }
  // Find the OTP that’s related to the user for their password reset request.



}
// Create the controller function.