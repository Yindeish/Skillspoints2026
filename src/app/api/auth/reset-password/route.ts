import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { msg: "Password is required" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { msg: "Password has been successfully reset." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Internal server error" },
      { status: 500 }
    );
  }
}
