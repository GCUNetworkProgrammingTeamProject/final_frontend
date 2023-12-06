"use client";

import React, { useState, useEffect, use } from "react";
import PageLinksTwo from "../common/PageLinksTwo";
import Link from "next/link";
import FooterNine from "../layout/footers/FooterNine";
import axios from "axios";

export default function Register() {
  const [isRegister, setIsRegister] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [teacherIntro, setTeacherIntro] = useState("");
  const [teacherCareer, setTeacherCareer] = useState("");
  const [teacherField, setTeacherField] = useState("");
  const [file, setFile] = useState("");
  const [saveFilePath, setSaveFilePath] = useState("");
  const [text, setText] = useState("강사 정보가 없습니다.");

  // @RequestPart TeacherDetailFormDto teacherDetailFormDto,
  // private Member member;
  // private String teacherIntro; // 강사 소개
  // private String teacherCareer; // 강사 경력
  // private String teacherField; // 강사 분야
  // private String saveFilePath;
  // @RequestPart("file") MultipartFile file,

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
          history.back(-1);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/users/teachers/detail", config)
      .then((response) => {
        console.log(response);
        if (response.data.teacherStatus == "WAIT") {
          setIsRegister(false);
          setText("강사로 등록되어있지 않습니다.");
        } else if (response.data.teacherStatus == "APPROVE") {
          setIsRegister(true);
          setText("강사입니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessToken]);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const handleTeacherIntro = (e) => {
    setTeacherIntro(e.target.value);
  };
  const handleTeacherCareer = (e) => {
    setTeacherCareer(e.target.value);
  };
  const handleTeacherField = (e) => {
    setTeacherField(e.target.value);
  };
  const handleImage = (e) => {
    setFile(e.target.files[0]);
    // console.log(e.target.files[0].name);
    setSaveFilePath(e.target.files[0].name);
  };
  var data = {
    teacherIntro: teacherIntro,
    teacherCareer: teacherCareer,
    teacherField: teacherField,
    saveFilePath: saveFilePath,
    file: file,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/users/teacher/detail", data, config)
      .then((response) => {
        console.log(response);
        alert(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">강사 등록</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4">
              <div className="py-30 px-30">
                <div className="row y-gap-15 justify-between items-center mb-30 border-bottom-light">
                  <h2 className="text-18 lh-1 fw-500">강사 신청 상태</h2>
                  <div className="row">
                    <div className="col-auto">
                      <p>{text}</p>
                    </div>
                  </div>
                </div>

                {!isRegister && (
                  <div className="row">
                    <div className="col-auto">
                      <div className="text-18 lh-1 fw-500 text-dark-1 mb-20">
                        강사 신청
                      </div>
                      <form
                        className="contact-form respondForm__form row y-gap-20 pt-30"
                        onSubmit={handleSubmit}
                      >
                        <div className="col-lg-6">
                          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                            강사 소개
                          </label>
                          <input
                            required
                            type="text"
                            name="title"
                            placeholder="소개를 적어주세요"
                            value={teacherIntro}
                            onChange={handleTeacherIntro}
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                            강사 경력
                          </label>
                          <input
                            required
                            type="text"
                            name="title"
                            placeholder="강사 경력을 적어주세요"
                            value={teacherCareer}
                            onChange={handleTeacherCareer}
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                            강사 분야
                          </label>
                          <input
                            required
                            type="text"
                            name="title"
                            placeholder="강사 분야를 적어주세요"
                            value={teacherField}
                            onChange={handleTeacherField}
                          />
                        </div>
                        <div className="col-lg-6">
                          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                            강사 사진
                          </label>
                          <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImage}
                          />
                        </div>

                        <div className="col-12">
                          <button
                            type="submit"
                            name="submit"
                            id="submit"
                            className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                          >
                            강사신청
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterNine />
    </div>
  );
}
