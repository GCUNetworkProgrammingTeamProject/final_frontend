"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import FooterNine from "@/components/layout/footers/FooterNine";
import AdminLectureAddModify from "@/components/dashboard/administration/AdminLectureAddModify";
import { mediaUpload } from "@/data/dashboard";
import Image from "next/image";
import Link from 'next/link';

export default function Lecture() {
  const [lecture, setLecture] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    axios.get("/api/info", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(function (response) {
        if (response.data.role === "ADMIN" || response.data.role === "LECTURER") {
          setIsTeacher(true);
          setAccessToken(token);
        } else {
          setIsTeacher(false);
          alert('강사만 접근 가능합니다');
          history.back(-1);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  useEffect(() => {
    axios.get("/admin/Teacher", config)
      .then(function (response) {
        console.log(response);
        setLecture(response.data);
        // setLecture([]);
      })
      .catch(function (error) {
        console.log(error);
        setLecture([]);
      });
  }, [accessToken]);

  function handleAcceptTeacher(e, item){
    e.preventDefault();
    var data = {
      reason: "우리 강의에 적합함",
      teacherDetailSeq: item.teacherDetailSeq,
      status: 0
    }
    axios.put("/admin/Teacher",data)
    .then(function (response) {
      alert(response.data);
      window.location.href = "/admin-teacher";
    }).catch(function (error) {
      console.log(error);
    });
  }

  function handleRejectTeacher(e, item){
    e.preventDefault();
    var data = {
      reason: "우리 강의에 부적합함",
      teacherDetailSeq: item.teacherDetailSeq,
      status: 1
    }
    axios.put("/admin/Teacher",data)
    .then(function (response) {
      alert(response.data);
      window.location.href = "/admin-teacher";
    }).catch(function (error) {
      console.log(error);
    });

  }


  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">강사 신청 관리</h1>
          </div>
        </div>
  
        <div className="row y-gap-30 pt-30">
          <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
            <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
              {/* <p>강사 신청한 사람 다 불러오고 옆에 수락하기/거절하기(사유) 적고 버튼 클릭하기</p> */}
            </div>
            <div className="px-30 pt-20">
              <ul>
                {lecture.map((item, index) => (
                  <div key={index}>
                    <li>
                      <h2>강사 이름: {item.teacherName}</h2>
                      <p>신청번호: {item.teacherDetailSeq}</p>
                      <p>강사 소개: {item.teacherIntro}</p>
                      <p>강사 경력: {item.teacherCareer}</p>
                      <p>강사 분야: {item.teacherField}</p>
                      <button
                        className="button text-13 -sm -light-7 text-purple-1"
                        style={{ float: "right", marginRight: "20px", marginTop: "10px" }}
                        onClick={(e) => handleAcceptTeacher(e, item)}>
                        수락
                      </button>
                      <button
                        className="button text-13 -sm -light-7 text-red-1"
                        style={{ float: "right", marginRight: "20px", marginTop: "10px" }}
                        onClick={(e) => handleRejectTeacher(e, item)}>
                        거절
                      </button>
                    </li>
                    {index < lecture.length - 1 && <hr />}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <FooterNine />
    </div>
  );
  
}
