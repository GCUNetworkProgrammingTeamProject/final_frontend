"use client";

import React, { useEffect, useState } from "react";
import FooterNine from "@/components/layout/footers/FooterNine";
import Pagination from "./Pagination";
import CoursesCardDashboard from "./CourseCardTwo";
import axios from 'axios'; //
import { testimonials } from "@/data/tesimonials";
import Link from "next/link";


const ddItems = [
  { id: 1, label: "All Categories" },
  { id: 2, label: "Animation" },
  { id: 3, label: "Design" },
  { id: 4, label: "Illustration" },
  { id: 5, label: "Business" },
];

export default function MyCourses() {
  // const coursesData = [];
  const [currentCategory, setCurrentCategory] = useState("All Categories");
  const [pageItems, setPageItems] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [pageData, setPageData] = useState([]);


  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    
    axios.get("/api/users/lectures", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then(function (response) {
      const lecturesArray = response.data;
      if (lecturesArray && lecturesArray.length > 0) {
        const courseData = lecturesArray.map(lecture => ({
          id: lecture.lectureSeq,
          // imageSrc: "/assets/img/coursesCards/1.png", // lecture.lectureImage,
          imageSrc: "/assets/img/courses/"+lecture.lectureImage,
          authorImageSrc: "/assets/img/general/avatar-1.png",
          title: lecture.lectureName,
          rating: lecture.lectureScore,
          ratingCount: 1991,
          lessonCount: 6,
          duration: 320,
          level: "Beginner",
          progress: 20,
          completed: 25,
          originalPrice: lecture.lecturePrice,
          discountedPrice: 79,
          category: "Design",
          state: "Popular",
          viewStatus: "Good",
          difficulty: "Easy",
          status: "Finished",
        }));
        setPageData(courseData);
      } else {
        console.log("강의 데이터가 없거나 비어 있습니다.");
        setPageData([]);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);



  // useEffect(() => {
  //   //test(accessToken);//
  //   if (activeTab == 1) {
  //     setPageData(coursesData);
  //   } else if (activeTab == 2) {
  //     setPageData(coursesData.filter((elm) => elm.status == "Finished"));
  //   } else if (activeTab == 3) {
  //     setPageData(coursesData.filter((elm) => elm.status == "Not enrolled"));
  //   }
  // }, [activeTab]);


  const handleSubmit = (e) => {
    e.preventDefault();
  };


  useEffect(() => {
    if (currentCategory == "All Categories") {
      setPageItems(pageData);
    } else {
      setPageItems([
        ...pageData.filter((elm) => elm.category == currentCategory),
      ]);
    }
  }, [currentCategory, pageData]);
  // console.log("PageData : " + pageItems);
  return (
    <div className="dashboard__main">
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">수강중인 강의</h1>
            <div className="mt-10">
            </div>
          </div>
        </div>

        <div className="row y-gap-30">
          <div className="col-12">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="tabs -active-purple-2 js-tabs">
                <div className="tabs__content py-30 px-30 js-tabs-content">
                  <div className="tabs__pane -tab-item-1 is-active">
                    <div className="row y-gap-30 pt-30">
                      {pageItems.map((data, i) => (
                            <CoursesCardDashboard data={data}/>
                      ))}
                    </div>
                    <div className="row justify-center pt-30">
                      <div className="col-auto">
                        <Pagination />
                      </div>
                    </div>
                  </div>

                  {/* <div className="tabs__pane -tab-item-2"></div>
                  <div className="tabs__pane -tab-item-3"></div> */}
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
