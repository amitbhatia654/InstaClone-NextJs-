import connect from "@/dbConfig/dbConfig";
import User from "@/models/AllUsers";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    //console.log("the req is come here ", reqBody.email,reqBody.password);
    const user = await User.findOne({ email: reqBody.email });

    if (!user) {
      return NextResponse.json({ message: "soory user does't  exist !" });
    }

    const validPassword = await bcryptjs.compare(
      reqBody.password,
      user.password
    );

    if (!validPassword) {
      return NextResponse.json({ message: "The password Does't match " });
    }

    //creating token data

    const tokenData = { id: user._id, name: user.name, email: user.email };

    //geenrating token

    const token = jwt.sign(tokenData, "amit bhai ji", {
      expiresIn: "10d",
    });

    const response = NextResponse.json({
      message: "yeah created token",
    });

    response.cookies.set("token", token);

    return response;
  } catch (error) {
    console.log(error, "there must be an error!");
    return NextResponse.json(
      { error: "something wrong please check it" },
      { status: 400 }
    );
  }
}
