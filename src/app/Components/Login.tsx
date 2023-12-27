"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "./Loading";

export default function Login() {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register } = useForm();

  const loginDetails = async (details: any) => {
    setLoading(true);
    const { data } = await axios.post("/api/users/login", details);

    if (data.message == "yeah created token") route.push("/home");
    else alert(data.message);
    setLoading(false);
  };
  return (
    <div className="bgimg d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-center">
        {loading ? (
          <Loading></Loading>
        ) : (
          <div className="row login-signup-upper rounded">
            <h2 className="text-center"> Welcome to InstaClick</h2>
            <div>
              <fieldset>
                <form onSubmit={handleSubmit(loginDetails)}>
                  <legend>Login </legend>
                  Email
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    {...register("email")}
                    className=" mx-3"
                    required={true}
                  />
                  <br></br>
                  Password
                  <input
                    type="password"
                    placeholder="Enter Your Password"
                    {...register("password")}
                    required={true}
                    className="mx-3"
                  />
                  <br></br>
                  <button
                    disabled={loading ? true : false}
                    type="submit"
                    className="btn btn-primary my-3"
                  >
                    Log In
                  </button>
                  <Link className="mx-3" href="/signup">
                    Sign Up
                  </Link>
                </form>
              </fieldset>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
