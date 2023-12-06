"use client";
// 필요한 패키지 및 컴포넌트 import
import { coursesData } from "@/data/dashboard";
import React, { useEffect, useState } from "react";
//import CourseCardTwoDash from "./DashBoardCards/CourseCardTwoDash";
import FooterNine from "../layout/footers/FooterNine";
import Pagination from "../common/Pagination";
import axios from "axios";

// BookMarks 컴포넌트 정의
export default function BookMarks() {
  const [chatbotData, setChatbotData] = useState([]);
  const [videoSeqList, setVideoSeqList] = useState([]); // 강의 목록을 담는 상태
  const [videoSeq, setVideoSeq] = useState(""); // 선택한 강의의 ID 또는 다른 식별자

  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get("/api/info", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function(response) {
        // console.log("role",response);
        if (response.data.role) {
          setIsUser(true);
        } else {
          setIsUser(false);
          alert("로그인한 시용자만 접근 가능합니다");
          history.back(-1);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  // 컴포넌트가 처음 로드될 때 실행되는 useEffect
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    // 사용자가 로그인한 경우에만 실행
    if (accessToken) {
      // 서버에서 강의 목록을 가져와서 상태에 설정
      // 서버에서 강의 목록을 가져와서 상태에 설정
      axios
        .get("/api/users/getVideoSeq", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(function(response) {
          const videoList = response.data;

          // videoList가 배열이 아닌 경우에 대비
          const isArray = Array.isArray(videoList);
          setVideoSeqList(isArray ? videoList : []);

          // console.log("videoSeq", videoList);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }, []);

  // videoSeq가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    // videoSeq가 비어있지 않은 경우에만 실행
    if (videoSeq) {
      const accessToken = localStorage.getItem("accessToken");
      // 선택한 강의의 Q&A 데이터를 가져와서 상태에 설정
      axios
        .get(`/api/users/chatbot/${videoSeq}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            videoSeq: videoSeq,
          },
        })
        .then(function(response) {
          console.log("질문내역 가져옴");
          console.log(response.data);
          setChatbotData(response.data);
          // console.log("챗봇", chatbotData);
        })
        .catch(function(error) {
          // console.log(error);
          alert(error.response.data);
        });
    }
  }, [videoSeq]);

  // 드롭다운 메뉴의 선택값이 변경될 때 호출되는 함수
  const handleDropdownChange = (selectedValue) => {
    console.log("클릭됨", selectedValue);
    setVideoSeq(selectedValue);
    console.log("videoSeq", videoSeq);
  };

  // 컴포넌트의 렌더링 부분
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">챗봇 질문내역</h1>
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">
                  질문내역을 조회할 강의 선택
                </h2>
              </div>

              <div className="py-30 px-30">
                <div className="row y-gap-30">
                  <div className="col-12">
                    {/* 드롭다운 메뉴 */}
                    {Array.isArray(videoSeqList) && videoSeqList.length > 0 ? (
                      <select
                        className="form-select"
                        value={videoSeq}
                        onChange={(e) => handleDropdownChange(e.target.value)}
                      >
                        <option value="">강의 선택</option>
                        {videoSeqList.map((seq) => (
                          <option key={seq} value={seq}>
                            강의 {seq}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p>{videoSeqList}</p>
                    )}
                  </div>

                  {/* 챗봇 질문내역 매핑 및 출력 */}
                  <div>
                    <h3 className="text-20 lh-1 fw-500 mb-10">챗봇 질문내역</h3>
                    <ul>
                      {chatbotData.map((item, index) => (
                        <li key={index}>
                          <strong>질문:</strong> {item.question}
                          <br />
                          <strong>답변:</strong> {item.answer}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="row justify-center pt-30">
                  <div className="col-auto">
                    <Pagination />
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
