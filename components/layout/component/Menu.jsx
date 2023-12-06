"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MobileFooter from "./MobileFooter";
import Image from "next/image";
import { menuList } from "@/data/menu";
import { usePathname } from "next/navigation";

export default function Menu({ allClasses, headerPosition }) {
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    menuList.forEach((elm) => {
      elm?.links?.forEach((elm2) => {
        if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
          setMenuItem(elm.title);
        } else {
          elm2?.links?.map((elm3) => {
            if (elm3.href?.split("/")[1] == pathname.split("/")[1]) {
              setMenuItem(elm.title);
              setSubmenu(elm2.title);
            }
          });
        }
      });
    });
  }, []);

  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${
        headerPosition ? headerPosition : ""
      }`}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>

        <div className="d-none xl:d-flex items-center px-20 py-20 border-bottom-light">
          <Link href="/login" className="text-dark-1">
            로그인
          </Link>
          <Link href="/signup" className="text-dark-1 ml-30">
            회원가입
          </Link>
        </div>

        <div className="menu js-navList">
          <ul className={`${allClasses ? allClasses : ""}`}>
            <li>
              <Link data-barba href="/courses-list">
                전체 강의
              </Link>
            </li>

            <li>
              <Link data-barba href="/my-courses">
                내 강의
              </Link>
            </li>
            <li>
              <Link data-barba href="/blog-list">
                커뮤니티
              </Link>
            </li>
            <li>
              <Link data-barba href="/personal">
                개인학습
              </Link>
            </li>
            <li>
              <Link data-barba href="/concentrate">
                마이페이지
              </Link>
            </li>
          </ul>
        </div>

        {/* mobile footer start */}
        {/* <MobileFooter /> */}
        {/* mobile footer end */}
      </div>

      <div
        className="header-menu-close"
        data-el-toggle=".js-mobile-menu-toggle"
      >
        <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
          <div className="icon-close text-dark-1 text-16"></div>
        </div>
      </div>

      <div className="header-menu-bg"></div>
    </div>
  );
}
