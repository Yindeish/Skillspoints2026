import prisma from "@/lib/prisma";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { compareExpiry } from "@/lib/utils";

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

  if (!userOtp) {
    return NextResponse.json({
      error: true,
      msg: 'No OTP found!'
    }, { status: 404 })
  }
  // Find the OTP that’s related to the user for their password reset request.

  // Check that the OTP if it is correct
  const otpIsCorrect = await bcrypt.compare(otpCode, userOtp?.otpHashed);

  if (!otpIsCorrect) {
    if (Number(userOtp?.attemptCount) >= 3) {
      return NextResponse.json({ error: true, msg: 'Maximum trials reached. Try again later' }, { status: 400 })
    }

    const newAttemptCount = Number(userOtp?.attemptCount) + 1;

    const updatesUserOtp = await prisma.otp.update({
      where: {
        otpHashed: userOtp?.otpHashed,
        email
      },
      data: {
        attemptCount: newAttemptCount
      }
    })

    console.log('updatesUserOtp', updatesUserOtp)

    return NextResponse.json({
      error: true,
      msg: 'Wrong OTP!'
    }, { status: 400 })
  }
  // Check that the OTP if it is correct

  // Check that the OTP if it has not expired,
  const otpExpired = compareExpiry(userOtp?.createdAt, userOtp?.expiresAt)?.isExpired;

  if (otpExpired)
    return NextResponse.json({
      error: true,
      msg: 'OTP has expired!'
    }, { status: 400 })
  // Check that the OTP if it has not expired,

  // Check that the OTP if it not already been used
  const otpUsedBefore = Number(userOtp?.attemptCount) > 0;

  if (otpUsedBefore)
    return NextResponse.json({ error: true, msg: 'OTP has been used before!' }, { status: 400 })
  // Check that the OTP if it not already been used

  // Limit failed verification attempts to like 3.

  // Limit failed verification attempts to like 3.


  // if (!userOtp) {
  //   return NextResponse.json({
  //     error: true,
  //     msg: ''
  //   })
  // }



}
// Create the controller function.