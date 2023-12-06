"use client";

import Link from "next/link";
import {React, useState} from "react";
import axios from 'axios';


export default function SignUpForm() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");

  const handleInputName = (e) => {
    setName(e.target.value);
  }
  const handleInputId = (e) => {
    setId(e.target.value);
  }
  const handleInputPw = (e) => {
    setPw(e.target.value);
  }
  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  }

  var data = {
    name : name,
    id : id,
    password : pw,
    email : email,
    role : "1"
}
const config = {
    headers: {
    "Content-Type": 'application/json',
    "Access-Control-Allow-Origin": "*"
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/register", data , config)
        .then(function (response) {
          alert(response.request.response);
          window.location.href="/";
        })
        .catch(function (error) {
          console.log(error);
        });
  };
  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-8 col-lg-9">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">강사 회원가입</h3>
              <p className="mt-10">
                이미 아이디가 있으신가요?
                <Link href="/login" className="text-purple-1">
                  로그인
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    이름
                  </label>
                  <input required type="text" name="title" placeholder="이름을 입력하세요" value={name} onChange={handleInputName}/>
                </div>
                {/* <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    주민 번호
                  </label>
                  <input required type="text" name="title" placeholder="주민번호를 입력하세요" />
                </div> */}
                {/* <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    전화번호
                  </label>
                  <input required type="text" name="title" placeholder="전화번호를 입력하세요" />
                </div> */}
                {/* <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    주소
                  </label>
                  <input required type="text" name="title" placeholder="주소를 입력하세요" />
                </div> */}
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    e-mail
                  </label>
                  <input required type="text" name="title" placeholder="e-mail을 입력하세요" value={email} onChange={handleInputEmail}/>
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    ID
                  </label>
                  <input required type="text" name="title" placeholder="ID를 입력하세요" value={id} onChange={handleInputId}/>
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    비밀번호
                  </label>
                  <input required type="text" name="title" placeholder="비밀번호를 입력하세요" value={pw} onChange={handleInputPw}/>
                </div>
                {/* <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    비밀번호 확인
                  </label>
                  <input required type="text" name="title" placeholder="비밀번호를 다시 입력하세요" />
                </div> */}
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    회원가입
                  </button>
                </div>
              </form>
              <p className="mt-10">
                학생 회원가입을 원하시나요?
                <Link href="/signup" className="text-purple-1">
                  학생 회원가입
                </Link>
              </p>
              {/**
              <div className="lh-12 text-dark-1 fw-500 text-center mt-20">
                Or sign in using
              </div>

              <div className="d-flex x-gap-20 items-center justify-between pt-20">
                <div>
                  <button className="button -sm px-24 py-20 -outline-blue-3 text-blue-3 text-14">
                    Log In via Facebook
                  </button>
                </div>
                <div>
                  <button className="button -sm px-24 py-20 -outline-red-3 text-red-3 text-14">
                    Log In via Google+
                  </button>
                </div>
              </div>
              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
