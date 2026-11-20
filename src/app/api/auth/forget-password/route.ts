import { Resend } from 'resend';
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { randomInt } from "node:crypto";
import bcrypt from "bcrypt";



export async function POST(request: NextRequest) {
  try {
    //نقرأ الإيميل من الطلب:
    const { email } = await request.json();
    //نتحقق إن الإيميل موجود وصيغته صحيحة، وإن الطلبات ما تجاوزت الحد المسموح.
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ msg: "Email is required" }, { status: 400 });
    }
    //نبحث عن حساب بهذا الإيميل في قاعدة البيانات.
    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExist) {
      return NextResponse.json(
        {
          msg: "If an account exists, an OTP code has been sent. Please check your email.",
        },
        { status: 400 },
      );
    }
    // نولّد كود OTP عشوائيًا وآمنًا.
    const otp = randomInt(0, 1000000).toString().padStart(6, "0");
    // نولّد كود OTP عشوائيًا وآمنًا.
    // Hash the OTP
    const hashedOtp = await bcrypt.hash(otp, 10);
    // Hash the OTP
    // save the expiry time
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    // save the expiry time

    // Store the OTP hash, expiration time, and attempt count, linked to the user.
    await prisma.otp.create({
      data: {
        email,
        expiresAt: otpExpiry,
        otpHashed: hashedOtp,
        attemptCount: 0,
      }
    })
    // Store the OTP hash, expiration time, and attempt count, linked to the user.

    // Send the original OTP to the user’s email.
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: 'Skillspoint <onboarding@resend.dev>',
      to: [email],
      subject: 'Use this OTP to verify your email and generate a new password',
      html: `<strong>This is your OTP: ${otp}</strong>`,
    });
    // Send the original OTP to the user’s email.


    if (error) {
      return NextResponse.json({ error: true, msg: error?.message || 'Error sending OTP' })
    }

    // Return a success message.
    return NextResponse.json({
      error: false,
      msg: 'An OTP code has been sent to your mail'
    })
    // Return a success message.

  } catch (error) {
    console.error("Forgot-password error:", error);
  }
  return NextResponse.json(
    {
      msg: "If an account exists, an OTP code has been sent. Please check your email.",
    },
    {
      status: 400,
    },
  );
}
