import React from "react";

export default function Loading() {
  return (
    <div className=" vh-100 d-flex  justify-content-center">
      <div className="d-flex align-items-center ">
        {/* Getting Posts */}
        <div className="spinner-grow text-primary mx-1" role="status"></div>
        <div className="spinner-grow text-secondary mx-1" role="status"></div>
        <div className="spinner-grow text-success mx-1 " role="status"></div>
        <div className="spinner-grow text-danger mx-1" role="status"></div>
        <div className="spinner-grow text-warning mx-1" role="status"></div>
        <div className="spinner-grow text-info mx-1" role="status"></div>
        <div className="spinner-grow text-light mx-1" role="status"></div>
        <div className="spinner-grow text-dark mx-1" role="status"></div>
      </div>
    </div>
  );
}
