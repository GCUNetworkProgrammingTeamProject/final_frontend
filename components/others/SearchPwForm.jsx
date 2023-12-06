"use client";

import Link from "next/link";
import {React,useState} from "react";
import axios from 'axios';


export default function SearchIdForm() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleInputName = (e) => {
    setName(e.target.value);
  }
  const handleInputId = (e) => {
    setId(e.target.value);
  }
  const handleInputEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleInputPw = (e) => {
    setPw(e.target.value);
  }
  const config = {
    headers: {
    "Content-Type": 'application/json',
    "Access-Control-Allow-Origin": "*"
    }
  }
  const body = {
    params: {
            memberId: id,
            memberEmail: email,
            memberName: name,
            password: pw
        }
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get("/api/password", body , config)
    .then(function (response) {
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
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-6 col-lg-8">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">비밀번호변경</h3>
              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    이름
                  </label>
                  <input required type="text" name="title" placeholder="이름을 입력하세요" value = {name} onChange={handleInputName}/>
                </div>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    email
                  </label>
                  <input required type="text" name="title" placeholder="email을 입력하세요" value = {email} onChange={handleInputEmail}/>
                </div>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    id
                  </label>
                  <input required type="text" name="title" placeholder="id를 입력하세요" value = {id} onChange={handleInputId}/>
                </div>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    pw
                  </label>
                  <input required type="text" name="title" placeholder="바꿀 비밀번호를 입력하세요" value = {pw} onChange={handleInputPw}/>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    비밀번호변경
                  </button>
                </div>
              </form>
              <p className="mt-10">
                아이디를 까먹으셨나요?
                <Link href="/search-id" className="text-purple-1">
                  아아디찾기
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
