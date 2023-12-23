import connect from "@/dbConfig/dbConfig";
import posts from "@/models/allPost";

import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    //console.log(reqBody.userid, "this is userid ");
    //console.log(reqBody.postid, "this is postid ");

    // const res = await new posts({
    //   likes: [reqBody.data],
    // }).save();

    const res = await posts.findOneAndUpdate(
      { _id: reqBody.postid },

      { likes: [reqBody.userid], location: "Hongkong" },

      { new: true, upsert: true }
    );

    console.log(res, "the response is");
    return NextResponse.json({ message: "Post Likedd SuccessFully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Post Not Liked ");
  }
}
