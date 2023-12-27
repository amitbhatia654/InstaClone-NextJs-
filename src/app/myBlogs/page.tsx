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
    if (res?.data?.data?.id) {
      setAllPosts((old) =>
        old.map((post) => {
          if (post._id === res.data.data.id)
            post = {
              ...post,
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
                          <div className="dropdown">
                            <a
                              className="btn btn-secondary dropdown-toggle"
                              href="#"
                              role="button"
                              id="dropdownMenuLink"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            ></a>

                            <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenuLink"
                            >
                              <li>
                                <button
                                  className="btn btn-danger mx-2 my-1"
                                  onClick={() => handleUpdate(data)}
                                  data-bs-toggle="modal"
                                  data-bs-target="#exampleModal"
                                >
                                  Edit{" "}
                                </button>
                              </li>
                              <li>
                                <button
                                  className="btn btn-warning mx-2 my-1"
                                  onClick={() => handleDelete(data._id)}
                                >
                                  Delete{" "}
                                </button>
                              </li>
                            </ul>
                          </div>
                          <br></br>
                          {data?.image && (
                            <Image
                              src={data?.image}
                              height={300}
                              width={340}
                              alt="pic"
                              className=" img-fluid "
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

          {/* <!-- Modal --> */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Update
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
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
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit(saveUpdatedDetails)}
                    data-bs-dismiss="modal"
                  >
                    Save changes
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
