"use client";

import React, { useState } from "react";
import ReactPlayer from "react-player";
import ModalVideoComponent from "../../common/ModalVideo";
import Image from "next/image";

export default function VideoTwo({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="relative pt-40">
        <Image
          width={690}
          height={330}
          className="w-1/1 rounded-16"
          src={"/assets/img/courses/" + data.lectureImage}
          alt="image"
        />
        <ReactPlayer
          url={`/assets/video/` + data.lectureVideo}
          controls={true}
          playing={false}
        />
        <div className="absolute-full-center d-flex justify-center items-center">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(true)}
            className="d-flex justify-center items-center size-60 rounded-full bg-white"
          >
            <span className="icon-play text-18"></span>
          </span>
        </div>
      </div>
    </>
  );
}
