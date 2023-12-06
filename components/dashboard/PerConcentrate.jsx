"use client";

import { resentCourses } from "@/data/courses";
import { states } from "@/data/dashboard";
import { teamMembers } from "@/data/instractors";
import { notifications } from "@/data/notifications";
import React, { useState, useEffect } from "react";
import FooterNine from "../layout/footers/FooterNine";
//import Charts from "./Charts";
import PieChartComponent from "./PieCharts";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import {
  LineChart,
  Tooltip,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function PerConcentrate() {
  const [dataset, setDataset] = useState([]);
  const [perData, setPerData] = useState([]);
  const [perVideoSeqList, setperVideoSeqList] = useState([]); // 강의 목록을 담는 상태
  const [perVideoSeq, setPerVideoSeq] = useState(""); // 선택한 강의의 ID 또는 다른 식별자

  // videoSeq가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    // videoSeq가 비어 있지 않은 경우에만 요청을 보냄
    axios
      .get("/api/users/per/analysis", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function(response) {
        console.log("그래프 점수", response);
        // const mappedData = response.data.map(item => ({
        //   name: item.timeline.toString(),
        //   value: item.concentration
        // }));

        // setDataset(mappedData);
        const perVideoSeqValues = [];
        for (const item of response.data) {
          // console.log("item: ",item);
          perVideoSeqValues.push(item[0].perVideoSeq);
        }
        // console.log("perVideoSeqValues:", perVideoSeqValues);
        // console.log("perVideoSeqValues",perVideoSeqValues);
        setperVideoSeqList(perVideoSeqValues);
        setPerData(response.data);
      })
      .catch(function(error) {
        console.log(error);
        alert("해당 강의를 듣고 이용해주세요");
        // 빈 그래프 출력해줘
        setPerData([]);
      });
  }, []);

  // 드롭다운 메뉴의 선택값이 변경될 때 호출되는 함수
  const handleDropdownChange = (selectedValue) => {
    console.log("클릭됨", selectedValue);
    setPerVideoSeq(selectedValue);
    console.log("perData[]:", perData);
    const selectedSeq = parseInt(selectedValue);
    const matchingData = perData.find((innerArray) =>
      innerArray.some((item) => item.perVideoSeq === selectedSeq)
    );
    const mappedData = matchingData.map((item) => ({
      name: item.timeline.toString(),
      value: item.concentration,
    }));
    // console.log("matchingData: ",matchingData);
    setDataset(mappedData);
    // console.log("videoSeq", videoSeq);
  };

  const chart = (interval) => (
    <ResponsiveContainer height={250} width="100%">
      {/* <LineChart data={dataset}>
        <CartesianGrid strokeDasharray="" />
        <XAxis tick={{ fontSize: 12 }} dataKey="name" interval={interval} />
        <YAxis
          tick={{ fontSize: 12 }}
          domain={[-1, 1]}
          tickCount={7}
          interval={interval}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          strokeWidth={2}
          stroke="#336CFB"
          fill="#336CFB"
          activeDot={{ r: 8 }}
          dot={false}
        />
      </LineChart> */}
      <AreaChart data={dataset}>
        <CartesianGrid strokeDasharray="" />
        <XAxis tick={{ fontSize: 12 }} dataKey="name" interval={interval} />
        <YAxis
          tick={{ fontSize: 12 }}
          domain={[-1, 1]}
          tickCount={7}
          interval={interval}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          strokeWidth={2}
          stroke="#336CFB"
          fill="#336CFB"
          activeDot={{ r: 8 }}
          baseValue={-2.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">집중도 분석표</h1>
          </div>
        </div>
        {/**

        <div className="row y-gap-30">
          {states.map((elm, i) => (
            <div key={i} className="col-xl-3 col-md-6">
              <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                <div>
                  <div className="lh-1 fw-500">{elm.title}</div>
                  <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                    ${elm.value}
                  </div>
                  <div className="lh-1 mt-25">
                    <span className="text-purple-1">${elm.new}</span> New Sales
                  </div>
                </div>

                <i className={`text-40 ${elm.iconClass} text-purple-1`}></i>
              </div>
            </div>
          ))}
        </div>
        */}
        <div className="row y-gap-30 pt-30">
          <div className="col-xl-8 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">집중도 분석표</h2>
                {/* 드롭다운 메뉴 */}
                <select
                  className="form-select"
                  value={perVideoSeq}
                  onChange={(e) => handleDropdownChange(e.target.value)}
                >
                  <option value="">강의 선택</option>
                  {Array.isArray(perVideoSeqList) &&
                  perVideoSeqList.length > 0 ? (
                    perVideoSeqList.map((seq) => (
                      <option key={seq} value={seq}>
                        강의 {seq}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      강의 없음
                    </option>
                  )}
                </select>
                {/**
                <div className="">
                  <div
                    id="ddtwobutton"
                    onClick={() => {
                      document
                        .getElementById("ddtwobutton")
                        .classList.toggle("-is-dd-active");
                      document
                        .getElementById("ddtwocontent")
                        .classList.toggle("-is-el-visible");
                    }}
                    className="dropdown js-dropdown js-category-active"
                  >
                    <div
                      className="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-1 border-light rounded-8 px-20 py-10 text-14 lh-12"
                      data-el-toggle=".js-category-toggle"
                      data-el-toggle-active=".js-category-active"
                    >
                      <span className="js-dropdown-title">강의 목록[강의 목록 선택지 1]</span>
                      <i className="icon text-9 ml-40 icon-chevron-down"></i>
                    </div>

                    <div
                      id="ddtwocontent"
                      className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                     >
                      <div className="text-14 y-gap-15 js-dropdown-list">
                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Animation
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Design
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Illustration
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Business
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="py-40 px-30">
                {/**<Charts />**/}
                {chart("preserveEnd")}
              </div>
            </div>
          </div>
          {/**
          <div className="col-xl-4 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Traffic</h2>
                <div className="">
                  <div
                    id="dd3button"
                    onClick={() => {
                      document
                        .getElementById("dd3button")
                        .classList.toggle("-is-dd-active");
                      document
                        .getElementById("dd3content")
                        .classList.toggle("-is-el-visible");
                    }}
                    className="dropdown js-dropdown js-category-active"
                  >
                    <div
                      className="dropdown__button d-flex items-center text-14 bg-white -dark-bg-dark-1 border-light rounded-8 px-20 py-10 text-14 lh-12"
                      data-el-toggle=".js-category-toggle"
                      data-el-toggle-active=".js-category-active"
                    >
                      <span className="js-dropdown-title">This Week</span>
                      <i className="icon text-9 ml-40 icon-chevron-down"></i>
                    </div>

                    <div
                      id="dd3content"
                      className="toggle-element -dropdown -dark-bg-dark-2 -dark-border-white-10 js-click-dropdown js-category-toggle"
                    >
                      <div className="text-14 y-gap-15 js-dropdown-list">
                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Animation
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Design
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Illustration
                          </a>
                        </div>

                        <div>
                          <a href="#" className="d-block js-dropdown-link">
                            Business
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-40 px-30">
                <PieChartComponent />
              </div>
            </div>
          </div>
          */}
        </div>

        <div className="row y-gap-30 pt-30"></div>
      </div>

      <FooterNine />
    </div>
  );
}
