"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BlogsModify( id ) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [accessToken, setAccessToken] = useState('');

  useEffect (() => {
    var token = localStorage.getItem('accessToken');
    if(token != null){
      setAccessToken(token);
    }else{
      alert('로그인 해주세요');
      window.location.href = '/blog-list-1';
    }
  },[]);

  const config = {
    headers: {
      "Content-Type": 'application/json',
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`
    }
  }

  var data = {
    cpTitle: title,
    cpContent: content
  }


  const handleSetTitle = (value) => {
    setTitle(value.target.value);
  }

  const handleSetContent = (value) => {
    setContent(value.target.value);
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if (id.id == null) {
      axios.post("/community/new", data, config)
          .then(function (response) {
            alert(response.request.response);
            window.location.href = '/blog-list-1';
          })
          .catch(function (error) {
            console.log(error);
          })
    }

    else {
      axios.put("/community/" + id.id, data, config)
          .then(function (response) {
            alert(response.request.response);
            window.location.href = '/blog-list-1';
          })
          .catch(function (error) {
            console.log(error);
          })
    }
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">게시글 작성 / 수정</h1>
          </div>
        </div>

        <div className="row y-gap-60">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="py-30 px-30">
                <form
                  onSubmit={handleSubmit}
                  className="contact-form row y-gap-30"
                  action="#"
                >
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      제목
                    </label>

                    <input
                      required
                      type="text"
                      onChange={handleSetTitle}
                      placeholder="제목을 입력해주세요"
                    />
                  </div>

                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      내용
                    </label>

                    <textarea
                      required
                      onChange={handleSetContent}
                      placeholder="내용을 입력해주세요"
                      rows="14"
                    ></textarea>
                  </div>
                  <button className="button -md -purple-1 text-white" type="submit" >
                    제출
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
