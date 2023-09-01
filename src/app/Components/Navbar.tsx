"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  useEffect(() => {
    userDetails();
  }, []);
  const route = useRouter();
  const [userName, setUserName] = useState("");
  const loggingOut = async () => {
    const { data } = await axios.get("/api/users/logout");
    if (data.message == "User logout successfully") route.push("/");
  };

  const userDetails = async () => {
    const { data } = await axios.get("/api/users/userDetails");
    setUserName(data.UserDetails.name);
  };
  return (
    <div className="sticky-top">
      <div className=" container-fluid bg-info  font-weight-bold ">
        <div className="row mx-2 ">
          <div className="col-md-9 text-white my-3">
            <i className="fa-solid fa-explosion fa-2xl mx-2"></i>
            InstaClick
          </div>
          <div className="col-md-3 text-black my-2">
            welcome {userName}
            <button className="btn btn-danger mx-3" onClick={loggingOut}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-info ">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavAltMarkup ">
          <div className="navbar-nav ">
            <Link className="nav-item nav-link mx-4 " href="/home">
              <i className="fa-solid fa-house"></i> Home{" "}
            </Link>
            <Link className="nav-item nav-link mx-4" href="/myBlogs">
              <i className="fa-solid fa-blog"></i> My Blogs
            </Link>
            <Link className="nav-item nav-link mx-4" href="/createPost">
              <i className="fa-solid fa-circle-plus"></i> Create
            </Link>
            <Link className="nav-item nav-link mx-4" href="/profile">
              <i className="fa-solid fa-user"></i> Profile
            </Link>
          </div>
        </div>
      </nav>
      {/* <span className="sideNav d-inline-block">
        <ul>
          <li className="border border primary d-inline-block">
            <Link className="nav-item nav-link mx-2 " href="/home">
              <i className="fa-solid fa-house"></i> Home{" "}
            </Link>
          </li>
          <br></br>
          <li className="d-inline-block">
            <Link className="nav-item nav-link mx-2 " href="/myBlogs">
              <i className="fa-solid fa-blog"></i> My Blogs
            </Link>
          </li>
          <br />
          <li className="d-inline-block">
            <Link className="nav-item nav-link mx-2" href="/createPost">
              <i className="fa-solid fa-circle-plus"></i> Create
            </Link>
          </li>
          <br />
          <li className="d-inline-block">
            <Link className="nav-item nav-link mx-2" href="/profile">
              <i className="fa-solid fa-user"></i> Profile
            </Link>
          </li>
        </ul>
      </span> */}
    </div>
  );
}
