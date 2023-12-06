import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import CourseListTwo from "@/components/courseList/CourseListTwoCustom";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
export const metadata = {
  title: "개인영상 학습 || Anything",
  description: "",
};

export default function page() {
  return (
    <div className="main-content  ">
      <Preloader />
      <Header />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        {/*<PageLinks/>*/}
        <CourseListTwo />
        <FooterOne />
      </div>
    </div>
  );
}
