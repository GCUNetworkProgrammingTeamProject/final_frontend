


import Preloader from '@/components/common/Preloader'
import PerConcentrate from '@/components/dashboard/PerConcentrate'
import Sidebar from '@/components/dashboard/Sidebar'
import HeaderDashboard from '@/components/layout/headers/HeaderDashboard'
import Header from '@/components/layout/headers/Header'

import React from 'react'

export const metadata = {
  title: '마이페이지 - 개인 집중도분석',
  description:
    '',
  
}

export default function page() {
  return (
    <div  className="barba-container" data-barba="container">
        <main  className="main-content">
        <Preloader/>
            <HeaderDashboard/>
            <div  className="content-wrapper js-content-wrapper overflow-hidden">
              <div id='dashboardOpenClose'  className="dashboard -home-9 js-dashboard-home-9">
                <div  className="dashboard__sidebar scroll-bar-1">
                    <Sidebar/>

                </div>
                <PerConcentrate/>
              </div>
          </div>
        </main>
    </div>
  )
}
