"use client";

import { mediaUpload } from "@/data/dashboard";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Ad( id ) {
  const [image, setImage] = useState(mediaUpload[0].imgSrc);
  const [file, setFile] = useState("");
  const [adverTitle, setAdverTitle] = useState("");
  const [adverUrl, setAdverUrl] = useState("");




  function handleSetTitle(e) {
    setAdverTitle(e.target.value);
  }

  function handleSetUrl(e) {
    setAdverUrl(e.target.value);
  }

  const handleFile = (event) => {

    setFile(event.target.files[0]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFile(reader.result);
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {

  }, []);
  var data = {
    adverName: adverTitle,
    adverUrl: adverUrl,
    adverImage: file
  }

  const accessToken = localStorage.getItem('accessToken');

  function handleAdverCreate() {

    if(id.id != null) {
      axios.put("/admin/ad/" + id.id , data, {
        headers: {
          "Content-Type": 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`
        },
      })
          .then(function (response) {
            console.log(response.request.request)
            alert(response.request.response);
            window.location.href = '/admin';
          })
          .catch(function (error) {
            alert(error);
            window.location.href = '/admin';
          })
    }


    else {
      axios.post("/admin/ad", data, {
        headers: {
          "Content-Type": 'multipart/form-data',
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`
        },
      })
          .then(function (response) {
            console.log(response.request.request)
            alert(response.request.response);
            window.location.href = '/admin';
          })
          .catch(function (error) {
            alert(error);
            window.location.href = '/admin';
          })
    }
  }



  return (
      <div className="dashboard__main">
        <div className="dashboard__content bg-light-4">
          <div className="row pb-50 mb-10">
            <div className="col-auto">
              <h1 className="text-30 lh-12 fw-700">관리자 페이지</h1>
            </div>
          </div>

          <div className="row y-gap-30">
            <div className="col-12">
              <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                <div className="d-flex items-center py-20 px-30 border-bottom-light">
                  <h2 className="text-17 lh-1 fw-500">Media</h2>
                </div>

                <div className="py-30 px-30">
                  <div className="row y-gap-50">
                    <div className="col-12">
                      <h6 style={{marginBottom: "20px", marginTop: "20px"}}>광고 등록</h6>
                      <form
                          className="contact-form d-flex lg:flex-column"
                      >
                        <div className="w-1/1 ml-30 lg:ml-0 lg:mt-20">
                          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                            광고 제목
                          </label>
                          <input
                              required
                              type="text"
                              onChange={handleSetTitle}
                              placeholder="제목을 입력해주세요"
                          />
                          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                            내용
                          </label>
                          <input
                              required
                              type="text"
                              onChange={handleSetUrl}
                              placeholder="광고 내용을 입력해주세요"
                              style={{marginBottom:"30px"}}
                          />
                          <div className="form-upload col-12">
                            <div
                                className="relative shrink-0"
                                style={
                                  image
                                      ? {}
                                      : {backgroundColor: "#f2f3f4", width: 250, height: 200}
                                }

                            >
                              {image && (
                                  <Image
                                      width={735}
                                      height={612}
                                      className="w-1/1"
                                      style={{
                                        width: "250px",
                                        height: "200px",
                                        objectFit: "contain",
                                      }}
                                      src={image}
                                      alt="image"
                                  />
                              )}

                            </div>
                            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                              광고 등록
                            </label>
                            <div className="form-upload__wrap">
                              <input
                                  type="text"
                                  name="name"
                                  placeholder={"광고 등록.png"}
                              />
                              <button className="button -dark-3 text-white">
                                <label
                                    style={{cursor: "pointer"}}
                                    htmlFor="ad1"
                                >
                                  파일 업로드
                                </label>
                                <input
                                    required
                                    id="ad1"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFile}
                                    style={{display: "none"}}
                                />
                              </button>
                            </div>
                          </div>
                          <p className="mt-10">
                            광고 이미지를 등록하세요
                            <br/>
                            300x400 pixels; .jpg, .jpeg,. gif, or .png. 확장자가 권장됩니다
                          </p>
                          <div className="row y-gap-20 justify-between pt-30">
                            <div className="col-auto">
                              <button className="button -md -purple-1 text-white"
                                      style={{float: "right"}}
                                      type="button"
                                      onClick={handleAdverCreate}
                              >
                                제출
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}
