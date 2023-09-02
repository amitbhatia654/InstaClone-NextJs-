/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import Image from "next/image";
import profilepic from "../profile/profilepic.jpg";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../Components/Loading";

export default function page() {
  useEffect(() => {
    getMyAllPosts();
  }, []);

  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [updateData, setUpdateData] = useState({ image: "", _id: "" });
  const [loading, setLoading] = useState(true);

  const { handleSubmit, register, setValue } = useForm();

  const getMyAllPosts = async () => {
    const { data } = await axios.get("/api/users/userDetails");
    setLoading(true);
    const res = await axios.get("/api/users/posts", {
      params: { id: data.UserDetails._id },
    });
    setAllPosts(res.data);
    setLoading(false);
  };

  const handleUpdate = (data: any) => {
    setUpdateData(data);
    setValue("title", data.title);
  };

  function convertToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = () => reject(Error);
    });
  }

  const saveUpdatedDetails = async (data: any) => {
    var imageData;
    if (data.image[0]) {
      imageData = await convertToBase64(data?.image[0]);
      const a: unknown = imageData;
      const b: string = a as string;
    }

    const newData = {
      image: imageData,
      title: data.title,
      id: updateData._id,
    };

    const res = await axios.put("/api/users/posts", newData);
    //console.log(res.data.data, "The final res is ");
    if (res?.data?.data?.id) {
      setAllPosts((old) =>
        old.map((post) => {
          if (post._id === res.data.data.id)
            post = {
              ...post,
              //image: res.data.data.image,
              title: res.data.data.title,
            };
          return post;
        })
      );
      toast.success("post updated Suucessfully");
    } else {
      toast.success("Post Not Updated please try Again");
    }
  };

  const handleDelete = async (id: any) => {
    const con = confirm("Are you Sure You Want to Delete");
    if (con) {
      const { data } = await axios.delete("/api/users/posts", {
        params: { id },
      });

      if (data == "Post Deleted Successfully") {
        setAllPosts((data) => data.filter((post) => post._id != id));
        toast.success("Post Deleted Successfully");
      }
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="">
            <div className="container-fluid   my-4 ">
              <div className="row d-flex align-items-center justify-content-center ">
                {allPosts.length > 0
                  ? allPosts.map((data) => {
                      return (
                        <div
                          className="col-md-3 border  mx-1 my-3 p-2 "
                          key={data?._id}
                        >
                          <div className="dropdown  ">
                            <button
                              className="btn btn-secondary  "
                              type="button"
                              id="dropdownMenu2"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="fa-solid fa-ellipsis-vertical"></i>
                            </button>
                            <div
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenu2"
                            >
                              <button
                                className="btn dropdown-item"
                                onClick={() => handleUpdate(data)}
                                data-toggle="modal"
                                data-target="#staticBackdrop"
                              >
                                Update{" "}
                                <i className="fa-solid fa-pen-to-square"></i>
                              </button>
                              <hr />
                              <button
                                className="btn dropdown-item "
                                onClick={() => handleDelete(data._id)}
                              >
                                Delete <i className="fa-solid fa-trash"></i>
                              </button>
                            </div>
                          </div>
                          <br></br>
                          {data?.image && (
                            <Image
                              src={data?.image}
                              height={300}
                              width={320}
                              alt="pic"
                              className=" img-responsive "
                            ></Image>
                          )}
                          Captions -{data?.title}
                        </div>
                      );
                    })
                  : "sorry there is no post! "}
              </div>
            </div>
          </div>
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
                    Update
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
                  <form>
                    Title : <input type="text" {...register("title")} />
                    <Image
                      src={updateData.image || profilepic}
                      height={250}
                      width={250}
                      alt="profile Pic"
                    ></Image>
                    <br></br>
                    Change Pic
                    <input
                      type="file"
                      {...register("image")}
                      accept=".jpeg,.png,.jpg"
                    />
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
                    onClick={handleSubmit(saveUpdatedDetails)}
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Toaster />
        </>
      )}
    </div>
  );
}
