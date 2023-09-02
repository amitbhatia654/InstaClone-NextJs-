import { GetDataFromToken } from "@/helpers/GetDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/dbConfig/dbConfig";
import User from "@/models/AllUsers";

connect();

export async function GET(request: NextRequest) {
  try {
    const user = GetDataFromToken(request);
    const UserDetails = await User.findById({ _id: user?.id });
    return NextResponse.json({ UserDetails });
  } catch (error) {
    return NextResponse.json({ message: "something wrong in userDetail api" });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const res = await User.updateOne(
      { _id: reqBody.id },
      { name: reqBody.name, image: reqBody.image, aboutMe: reqBody.about }
    );

    return NextResponse.json({
      message: "Profile Updated Successfully",
      reqBody,
    });
  } catch (error) {
    return NextResponse.json({ message: "Data not updated" });
  }
}
