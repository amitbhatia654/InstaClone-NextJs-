"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { ApplicationContext } from "../Components/ContextFiles/MyContextData";

export default function Login() {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { handleSubmit, register } = useForm();
  const applicationData = useContext(ApplicationContext);

  const userDetails = async () => {};

  const loginDetails = async (details: any) => {
    setLoading(true);
    const { data } = await axios.post("/api/users/login", details);

    if (data.message == "yeah created token") {
      route.push("/home");

      const { data } = await axios.get("/api/users/userDetails");
      applicationData.setName(data.UserDetails);
    } else {
      setLoading(false);
      // alert(data.message);
      setError(data.message);
    }
  };
  return (
    <div className="bgimg d-flex align-items-center">
      <div className="container d-flex align-items-center justify-content-center">
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
                  className=" mx-5"
                  onClick={() => setError("")}
                  required={true}
                />
                <br></br>
                Password
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  {...register("password")}
                  onClick={() => setError("")}
                  required={true}
                  className="mx-3"
                />
                <br></br>
                <button
                  disabled={loading ? true : false}
                  type="submit"
                  className="btn btn-primary my-3"
                >
                  Sign In
                </button>
                <br></br>
                IF YOU ARE NEW USER THEN !
                <Link className="mx-3 btn btn-primary" href="/signup">
                  Sign Up
                </Link>
                <br></br>
                <span className="text-danger">
                  {loading && "Please Wait.."}
                </span>
                <span className="text-danger">{error && error}</span>
              </form>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}
