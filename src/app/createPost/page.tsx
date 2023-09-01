/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function page() {
  const { handleSubmit, register, reset } = useForm();
  const [postImage, setPostImage] = useState({ myfile: "" });

  const createPost = async (d: any) => {
    const { data } = await axios.get("/api/users/userDetails");
    var imageData;
    if (d.image[0]) {
      imageData = await convertToBase64(d?.image[0]);
      const b: string = imageData as string;
      setPostImage({ ...postImage, myfile: b });
    }

    const allData = {
      userId: data.UserDetails._id,
      title: d.title,
      image: imageData,
      location: d.location,
    };
    const res = await axios.post("/api/users/posts", allData);
    toast.success("Post Created Successfully");
    reset();
  };

  function convertToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = () => reject(Error);
    });
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="d-flex align-items-center justify-content-center py-5 ">
        <form
          onSubmit={handleSubmit(createPost)}
          className="border  border-primary py-5 create-form"
        >
          Title:
          <input
            type="text"
            {...register("title")}
            required
            className="my-2 mx-5"
          />
          <br></br>
          Image :{" "}
          <input
            type="file"
            {...register("image")}
            accept=".jpeg,.jpg,.png"
            required={true}
            className="my-2 mx-4"
          />
          <br></br>
          Location :{" "}
          <input
            type="text"
            {...register("location")}
            required
            className="my-2 mx-2"
          />
          <br></br>
          <button type="submit" className=" btn btn-primary">
            Submit
          </button>
        </form>
        <Toaster></Toaster>
      </div>
    </div>
  );
}
