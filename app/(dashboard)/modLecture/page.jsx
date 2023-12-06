import Descriptions from "@/components/aboutCourses/lesson/Descriptions";
import LessonItems from "@/components/aboutCourses/lesson/LessonItems";
import Reviews from "@/components/aboutCourses/lesson/Reviews";
import Video from "@/components/aboutCourses/lesson/Video";
import VideoTwo from "@/components/aboutCourses/lesson/VideoTwoCustom";
import Preloader from "@/components/common/Preloader";
import Header from "@/components/layout/headers/Header";
import React from "react";

export const metadata = {
  title: "강의 관리 || Anything",
  description: "",
};

export default function page(params) {
  return (
    <div className="main-content  ">
      <Preloader />
      <Header />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <section className="layout-pt-lg layout-pb-lg lg:pt-40 lg:order-1">
          <div className="container">
            <div className="row justify-start marginCustom ">
              <div className="col-xxl-8 col-xl-7 col-lg-8">
                <VideoTwo data={params.searchParams.id} />

                <Descriptions data={params.searchParams.id} />
              </div>
            </div>
          </div>
        </section>
        <LessonItems rightPosition={true} data={params.searchParams.id} />
      </div>
    </div>
  );
}
