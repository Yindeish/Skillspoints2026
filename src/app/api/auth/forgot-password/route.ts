import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


async function POST(request: NextRequest) {
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

}