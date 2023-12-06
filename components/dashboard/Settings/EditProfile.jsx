"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function EditProfile({ activeTab }) {


  const [pw, setPw] = useState("");
  const [new_pw, setNewPw] = useState("");
  const [new_pw_r, setNewPwR] = useState("");

  const [namePlaceholder, setNamePlaceholder] = useState('');
  const [emailPlaceholder, setEmailPlaceholder] = useState('');

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleInputPw = (e) => {
    setPw(e.target.value);
  }
  const handleInputNewPw = (e) => {
    setNewPw(e.target.value);
  }
  const handleInputNewPwR = (e) => {
    setNewPwR(e.target.value);
  }
  const handleInputName = (e) => {
    setName(e.target.value);
  }
  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  }
  const accessToken = localStorage.getItem('accessToken');

  useEffect (() => {
    const accessToken = localStorage.getItem('accessToken');
    
    axios.get("/api/info", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(function (response) {
      console.log("resopnse", response.data);
      console.log("name", response.data.name);
      console.log("email", response.data.email);
      setNamePlaceholder(response.data.name);
      setEmailPlaceholder(response.data.email);
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }, []);


  const config = {
    headers: {
    "Content-Type": 'application/json',
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${accessToken}`
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();   
    
    if (new_pw === new_pw_r) {
      const body = {
        name: name,
        email: email,
        password: new_pw,
      };
  
      axios.patch("/api/users/update", body, config)
        .then(function (response) {
          console.log(response);
          alert(response.data);
        })
        .catch(function (error) {
          console.log(error);
          alert('오류');
        });
    } else {
      // 새로운 비밀번호와 확인 비밀번호가 다를 경우에 경고 메시지를 표시할 수 있습니다.
      alert('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div
      className={`tabs__pane -tab-item-1 ${activeTab == 1 ? "is-active" : ""} `}
    >
      

      <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              이름
            </label>

            <input required type="text" placeholder={namePlaceholder} value = {name} onChange={handleInputName} />
          </div>

          <div className="col-md-6">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              이메일
            </label>

            <input required type="text" placeholder={emailPlaceholder}  value = {email} onChange={handleInputEmail}/>
          </div>
        {/** 
        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            현재 비밀번호
          </label>

          <input required type="text" placeholder="현재 비밀번호를 입력하세요" value = {pw} onChange={handleInputPw} />
        </div>
        */}
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
              프로필 업데이트하기
          </button>
        </div>
      </form>
    </div>

  );
}
