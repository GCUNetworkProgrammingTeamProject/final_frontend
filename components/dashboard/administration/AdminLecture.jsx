"use client";

import React, {useEffect, useState} from "react";
import axios from "axios";
import FooterNine from "@/components/layout/footers/FooterNine";
import AdminLectureAddModify from "@/components/dashboard/administration/AdminLectureAddModify";
import {mediaUpload} from "@/data/dashboard";
import Image from "next/image";
import Link from 'next/link';


export default function Lecture() {
  const [lecture, setLecture] = useState([]);
  const [accessToken, setAccessToken] = useState('');
  const [isTeacher,setIsTeacher] = useState(false);
  const [updateLectures, setUpdateLectures] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    axios.get("/api/info", {headers: {
        Authorization: `Bearer ${token}`
      }})
        .then(function (response) {
        //   console.log(response);
          if(response.data.role == "ADMIN" || response.data.role == "LECTURER"){
            setIsTeacher(true);
            setAccessToken(token);
          }else{
            setIsTeacher(false);
            alert('강사만 접근 가능합니다');
            history.back(-1);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  },[]);
  
  const config = {
    headers: {
        Authorization: `Bearer ${accessToken}`
        }
    };

  useEffect(() => {

    // axios.get("/api/t/lectures",config)
    axios.get("/api/users/shoplist",config)
    // axios.get("/api/admin/lectures",config)
    .then(function (response) {
        // console.log(response);
        setLecture(response.data);
    }).catch(function (error) {
        // console.log(error);
      });
    },[accessToken, updateLectures]);

    // useEffect(() => {
    //     console.log(lecture);
    // },[lecture]);

    function handleLectureRemove(id) {
        console.log(lecture);
        console.log(id);

        axios.delete(`/api/t/lectures/${id}`, config)
        .then(function (response) {
            console.log(response.data);
            setUpdateLectures((prev) => !prev);
            alert(response.data);
        }).catch(function (error) {
            console.log(errer);
        });
    }

    function handleClick(item){
      console.log("item: "+item);
    }

    return (
      <div className="dashboard__main">
        <div className="dashboard__content bg-light-4">
          <div className="row pb-50 mb-10">
            <div className="col-auto">
              <h1 className="text-30 lh-12 fw-700">강의 관리</h1>
            </div>
          </div>
    
          {/* testing */}
          <div className="row y-gap-30 pt-30">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="py-20 px-30 border-bottom-light">
                {/* 등록 Button */}
                <Link
                      href={{
                        pathname: '/admin-lectureaddmodify',
                      }}
                    >
                      <button
                        className="button text-13 -sm -light-7 text-purple-1"
                        style={{ width: 'auto' }} // Set width to 'auto'
                      >
                        등록
                      </button>
                    </Link>
                <div className="row">
                  <div className="col-auto">
                  </div>
                </div>
    
                <table className="table">
                  <thead>
                    <tr>
                      <th>강의 이름</th>
                      <th>강의 내용</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {lecture.map((item, index) => (
                      <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.desc}</td>
                        <td>
                          <div style={{ display: 'flex' }}>
                            <Link
                              href={{
                                pathname: '/admin-lectureaddmodify',
                                query: { item: JSON.stringify(item) },
                              }}
                            >
                              <button className="button text-13 -sm -light-7 text-purple-1">
                                수정
                              </button>
                            </Link>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex' }}>
                            <button
                              className="button text-13 -sm -light-7 text-purple-1"
                              onClick={() => handleLectureRemove(item.id)}
                            >
                              삭제
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    
        <FooterNine />
      </div>
    );
    
}