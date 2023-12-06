import React from "react";
import Link from "next/link";
export default function Join() {
  return (
    <section className="layout-pt-md layout-pb-md bg-purple-1">
      <div className="container">
        <div className="row y-gap-20 justify-between items-center">
          <div className="col-xl-4 col-lg-5">
            <h2 className="text-30 lh-15 text-white">
              개인용 학습 영상을 통한
              <br />
              <span className="text-green-1">집중도 분석 서비스를</span>
              <br />
              원하시나요?
            </h2>
          </div>

          <div className="col-auto">
            <Link href="/subscribe" className="button -md -green-1 text-dark-1">
              집중도 분석 서비스 결제하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
