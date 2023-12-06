"use client";

import React, { useEffect, useState } from "react";
import FooterNine from "../layout/footers/FooterNine";
import PageLinksTwo from "../common/PageLinksTwo";
import axios from "axios";

export default function Survey() {
  const [purchaseList, setPurchaseList] = useState([]);
  const [subscribeList, setSubscribeList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("/api/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function(response) {
        if (response.data.role) {
        } else {
          alert("로그인한 사용자만 접근 가능합니다");
          history.back(-1);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    axios
      .get("/api/users/order", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function(response) {
        setPurchaseList(response.data);
        console.log("token", accessToken);
        console.log("response", response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    // 강의 결제내역 조회
    axios
      .get("/api/users/order", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function(response) {
        setPurchaseList(response.data || []);
        // console.log("response", response);
      })
      .catch(function(error) {
        console.log(error);
      });
    // 구독권 결제내역 조회
    axios
      .get("/api/users/subscribe", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function(response) {
        setSubscribeList(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <h1 className="text-30 lh-12 fw-700 mb-40">결제내역</h1>
        <table className="custom-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>카테고리</th>
              <th>제목</th>
              <th>설명</th>
              <th>강사</th>
              <th>가격</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(purchaseList) &&
              purchaseList.map((elm, i) => (
                <tr key={i}>
                  <td>{elm.lectureSeq}</td>
                  <td>{elm.lecturesType}</td>
                  <td>{elm.lectureName}</td>
                  <td>{elm.lectureContent}</td>
                  <td>{elm.member.name}</td>
                  <td>{elm.lecturePrice}원</td>
                </tr>
              ))}
          </tbody>
        </table>

        <h1 className="text-30 lh-12 fw-700 mt-40 mb-40">
          집중도 분석권 결제내역
        </h1>

        <table className="custom-table">
          <thead>
            <tr>
              <th>시작일</th>
              <th>종료일</th>
              <th>분석권 상태</th>
            </tr>
          </thead>
          <tbody>
            {subscribeList.map((elm, i) => (
              <tr key={i}>
                <td>{elm.startDate}</td>
                <td>{elm.endDate}</td>
                <td>{elm.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FooterNine />
    </div>
  );
}
