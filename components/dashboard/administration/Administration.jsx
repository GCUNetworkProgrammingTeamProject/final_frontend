"use client";

import { mediaUpload } from "@/data/dashboard";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import FooterNine from "../../layout/footers/FooterNine";
import axios from "axios";
import UserList from "./UserList";
import LoginForm from "@/components/others/LoginForm";
import { List } from "@mui/material";
import Link from "next/link";
import PurchaseList from "./PurchaseList";

const tabs = [
  { id: 1, title: "강의관리" },
  { id: 2, title: "회원관리" },
  { id: 3, title: "광고등록" },
  { id: 4, title: "배너관리" },
  { id: 5, title: "결제 관리" },
  // { id: 6, title: "강의별 집중도 분석표" },
  // { id: 7, title: "강의별 챗봇 질문 내역" },
];

export default function Administration() {
  const [lectureList, setLectureList] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [isAdmin, setisAdmin] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
    if (token) {
      axios
        .get("/api/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function(response) {
          if (response.data.role == "ADMIN") {
            setisAdmin(true);
          } else {
            setisAdmin(false);
            alert("어드민만 접근 가능합니다");
            window.location.href = "/";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      setisAdmin(false);
      alert("어드민만 접근 가능합니다");
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    axios
      .get("/api/users/shoplist", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setLectureList(response.data);
      })
      .catch((error) => {
        console.log("에러 : ", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/admin/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        // memberPage에서 content와 totalPages 추출
        const { content, totalPages } = response.data;
        setUserList(content); // content를 userList로 설정
        setTotalPages(totalPages); // 전체 페이지 수 설정
      })
      .catch((error) => {
        console.log("에러 : ", error);
      });
  }, [accessToken]);

  useEffect(() => {
    const url = "/admin/ad";
    axios
      .get(url)
      .then(function(response) {
        setAdverList(response.data);
      })
      .catch(function(error) {});
  }, []);

  useEffect(() => {
    const url = "/admin/checkUsers";
    axios
      .get(url)
      .then(function(response) {
        setUserCount(response.data);
      })
      .catch(function(error) {});
  }, []);

  //페이지 변경시 userList를 업데이트
  const handlePageChange = (page) => {
    setCurrentPage(page);
    axios
      .get(`/admin/users?page=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const { content, totalPages } = response.data;
        setUserList(content);
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.log("에러 : ", error);
      });
  };

  const handleDelete = (lecture) => {
    const lectureId = lecture.id;
    axios
      .delete(`/admin/lectures/${lectureId}`)
      .then((response) => {
        console.log(response);
        // 성공적으로 삭제한 후 lectureList를 업데이트하십시오.
        setLectureList((prevLectureList) =>
          prevLectureList.filter((item) => item.id !== lectureId)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [image, setImage] = useState(mediaUpload[0].imgSrc);
  const [file, setFile] = useState("");
  const [adverList, setAdverList] = useState([]);
  const [adverTitle, setAdverTitle] = useState("");
  const [adverUrl, setAdverUrl] = useState("");
  const [checkedItem, setCheckedItem] = useState([]);

  function handleRecAdver(e, c) {
    if (c === true) c = 1;
    else if (c === false) c = 0;

    axios
      .post(
        "/admin/ad/select/",
        {
          adverSeq: e,
          isBanner: c,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function(response) {
        console.log(response.request.response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function handleAdverDelete(e) {
    axios
      .delete("/admin/ad/" + e, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function(response) {
        console.log(response.request.response);
        window.location.href = "/admin";
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  function handleRecLecture(e, c) {
    if (c === true) {
      axios
        .post("/admin/lectures/rec/" + e)
        .then(function(response) {
          console.log(response.request.response);
          console.log(lectureList);
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      axios
        .delete("/admin/lectures/rec/" + e)
        .then(function(response) {
          console.log(response.request.response);
          console.log(lectureList);
        })
        .catch(function(error) {
          console.log(error);
        });
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
              <div className="tabs -active-purple-2 js-tabs pt-0">
                <div className="tabs__controls d-flex x-gap-30 flex-wrap items-center pt-20 px-20 border-bottom-light js-tabs-controls">
                  {tabs.map((elm, i) => (
                    <div
                      onClick={() => setActiveTab(elm.id)}
                      key={i}
                      className=""
                    >
                      <button
                        className={`tabs__button text-light-1 js-tabs-button ${
                          activeTab == elm.id ? "is-active" : ""
                        } `}
                        type="button"
                      >
                        {elm.title}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="tabs__content py-40 px-30 js-tabs-content">
                  {/*강의 탭*/}
                  <div
                    className={`tabs__pane -tab-item-1  ${
                      activeTab == 1 ? "is-active" : ""
                    } `}
                  >
                    <div>
                      <ul>
                        {lectureList.map((lecture) => (
                          <li
                            key={lecture.id}
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "10px",
                            }}
                          >
                            <LectureList
                              lecture={lecture}
                              handleDelete={handleDelete}
                              handleRecLecture={handleRecLecture}
                              rec={lecture.lectureRecommend}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 유저 탭*/}
                  <div
                    className={`tabs__pane -tab-item-2  ${
                      activeTab == 2 ? "is-active" : ""
                    } `}
                  >
                    <div>
                      <h2
                        style={{
                          textAlign: "center",
                          marginBottom: "20px",
                          marginTop: "0px",
                        }}
                      >
                        유저 목록
                      </h2>
                      <h6
                        style={{
                          textAlign: "right",
                          marginBottom: "20px",
                          marginTop: "0px",
                        }}
                      >
                        현재 접속자 수 : {userCount}
                      </h6>
                      <ul>
                        {userList.map((users) => (
                          <li
                            key={users.id}
                            style={{
                              borderBottom: "1px solid black",
                              marginBottom: "10px",
                            }}
                          >
                            <UserList users={users} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/*유저탭 끝*/}

                  {/* 광고 탭*/}
                  <div
                    className={`tabs__pane -tab-item-3  ${
                      activeTab == 3 ? "is-active" : ""
                    } `}
                  >
                    <div className="row y-gap-50">
                      <h2
                        style={{
                          textAlign: "center",
                          marginBottom: "20px",
                          marginTop: "0px",
                        }}
                      >
                        광고 목록
                      </h2>

                      <Link href={`/admin-advertisement`}>
                        <button
                          className="button text-13 -sm -light-7 text-purple-1"
                          style={{ float: "right", marginRight: "20px" }}
                        >
                          등록
                        </button>
                      </Link>

                      <div className="col-12">
                        {adverList.map((elm, i) => (
                          <div key={i} className="col-lg-4 col-md-6">
                            <div className="blogCard__content mt-20">
                              <Image
                                width={735}
                                height={612}
                                className="w-1/1"
                                style={{
                                  width: "250px",
                                  height: "200px",
                                  objectFit: "contain",
                                }}
                                src={require(`../../../public/assets/img/courses/${elm.adverImage}`)}
                                alt="image"
                              />

                              <button
                                onClick={() => {
                                  handleAdverDelete(elm.adverSeq);
                                }}
                                type="submit"
                                className="button text-13 -sm -light-7 text-purple-1"
                                style={{ float: "right", marginTop: "10px" }}
                              >
                                삭제
                              </button>
                              <Link
                                href={`dshb-administration-ad?id=${elm.adverSeq}`}
                              >
                                <button
                                  className="button text-13 -sm -light-7 text-purple-1"
                                  style={{
                                    float: "right",
                                    marginRight: "20px",
                                    marginTop: "10px",
                                  }}
                                >
                                  수정
                                </button>
                              </Link>
                              <h4 className="blogCard__title text-20 lh-15 fw-500 mt-5">
                                제목 : {elm.adverName}
                              </h4>
                              <div className="blogCard__category">
                                <p>내용 : {elm.adverUrl}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                        <hr />
                      </div>
                    </div>
                  </div>
                  {/*광고탭 끝*/}
                  {/*배너탭 시작*/}
                  <div
                    className={`tabs__pane -tab-item-4  ${
                      activeTab == 4 ? "is-active" : ""
                    } `}
                  >
                    <div>
                      <div className="row y-gap-50">
                        <h2
                          style={{
                            textAlign: "center",
                            marginBottom: "20px",
                            marginTop: "0px",
                          }}
                        >
                          배너 관리
                        </h2>
                        <div className="col-12">
                          {adverList.map((elm, i) => (
                            <div key={i} className="col-lg-4 col-md-6">
                              <div className="blogCard__content mt-20">
                                {
                                  <Image
                                    width={735}
                                    height={612}
                                    className="w-1/1"
                                    style={{
                                      width: "250px",
                                      height: "200px",
                                      objectFit: "contain",
                                    }}
                                    src={require(`../../../public/assets/img/courses/${elm.adverImage}`)}
                                    alt="image"
                                  />
                                }
                                <h4 className="blogCard__title text-20 lh-15 fw-500 mt-5">
                                  {elm.banner ? (
                                    <input
                                      type="checkbox"
                                      value={elm.adverSeq}
                                      style={{ marginRight: "10px" }}
                                      defaultChecked="true"
                                      onChange={(e) => {
                                        handleRecAdver(
                                          e.target.value,
                                          e.target.checked
                                        );
                                      }}
                                    ></input>
                                  ) : (
                                    <input
                                      type="checkbox"
                                      value={elm.adverSeq}
                                      style={{ marginRight: "10px" }}
                                      onChange={(e) => {
                                        handleRecAdver(
                                          e.target.value,
                                          e.target.checked
                                        );
                                      }}
                                    ></input>
                                  )}
                                  제목 : {elm.adverName}
                                </h4>

                                <p>내용 : {elm.adverUrl}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*배너탭 끝*/}
                  {/*결제관리 시작 */}
                  <div
                    className={`tabs__pane -tab-item-5  ${
                      activeTab == 5 ? "is-active" : ""
                    } `}
                  >
                    <div>
                      <div className="row y-gap-50">
                        <h2
                          style={{
                            textAlign: "center",
                            marginBottom: "20px",
                            marginTop: "0px",
                          }}
                        >
                          결제 관리
                        </h2>
                        <div className="col-12">
                          <PurchaseList />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterNine />
    </div>
  );
}

function LectureList({ lecture, handleRecLecture, handleDelete, rec }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
      }}
    >
      {rec ? (
        <input
          type="checkbox"
          value={lecture.id}
          defaultChecked="true"
          style={{ marginRight: "10px" }}
          onChange={(e) => {
            handleRecLecture(e.target.value, e.target.checked);
          }}
        ></input>
      ) : (
        <input
          type="checkbox"
          value={lecture.id}
          style={{ marginRight: "10px" }}
          onChange={(e) => {
            handleRecLecture(e.target.value, e.target.checked);
          }}
        ></input>
      )}

      <div style={{ flexGrow: 1 }}>
        <h3>강의제목 : {lecture.title}</h3>
        <p>강의 내용 : {lecture.desc}</p>
      </div>

      <button
        className="button -md -purple-1 text-white"
        onClick={() => handleDelete(lecture)}
        style={{
          fontSize: "0.75em",
          padding: "3px 8px",
          height: "30px",
          lineHeight: "30px",
        }}
      >
        삭제
      </button>
    </div>
  );
}
