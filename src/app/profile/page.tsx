/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Image from "next/image";
import profilepic from "./profilepic.jpg";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Components/Loading";

export default function page() {
  useEffect(() => {
    getUser();
  }, []);

  const { register, handleSubmit, setValue } = useForm();
  const element = <FontAwesomeIcon icon={faEnvelope} />;
  const [postImage, setPostImage] = useState({ myfile: "" });
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState("");
  const [details, setDetails] = useState({
    email: "",
    name: "",
    _id: "",
    aboutMe: "",
  });

  function convertToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = () => reject(Error);
    });
  }

  const getUser = async () => {
    setLoading(true);
    const { data } = await axios.get("/api/users/userDetails");
    setDetails(data.UserDetails);
    setPostImage({ ...postImage, myfile: data.UserDetails.image });
    setLoading(false);
  };

  const handleUpdate = async (data: any) => {
    //console.log(data.image[0], "in update func");
    // var imageData;

    // if (data.image[0]) {
    //   imageData = await convertToBase64(data?.image[0]);
    //   const a: unknown = imageData;
    //   const b: string = a as string;
    //   setPostImage({ ...postImage, myfile: b });
    // }
    const userData = {
      id: details._id,
      name: data.name,
      about: data.about,
      image: postImage.myfile,
    };
    const res = await axios.put("/api/users/userDetails", userData);
  };

  const changeProfilePic = async (event: any) => {
    const files = event.target.files;
    var imageData = await convertToBase64(files[0]);
    const a: unknown = imageData;
    const b: string = a as string;
    setPostImage({ ...postImage, myfile: b });
  };
  return (
    <div className="simplebg">
      <Navbar></Navbar>
      <br></br>
      <h2>My Profile</h2>
      {loading ? (
        <Loading></Loading>
      ) : (
        <table>
          <thead>
            <tr>
              <td>
                <Image
                  src={postImage.myfile || profilepic}
                  height={250}
                  width={250}
                  alt="profile Pic"
                  priority
                  className="profile-pic"
                ></Image>
              </td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{details?.name}</td>
            </tr>

            <tr>
              <td>Email</td>
              <td>{details?.email}</td>
            </tr>

            <tr>
              <td>About</td>
              <td>{details?.aboutMe}</td>
            </tr>
          </thead>
        </table>
      )}
      <br></br>

      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target="#staticBackdrop"
        onClick={() => {
          setValue("name", details.name), setValue("about", details.aboutMe);
        }}
      >
        Update Profile
      </button>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-backdrop="static"
        data-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(handleUpdate)}>
                <label htmlFor="profile-pic">
                  <Image
                    src={postImage.myfile || profilepic}
                    height={250}
                    width={250}
                    alt="profile Pic"
                    className="profile-pic"
                  ></Image>
                </label>
                <br></br>
                <input
                  type="file"
                  id="profile-pic"
                  {...register("image")}
                  accept=".jpeg,.png,.jpg"
                  onChange={changeProfilePic}
                />
                Name: <input type="text" {...register("name")} />
                <br></br>
                About: <input type="text" {...register("about")} />
                <br></br>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={handleSubmit(handleUpdate)}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
