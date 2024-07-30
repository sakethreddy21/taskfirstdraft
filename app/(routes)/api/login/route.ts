import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: any) {
  await connectMongoDB();
  
  const { usermail, password } = await req.json();
  console.log("Request Body:", usermail, password);

  if (!usermail || !password) {
    return NextResponse.json(
      { errorMessage: "Email and password are required!" },
      { status: 400 }
    );
  }

  try {
    const userData = await User.findOne({ usermail });
    console.log("Find User Result:", userData);

    if (userData) {
      const isPasswordValid = await bcrypt.compare(password, userData.password);
      console.log("Password Valid:", isPasswordValid);

      if (isPasswordValid) {
        const token = jwt.sign(
          { user: userData.username, id: userData._id },
          process.env.JWT_SECRET || 'defaultSecret',
          { expiresIn: '1d' }
        );

        return NextResponse.json(
          {
            message: "Login Successful.",
            token: token,
            username: userData.username,
            id:userData.id,
            status: true
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { errorMessage: "Incorrect password!", status: false },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { errorMessage: "No user found with this email!", status: false },
        { status: 400 }
      );
    }
  } catch (e) {
    console.error("Catch block error:", e);
    return NextResponse.json(
      { errorMessage: "Something went wrong!", status: false },
      { status: 500 }
    );
  }
}
