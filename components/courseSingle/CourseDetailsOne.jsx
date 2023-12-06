"use client";

import Star from "../common/Star";

// import { coursesData } from "@/data/courses";
import React, { useState, useEffect } from "react";

import PinContent from "./PinContent";
import Overview from "./Overview";
import CourseContent from "./CourseContent";
import Instractor from "./Instractor";
import Reviews from "./Reviews";
import axios from "axios";

const menuItems = [
  { id: 1, href: "#overview", text: "Overview", isActive: true },
  { id: 2, href: "#course-content", text: "Course Content", isActive: false },
  { id: 3, href: "#instructors", text: "Instructors", isActive: false },
  { id: 4, href: "#reviews", text: "Reviews", isActive: false },
];

export default function CourseDetailsOne({ id }) {
  const exData =[
    {
      "id": 1,
      "imageSrc": "/assets/img/coursesCards/6.png",
      "authorImageSrc": "/assets/img/general/avatar-1.png",
      "title": "Learn Figma - UI/UX Design Essential Training",
      "rating": 4.3,
      "ratingCount": 1991,
      "lessonCount": 6,
      "duration": 1320,
      "level": "Beginner",
      "originalPrice": 199,
      "discountedPrice": 79,
      "paid": true,
      "category": "Design",
      "state": "Popular",
      "languange": "French",
      "authorName": "Jane Cooper",
      "viewStatus": "Good",
      "difficulty": "Easy",
      "desc": "Introductory course on web hosting, domain registration, and how you can easily publish and edit your website online."
    }];
  const [pageItem, setPageItem] = useState(exData[0]);
  const [coursesData, setCoursesData] = useState(exData);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setAccessToken(token);
  },[]);

  useEffect(() => {
    axios.get(`/api/lectures/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
        .then(function (response) {
          const Data = {
            id: response.data.id,
            imageSrc: "/assets/img/courses/" + response.data.imageSrc,
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
            category: "Design",
            state: "Popular",
            language: "Korean", // 오타 수정: languange -> language
            authorName: response.data.authorName,
            viewStatus: "Good",
            difficulty: "Easy",
            desc: response.data.desc
          };
          console.log("des", response.data.desc);

          setCoursesData([Data]);
          console.log(coursesData);
        })
        .catch(function(error) {
          console.log(error);
          setCoursesData([]);
        });
  }, []);




  useEffect(() => {
    setPageItem(coursesData.filter((elm) => elm.id == id) || coursesData[id]);
    // console.log(pageItem);
  }, [coursesData]);

  // console.log("coursesData: ",coursesData);

  return (
      <div id="js-pin-container" className="js-pin-container relative">
        <section className="page-header -type-5 bg-light-6">
          <div className="page-header__bg">
            <div
                className="bg-image js-lazy"
                data-bg="img/event-single/bg.png"
            ></div>
          </div>

          <div className="container">
            <div className="page-header__content pt-90 pb-90">
              <div className="row y-gap-30">
                <div className="col-xl-7 col-lg-8">
                  <div className="d-flex x-gap-15 y-gap-10 pb-20">
                    <div>
                      {/*<div className="badge px-15 py-8 text-11 bg-green-1 text-dark-1 fw-400">*/}
                      {/*  BEST SELLER*/}
                      {/*</div>*/}
                    </div>
                    <div>
                      {/*<div className="badge px-15 py-8 text-11 bg-orange-1 text-white fw-400">*/}
                      {/*  NEW*/}
                      {/*</div>*/}
                    </div>
                    <div>
                      {/*<div className="badge px-15 py-8 text-11 bg-purple-1 text-white fw-400">*/}
                      {/*  POPULAR*/}
                      {/*</div>*/}
                    </div>
                  </div>

                  <div>
                    <h1 className="text-30 lh-14 pr-60 lg:pr-0">
                      {/* {pageItem.title} */}
                      {coursesData[0].title}
                    </h1>
                  </div>
                  {/**
                   <p className="col-xl-9 mt-20">

                   {coursesData[0].desc}
                   </p>
                   */}

                  <div className="d-flex x-gap-30 y-gap-10 items-center flex-wrap pt-20">
                    <div className="d-flex items-center">
                      <div className="text-14 lh-1 text-yellow-1 mr-10">
                        {coursesData[0].rating}
                      </div>
                      <div className="d-flex x-gap-5 items-center">
                        <Star star={5} textSize={"text-11"} />
                      </div>
                      <div className="text-14 lh-1 text-light-1 ml-10">
                        ({coursesData[0].ratingCount})
                      </div>
                    </div>

                    <div className="d-flex items-center text-light-1">
                      <div className="icon icon-person-3 text-13"></div>
                      <div className="text-14 ml-8">
                        {/*수강자 수 */}
                      </div>
                    </div>

                    <div className="d-flex items-center text-light-1">
                      <div className="icon icon-wall-clock text-13"></div>
                      <div className="text-14 ml-8">
                        {/*Last updated 11/ 수정일자*/}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex items-center pt-20">
                    <div
                        className="bg-image size-30 rounded-full js-lazy"
                        style={{
                          backgroundImage: `url(${coursesData[0].authorImageSrc})`,
                        }}
                    ></div>
                    <div className="text-14 lh-1 ml-10">
                      {coursesData[0].authorName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <PinContent pageItem={coursesData} /> */}

        <section className="layout-pt-md layout-pb-md">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                {/* <div className="page-nav-menu -line">
               <div className="d-flex x-gap-30">
                 {menuItems.map((item, ind) => (
                   <div key={ind}>
                     <a
                       href={item.href}
                       className={`pb-12 page-nav-menu__link ${
                         item.isActive ? "is-active" : ""
                       }`}
                     >
                       {item.text}
                     </a>
                   </div>
                 ))}
               </div>
              </div> */}

                {/*<Overview />*/}
                {/* <CourseContent id = {coursesData[0].id} /> */}
                <Instractor coursesData = {coursesData}/>
                <Reviews id = {id}/>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}
