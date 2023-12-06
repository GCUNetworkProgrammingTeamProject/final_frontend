import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import CourseDetailsOne from "@/components/courseSingle/cdo";
import CourseSlider from "@/components/courseSingle/CourseSlider";
import FooterOne from "@/components/layout/footers/FooterOne";

import Header from "@/components/layout/headers/Header";
import React from "react";

export const metadata = {
  title: "강의 수강 || Anything",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function page(params) {
  console.log(params);
  <Preloader />;
  return (
    <div className="main-content  ">
      <Header />
      <div className="content-wrapper  js-content-wrapper ">
        {/*<PageLinks/>*/}
        <CourseDetailsOne id={params.searchParams.id} />
        {/*<CourseSlider/>*/}
        <FooterOne />
      </div>
    </div>
  );
}
