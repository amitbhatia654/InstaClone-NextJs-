"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import { ApplicationContext } from "../Components/ContextFiles/MyContextData";

export default function Navbar() {
  const route = useRouter();
  const AppicationData = useContext(ApplicationContext);
  const loggingOut = async () => {
    const { data } = await axios.get("/api/users/logout");
    if (data.message == "User logout successfully") route.push("/");
  };

  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light mynav ">
        <div className="container-fluid my-4">
          <Link className="navbar-brand" href="/home">
            <i className="fa-solid fa-explosion fa-2xl mx-2"></i>
            InstaClick
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-item nav-link mx-4 " href="/home">
                  <i className="fa-solid fa-house"></i> Home{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-item nav-link mx-4" href="/myBlogs">
                  <i className="fa-solid fa-blog"></i> My Blogs
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-item nav-link mx-4" href="/createPost">
                  <i className="fa-solid fa-circle-plus"></i> Create
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-item nav-link mx-4" href="/profile">
                  <i className="fa-solid fa-user"></i> Profile
                </Link>
              </li>
            </ul>
            <span className="name">welcome {AppicationData.name.name} </span>
            <button className="btn btn-danger mx-3" onClick={loggingOut}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
