"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import FooterNine from "../../layout/footers/FooterNine";
import { mediaUpload } from "@/data/dashboard";
import Image from "next/image";

export default function Listing() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [index,setIndex] = useState(0);
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState("");
  const [type, setType] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get("/api/info", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function(response) {
        console.log(response);
        if (response.data.role == "ADMIN" || response.data.role == "LECTURER") {
          setIsTeacher(true);
        } else {
          setIsTeacher(false);
          alert("강사만 접근 가능합니다");
          history.back(-1);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const formData = new FormData();

  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  function updateTitle(value) {
    setTitle(value.target.value);
  }

  function updateContent(value) {
    setContent(value.target.value);
  }

  // function updateIndex(value){
  //   setIndex(value.target.value);
  // }

  function updatePrice(value) {
    setPrice(value.target.value);
  }

  const updateImage = (event) => {
    setFile(event.target.files[0]);
    console.log(file);
  };

  function updateType(value) {
    setType(value.target.value);
  }

  var data = {
    lectureName: title,
    lectureContent: content,
    lectureIndex: 1,
    lecturePrice: price,
    lectureImage: file,
    lecturesType: type,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axios
      .post("/api/t/lectures", data, config)
      .then(function(response) {
        // alert(response.request.response);
        console.log(response);
        // window.location.href = '/dashboard';
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700"></h1>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="contact-form row y-gap-30"
          action="#"
        >
          <div className="row y-gap-60">
            <div className="col-12">
              <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                <div className="py-30 px-30">
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      강의 제목
                    </label>

                    <input
                      onChange={updateTitle}
                      required
                      type="text"
                      placeholder=""
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      강의 설명
                    </label>

                    <textarea
                      onChange={updateContent}
                      required
                      placeholder=""
                      rows="7"
                    ></textarea>
                  </div>

                  {/* <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      강의 수
                    </label>

                    <input
                        onChange={updateIndex}
                        required
                        type="number"
                        placeholder=""
                    />
                  </div> */}

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      가격
                    </label>

                    <input
                      onChange={updatePrice}
                      required
                      type="number"
                      placeholder=""
                    />
                  </div>

                  <div className="col-12" required>
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      카테고리
                    </label>
                    <form onChange={updateType}>
                      <input
                        type="radio"
                        value="MATH"
                        id="MATH"
                        name="gender"
                      />
                      <label htmlFor="MATH" style={{ marginRight: "15px" }}>
                        수학
                      </label>
                      <input
                        type="radio"
                        value="ENGLISH"
                        id="ENGLISH"
                        name="gender"
                      />
                      <label htmlFor="ENGLISH" style={{ marginRight: "15px" }}>
                        영어
                      </label>
                      <input
                        type="radio"
                        value="KOREAN"
                        id="KOREAN"
                        name="gender"
                      />
                      <label htmlFor="KOREAN" style={{ marginRight: "15px" }}>
                        국어
                      </label>
                      <input
                        type="radio"
                        value="SCIENCE"
                        id="SCIENCE"
                        name="gender"
                      />
                      <label htmlFor="SCIENCE" style={{ marginRight: "15px" }}>
                        과학
                      </label>
                      <input
                        type="radio"
                        value="SOCIAL"
                        id="SOCIAL"
                        name="gender"
                      />
                      <label htmlFor="SOCIAL" style={{ marginRight: "15px" }}>
                        사회
                      </label>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                <div className="d-flex items-center py-20 px-30 border-bottom-light">
                  <h2 className="text-17 lh-1 fw-500">File</h2>
                </div>
                <div className="py-30 px-30">
                  <div className="row y-gap-50">
                    <div className="col-12">
                      <form className="contact-form d-flex lg:flex-column">
                        <div className="w-1/1 ml-30 lg:ml-0 lg:mt-20">
                          <div className="form-upload col-12">
                            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                              강의 썸네일 이미지
                            </label>
                            <div className="form-upload__wrap">
                              <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={updateImage}
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="button -md -purple-1 text-white"
            style={{ float: "right" }}
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <FooterNine />
    </div>
  );
}
