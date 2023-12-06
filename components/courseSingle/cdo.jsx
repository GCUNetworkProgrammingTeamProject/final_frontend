"use client";

import Star from "../common/Star";
import React, {useState, useEffect} from "react";
import CourseContent from "./CourseContentCustom";
import Qna from "./Qna";
import Chatbot from "./Chatbot";
import axios from 'axios';
//import ChatBot from 'react-simple-chatbot';


const menuItems = [
  {id: 1, href: "#overview", text: "Overview", isActive: true},
  {id: 2, href: "#course-content", text: "Course Content", isActive: false},
  {id: 3, href: "#instructors", text: "Instructors", isActive: false},
  {id: 4, href: "#reviews", text: "Reviews", isActive: false},
];

export default function CourseDetailsOne(props) {

  const [pageItem, setPageItem] = useState([]);
  const [coursesData, setCoursesData] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [video, setVideo] = useState({});


  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setAccessToken(token);
  }, []);


  // video 가져오는 코드
  // 컴포넌트가 처음 로드될 때 실행되는 useEffect
  useEffect(() => {
    // 서버에서 강의 목록을 가져와서 상태에 설정
    axios.get(`/api/users/lectures/${props.id}`, {
      // headers: {
      //     Authorization: `Bearer ${accessToken}`
      // }
    })
        .then(function (response) {
          setVideo(response.data[0]);
        })
        .catch(function (error) {
          console.log(error);
        });
  }, [props.id]);

  //
  useEffect(() => {
    axios.get(`/api/lectures/detail/${props.id}`, {
      // headers: {
      //     Authorization: `Bearer ${accessToken}`
      // }
    })
        .then(function (response) {
          const Data = {
            id: response.data.id,
            imageSrc: response.data.imageSrc,
            authorImageSrc: "/assets/img/general/avatar-1.png",
            title: response.data.title,
            rating: 4.3,
            ratingCount: 1991,
            lessonCount: response.data.lessonCount,
            duration: 1320,
            level: "Beginner",
            originalPrice: response.data.originalPrice,
            discountedPrice: 79,
            paid: true,
            category: response.data.category,
            state: "Popular",
            language: "Korean", // 오타 수정: languange -> language
            authorName: response.data.authorName,
            viewStatus: "Good",
            difficulty: "Easy",
            desc: response.data.desc
          };
          setCoursesData(Data);
        })
        .catch(function (error) {
          console.log(error);
          setCoursesData({});
        });
  }, [props.id]);

  const downloadImage = async () => {

    const url = `/api/t/lectures/download/${props.id}`
    const download = document.createElement('a');

    download.href = url;
    download.setAttribute('download', video.videoLectureData);
    download.setAttribute('type', 'application/json');
    download.click();
  }

  return (
      <div id="js-pin-container" className="js-pin-container relative">
        <section className="page-header -type-5 bg-light-6 mt-90">
          <div className="container">
            <div className="page-header__content pt-10 pb-10">
              <div className="row y-gap-30">
                <div className="col-xl-7 col-lg-8">
                  <h1 className="col-xl-9 ml-90 pl-90 mt-20">{coursesData.title}</h1>
                  <div className="d-flex items-center pt-20">
                    <div
                        className="bg-image size-30 rounded-full js-lazy"
                        style={{
                          backgroundImage: `url(${pageItem.authorImageSrc})`,
                        }}
                    ></div>
                    <div className="text-14 lh-1 ml-10">
                      {pageItem.authorName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="layout-pt-md layout-pb-md">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">

                <CourseContent video = {video} />
                <div className="app-container">
                  현재 시청하시는 강의의 ID는 {props.id}입니다. <br />챗봇 사용시 입력해주세요
                </div>
                <div>
                  <Chatbot video = {props}/>
                </div>
                {/* Instractor 필요없음 */}
                {/* <Instractor coursesData = {coursesData[0]}/> */}
                <button
                    className="button -md -purple-1 text-white"
                    style={{marginTop:"20px"}}
                    onClick={downloadImage}
                >강의자료 다운로드</button >
                <Qna video = {video}/>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
