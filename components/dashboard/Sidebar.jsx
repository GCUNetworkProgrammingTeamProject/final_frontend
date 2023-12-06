"use client";

// import { sidebarItems } from "@/data/dashBoardSidebar";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  {
    id: 1,
    href: "/concentrate",
    iconClass: "text-20 icon-discovery",
    text: "집중도 그래프",
  },
  {
    id: 2,
    href: "/chatbot",
    iconClass: "text-20 icon-bookmark",
    text: "챗봇 질문내역",
  },
  {
    id: 3,
    href: "/per-concentrate",
    iconClass: "text-20 icon-discovery",
    text: "개인 집중도 그래프",
  },
  {
    id: 4,
    href: "/per-chatbot",
    iconClass: "text-20 icon-bookmark",
    text: "개인 챗봇 질문내역",
  },
  {
    id: 5,
    href: "/my-courses",
    iconClass: "text-20 icon-play-button",
    text: "내 강의 (학생, 강사)",
  },
  {
    id: 6,
    href: "/dshb-lecture",
    iconClass: "text-20 icon-list",
    text: "강의 관리(강사)",
  },
  {
    id: 7,
    href: "/dshb-settings",
    iconClass: "text-20 icon-setting",
    text: "개인정보 수정",
  },
  {
    id: 13,
    href: "/dshb-register",
    text: "강사 등록(강사)",
    iconClass: "text-20 icon-book",
  },
  {
    id: 19,
    href: "/order",
    text: "결제내역",
    iconClass: "text-20 icon-list",
  },

  {
    id: 20,
    href: "/",
    iconClass: "text-20 icon-power",
    text: "홈 화면",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="sidebar -dashboard">
      {sidebarItems.map((elm, i) => (
        <div
          key={i}
          className={`sidebar__item   ${
            pathname == elm.href ? "-is-active" : ""
          } `}
        >
          <Link
            key={i}
            href={elm.href}
            className="d-flex items-center text-17 lh-1 fw-500 "
          >
            <i className={`${elm.iconClass} mr-15`}></i>
            {elm.text}
          </Link>
        </div>
      ))}
    </div>
  );
}
