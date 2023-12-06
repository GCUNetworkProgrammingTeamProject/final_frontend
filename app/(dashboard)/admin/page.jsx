import DashboardOne from "@/components/dashboard/DashboardOne";
import Sidebar from "@/components/dashboard/administration/Sidebar";
import Administration from "@/components/dashboard/administration/Administration";
import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import React from "react";
import Preloader from "@/components/common/Preloader";

export const metadata = {
  title: "관리자 페이지 || Anything",
  description: "anything",
};

export default function page() {
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
            <Administration />
          </div>
        </div>
      </main>
    </div>
  );
}
