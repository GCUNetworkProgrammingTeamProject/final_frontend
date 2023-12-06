import Preloader from "@/components/common/Preloader";
import LectureAddModify from "@/components/dashboard/LectureAddModify";
import Sidebar from "@/components/dashboard/Sidebar";
import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import React from "react";

export const metadata = {
  title: "강의 등록 || Anything",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function page(params) {
  // console.log("param: "+params.searchParams.item);
  return (
    <div className="barba-container" data-barba="container">
      <main className="main-content">
        <Preloader />
        <HeaderDashboard />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div
            id="dashboardOpenClose"
            className="dashboard -home-9 js-dashboard-home-9"
          >
            <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />
            </div>
            {/* <Listing/> */}
            <LectureAddModify item={params.searchParams.item} />
          </div>
        </div>
      </main>
    </div>
  );
}
