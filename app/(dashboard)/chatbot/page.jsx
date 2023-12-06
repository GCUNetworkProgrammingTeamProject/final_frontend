
import Preloader from '@/components/common/Preloader'
import BookMarks from '@/components/dashboard/BookMarks'
import DashboardOne from '@/components/dashboard/DashboardOne'
import Sidebar from '@/components/dashboard/Sidebar'
import HeaderDashboard from '@/components/layout/headers/HeaderDashboard'
import { React, useClient } from 'react';

export const metadata = {
  title: '대시보드-북마크 || Educrat - 전문 LMS 온라인 교육 코스 NextJS 템플릿',
  description:
    'Educrat과 함께 온라인 코스, 교육 및 LMS 플랫폼을 위한 가장 인상적인 LMS 템플릿으로 교육 콘텐츠를 높이세요.',
}

export default function page() {
  return (
    <div className="barba-container" data-barba="container">
      <main className="main-content">
        <Preloader />
        <HeaderDashboard />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div id='dashboardOpenClose' className="dashboard -home-9 js-dashboard-home-9">
            <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />
            </div>
            <BookMarks />
          </div>
        </div>
      </main>
    </div>
  );
}
