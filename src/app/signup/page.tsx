/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function page() {
  const route = useRouter();
  const { handleSubmit, register } = useForm();

  const handleRegister = async (data: any) => {
    const result = await axios.post("/api/users/signup", data);
    toast.success(result.data.message);
    route.push("/");
  };

  return (
    <div className="">
      <div className=" bgimg d-flex align-items-center">
        <div className="container d-flex align-items-center justify-content-center ">
          <div className="row login-signup-upper">
            <h2 className="text-center">Welcome to InstaClick</h2>
            <form onSubmit={handleSubmit(handleRegister)}>
              <legend>Signup </legend>
              Name{" "}
              <input
                type="text"
                {...register("name")}
                className="mx-3 my-2"
                required={true}
              />
              <br></br>
              Email{" "}
              <input
                type="email"
                {...register("email")}
                className="mx-3 my-2"
                required={true}
              />
              <br></br>
              Password{" "}
              <input
                type="password"
                {...register("password")}
                className=" mx-2 my-2"
                required={true}
              />
              <br></br>
              <button className="mx-2 btn btn-primary"> Submit</button>
              <br></br>
              EXISTING USER PLEASE !
              <Link href="/" className="mx-3 btn btn-primary">
                Login
              </Link>
              <Toaster />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
