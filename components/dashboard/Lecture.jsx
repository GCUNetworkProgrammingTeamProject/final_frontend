"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import FooterNine from "../layout/footers/FooterNine";
import LectureAddModify from "./LectureAddModify";
import Image from "next/image";
import Link from "next/link";

export default function Lecture() {
  const [lecture, setLecture] = useState([]); // Initialize lecture as an empty array
  const [accessToken, setAccessToken] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [updateLectures, setUpdateLectures] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("/api/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function(response) {
        if (
          response.data.role === "ADMIN" ||
          response.data.role === "LECTURER"
        ) {
          setIsTeacher(true);
          setAccessToken(token);
        } else {
          setIsTeacher(false);
          alert("강사만 접근 가능합니다");
          window.history.back();
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  useEffect(() => {
    axios
      .get("/api/t/lectures", config)
      .then(function(response) {
        console.log(response);
        setLecture(response.data);
      })
      .catch(function(error) {
        console.log(error);
        setLecture([]);
      });
  }, [accessToken, updateLectures]);

  function handleLectureRemove(id) {
    axios
      .delete(`/api/t/lectures/${id}`, config)
      .then(function(response) {
        setUpdateLectures((prev) => !prev);
        alert(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function handleClick(item) {
    console.log("item: " + item);
  }
  // console.log(lecture);
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">강의 관리</h1>
          </div>
        </div>

        <div className="row y-gap-30 pt-30">
          <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
            <Link
              href={{
                pathname: "/dshb-lectureaddmodify",
              }}
            >
              <button
                className="button text-13 -sm -light-7 text-purple-1"
                style={{ float: "right", marginRight: "20px" }}
              >
                등록
              </button>
            </Link>
            <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
              <ul>
                {lecture.length > 0 ? (
                  lecture.map((item, index) => (
                    <div key={index}>
                      {/* <CourseCardTwo data={item} /> */}
                      <li>
                        <h2>강의 이름: {item.lectureName}</h2>
                        <p>
                          강의 내용: {item.lectureContent}
                          <button
                            className="button text-13 -sm -light-7 text-purple-1"
                            style={{
                              float: "right",
                              marginRight: "20px",
                              marginTop: "10px",
                            }}
                            onClick={() => handleLectureRemove(item.lectureSeq)}
                          >
                            삭제
                          </button>
                          <Link
                            href={{
                              pathname: "/dshb-lectureaddmodify",
                              query: { item: JSON.stringify(item) },
                            }}
                          >
                            <button
                              className="button text-13 -sm -light-7 text-purple-1"
                              style={{
                                float: "right",
                                marginRight: "20px",
                                marginTop: "10px",
                              }}
                              onClick={() => handleClick(item)}
                            >
                              수정
                            </button>
                          </Link>
                        </p>
                      </li>
                      {index < lecture.length - 1 && <hr />}
                    </div>
                  ))
                ) : (
                  <p>No lectures available.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <FooterNine />
    </div>
  );
}

function CourseCardTwo({ data }) {
  return (
    <div className="col-xl-3 col-lg-6 col-md-4 col-sm-6">
      <Link href={`/modLecture?id=${data.lectureSeq}`}>
        {/* <div>
          <Image
            width={460}
            height={325}
            className="rounded-8 w-1/1"
            src={"assets/img/courses/" + data.lectureImage}
            alt="image"
          />
        </div> */}

        <div className="pt-15">
          <div className="d-flex y-gap-10 justify-between items-center">
            <div className="text-14 lh-1">{data.member.name}</div>
          </div>

          <h3 className="text-16 fw-500 lh-15 mt-10">{data.lectureName}</h3>
        </div>
      </Link>
    </div>
  );
}
