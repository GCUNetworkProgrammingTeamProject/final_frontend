"use client";
import { React, useState, useEffect } from "react";
import CartToggle from "../component/CartToggle";
import Menu from "../component/Menu";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function Header() {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    var accessToken = localStorage.getItem("accessToken");
    var refreshToken = localStorage.getItem("refreshToken");
    // console.log(accessToken);
    if (accessToken != null) {
      validateToken(accessToken);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const validateToken = (accessToken) => {
    axios
      .get("/api/info", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function(response) {
        //console.log(response);
        //console.log(response.data.name);
        if (response.data.name != undefined) {
          setName(response.data.name);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          console.log("로그인 실패");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <>
      <header className="header -type-1 ">
        <div className="header__container">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="header-left">
                <div className="header__logo ">
                  <Link href="/">
                    <Image
                      width={168}
                      height={60}
                      src="/assets/img/general/logo.png"
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
            </div>

            <Menu allClasses={"menu__nav text-white -is-active"} />

            <div className="col-auto">
              <div className="header-right d-flex items-center">
                <div className="header-right__icons text-white d-flex items-center">
                  <CartToggle
                    parentClassess={"relative ml-30 xl:ml-20"}
                    allClasses={"d-flex items-center text-white"}
                  />
                </div>
                {isLoggedIn ? (
                  <div className="header-right__buttons d-flex items-center ml-30 md:d-none">
                    <Link className="button -underline text-white" href="/">
                      {name}
                    </Link>
                    <Link
                      onClick={handleLogout}
                      href="/"
                      className="button -sm -white text-dark-1 ml-30"
                    >
                      로그아웃
                    </Link>
                  </div>
                ) : (
                  <div className="header-right__buttons d-flex items-center ml-30 md:d-none">
                    <Link
                      href="/login"
                      className="button -underline text-white"
                    >
                      로그인
                    </Link>
                    <Link
                      href="/signup"
                      className="button -sm -white text-dark-1 ml-30"
                    >
                      회원가입
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
