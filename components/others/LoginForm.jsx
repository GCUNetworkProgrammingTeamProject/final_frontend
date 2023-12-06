"use client";

import Link from "next/link";
import {React,useState} from "react";
import axios from 'axios';


export default function LoginForm() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleInputId = (e) => {
    setId(e.target.value);
  }
  const handleInputPw = (e) => {
    setPw(e.target.value);
  }
  var data = {
    id : id,
    pw : pw
  }
  const config = {
    headers: {
    "Content-Type": 'application/json',
    "Access-Control-Allow-Origin": "*"
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/login", {
      id: id,
      password: pw
    }, config)
    .then(function (response) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      // console.log(response);
      // console.log(response.data);
      if(response.data != "<h1>자격 증명에 실패하였습니다.</h1>"){
        alert('로그인 성공!');
      }else{
        alert('로그인 실패');
      }
      // console.log(localStorage.getItem('accessToken'), localStorage.getItem('refreshToken'));
      window.location.href='/';
    })
    .catch(function (error) {
      console.log(error);
    });

  };
  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-6 col-lg-8">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">로그인</h3>
              <p className="mt-10">
                아직 계정이 없으신가요?
                <Link href="/signup" className="text-purple-1">
                  회원가입하기
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    ID
                  </label>
                  <input required type="text" name="title" placeholder="ID를 입력하세요" value = {id} onChange={handleInputId}/>
                </div>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    비밀번호
                  </label>
                  <input
                    required
                    type="password"
                    name="title"
                    placeholder="비밀번호를 입력하세요"
                    value = {pw}
                    onChange={handleInputPw}
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    로그인
                  </button>
                </div>
              </form>
              <p className="mt-10">
                아이디를 까먹으셨나요?
                <Link href="/search-id" className="text-purple-1">
                  아이디찾기
                </Link>
              </p>
              <p className="mt-10">
                비밀번호를 까먹으셨나요?
                <Link href="/search-pw" className="text-purple-1">
                  비밀번호찾기
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
