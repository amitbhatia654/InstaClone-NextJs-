import connect from "@/dbConfig/dbConfig";
import posts from "@/models/allPost";
const mongoose = require("mongoose");

import axios from "axios";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    // console.log(reqBody, "the id");

    const res = await posts.findOneAndUpdate(
      { _id: reqBody.postid },
      { $push: { likes: reqBody.userId } }
      // { new: true, upsert: true }
    );
    // console.log(res, "the user is 11 ");

    return NextResponse.json({ message: "Post Likedd SuccessFully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Post Not Liked ");
  }
}
