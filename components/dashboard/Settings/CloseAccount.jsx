"use client";

import React from "react";

export default function CloseAccount({ activeTab }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div
      className={`tabs__pane -tab-item-5 ${activeTab == 3 ? "is-active" : ""} `}
    >
      <form onSubmit={handleSubmit} className="contact-form row y-gap-30">
        <div className="col-12">
          <div className="text-16 fw-500 text-dark-1">계정 탈톼</div>
          <p className="mt-10">
            회원 탈퇴를 신청하시면, 다시 복구할 수 없습니다. 신중히 결정해주세요
          </p>
        </div>

        <div className="col-md-7">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
            비밀번호 입력
          </label>

          <input required type="text" placeholder="비밀번호를 입력하세요" />
        </div>

        <div className="col-12">
          <button className="button -md -purple-1 text-white">
            회원 탈퇴
          </button>
        </div>
      </form>
    </div>
  );
}
