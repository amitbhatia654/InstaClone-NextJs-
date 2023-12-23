/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import Image from "next/image";
import profilePic from "../profile/profilepic.jpg";
import Loading from "../Components/Loading";

export default function page() {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/users/userDetails");
    const res = await axios.get("/api/users/posts");
    setAllPosts(res.data);
    setLoading(false);
  };

  const likedFunction = async (postid: any, userid: any) => {
    const data = await axios.post("api/users/likes", { userid, postid });
    //console.log(data, "The all data is ");
  };

  return (
    <div className="simplebg">
      <Navbar></Navbar>
      {loading ? (
        <Loading></Loading>
      ) : allPosts.length == 0 ? (
        <div className="border ">No post Available!</div>
      ) : (
        allPosts.map((data) => {
          return (
            <div
              key={data._id}
              className=" my-4  d-flex align-items-center justify-content-center "
            >
              <div className="p-1 border">
                <Image
                  src={data?.userName?.image || profilePic}
                  height={40}
                  width={40}
                  alt="pic"
                  className="rounded-circle"
                ></Image>{" "}
                <span>{data?.userName?.name}</span>
                <br></br>
                <span className="fw-light">Location: {data.location}</span>
                <br></br>
                {data?.image && (
                  <Image
                    src={data?.image}
                    height={300}
                    width={400}
                    alt="pic"
                    className="border border-dark my-2"
                  ></Image>
                )}
                <br></br>
                <div className="my-2"> Caption: {data?.title}</div>
                <div className="">
                  <button
                    className="heartbtn"
                    onClick={() => {
                      likedFunction(data._id, data.userId);
                      setLiked(!liked);
                    }}
                  >
                    <i
                      className={
                        liked
                          ? ` fa-solid fa-heart fa-xl heartbtn1`
                          : ` fa-regular fa-heart fa-xl heartbtn1`
                      }
                    ></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
