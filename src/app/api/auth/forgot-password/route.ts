import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { msg: "Email is required" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { msg: "If this email is registered, a password reset link has been sent." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Internal server error" },
      { status: 500 }
    );
  }
}
