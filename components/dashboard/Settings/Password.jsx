"use client";

import Link from "next/link";
import {React,useState} from "react";
import axios from 'axios';

export default function Password({ activeTab }) {
  const [pw, setPw] = useState("");
  const [new_pw, setNewPw] = useState("");
  const [new_pw_r, setNewPwR] = useState("");

  const handleInputPw = (e) => {
    setPw(e.target.value);
  }
  const handleInputNewPw = (e) => {
    setNewPw(e.target.value);
  }
  const handleInputNewPwR = (e) => {
    setNewPwR(e.target.value);
  }
  const accessToken = localStorage.getItem('accessToken');
  const config = {
    headers: {
    "Content-Type": 'application/json',
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${accessToken}`
    }
  }
  const body = {
    params: {
            db_pw: pw
        }
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get("/api/password", body , config)
    .then(function (response) {
      if (db_pw == pw) {

      }
      else {
        
      }
      console.log(response);
      alert(response.data);
      window.location.href='/login';
    })
    .catch(function (error) {
      console.log(error);
      alert('오류');
    });
  };


  
  return (
    <div
      className={`tabs__pane -tab-item-2 ${activeTab == 2 ? "is-active" : ""} `}
    >
      <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            현재 비밀번호
          </label>

          <input required type="text" placeholder="현재 비밀번호를 입력하세요" value = {pw} onChange={handleInputPw} />
        </div>

        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            새 비밀번호
          </label>

          <input required type="text" placeholder="새 비밀번호를 입력하세요" value = {new_pw} onChange={handleInputNewPw} />
        </div>

        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            새 비밀번호 확인
          </label>

          <input required type="text" placeholder="새 비밀번호를 다시 입력하세요"value = {new_pw_r} onChange={handleInputNewPwR} />
        </div>

        <div className="col-12">
          <button className="button -md -purple-1 text-white">
            비밀번호 저장
          </button>
        </div>
      </form>
    </div>
  );
}
