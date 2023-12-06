"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  Tooltip,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "1", value: 148 },
  { name: "2", value: 100 },
  { name: "3", value: 205 },
  { name: "4", value: 110 },
  { name: "5", value: 165 },
  { name: "6", value: 145 },
  { name: "7", value: 180 },
  { name: "8", value: 156 },
  { name: "9", value: 148 },
  { name: "10", value: 220 },
  { name: "11", value: 180 },
  { name: "12", value: 245 },
];

const Charts = () => {
  const [dataset, setDataset] = useState([]);
  const [videoSeqList, setVideoSeqList] = useState([]); // 강의 목록을 담는 상태
  const [videoSeq, setVideoSeq] = useState(""); // 선택한 강의의 ID 또는 다른 식별자

  

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    // 서버에서 강의 목록을 가져와서 상태에 설정
    axios.get("/api/users/getVideoSeq", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(function (response) {
      const videoList = response.data;
      console.log("videoseq", videoList);
      setVideoSeqList(videoList);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  // videoSeq가 변경될 때마다 실행되는 useEffect
  useEffect(() => {
    // videoSeq가 비어있지 않은 경우에만 실행
      const accessToken = localStorage.getItem('accessToken');
      const videoSeq = 1;
      // 선택한 강의의 Q&A 데이터를 가져와서 상태에 설정
      axios.get(`/api/users/analysis/${videoSeq}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          videoSeq: videoSeq
        }
      })
      .then(function (response) {
        console.log("그래프 점수", response.data);
        const mappedData = response.data.map(item => ({
          name: item.timeline.toString(), // timeline을 문자열로 변환 (이미 문자열이 아닌 경우)
          value: item.concentration
        }));
  
        // console.log("그래프 점수", mappedData);
  
        // 매핑된 데이터로 dataset 상태 설정
        setDataset(mappedData);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [videoSeq]);

  const chart = (interval) => (
    <ResponsiveContainer height={250} width="100%">
      {/* <LineChart data={dataset}> */}
      <LineChart data={dataset}>
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
        />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <>
      {chart("preserveEnd")}
      {/* {chart('preserveStart')}
      {chart('preserveStartEnd')}
      {chart('equidistantPreserveStart')}
      {chart(1)} */}
    </>
  );
};

export default Charts;
