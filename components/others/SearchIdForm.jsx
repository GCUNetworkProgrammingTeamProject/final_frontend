"use client";

import Link from "next/link";
import {React,useState} from "react";
import axios from 'axios';


export default function SearchIdForm() {
  const [email, setEmail] = useState("");

  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  }
  const config = {
    headers: {
    "Content-Type": 'application/json',
    "Access-Control-Allow-Origin": "*"
    }
  }
  const body = {
    params: {
      email: email
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get("/api/id", body, config)
    .then(function (response) {
      console.log(response);
      if(response.data != "<h1>해당 아이디를 찾을 수 없습니다.</h1>"){
        alert("아이디: "+response.data);
      }else{
        alert('해당 이메일을 찾을 수 없습니다.');
      }
      window.location.href='/login';
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
              <h3 className="text-30 lh-13">아이디찾기</h3>
              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    email
                  </label>
                  <input required type="text" name="title" placeholder="email을 입력하세요" value = {email} onChange={handleInputEmail}/>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    아이디찾기
                  </button>
                </div>
              </form>
              <p className="mt-10">
                비밀번호를 까먹으셨나요?
                <Link href="/search-pw" className="text-purple-1">
                  비밀번호찾기
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
