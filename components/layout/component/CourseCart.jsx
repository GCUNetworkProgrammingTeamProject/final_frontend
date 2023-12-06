"use client";

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
import axios from "axios";

const CourseCart = () => {
  const { cartCourses, setCartCourses } = useContextElement();
  const [totalPrice, setTotalPrice] = useState(0);
  const [shoppingList, setShoppingList] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [lectureSum, setLectureSum] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    //console.log(token);
    if (token != null) {
      setIsLogin(true);
      setAccessToken(token);
    } else {
      setIsLogin(false);
    }
  }, []);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  useEffect(
    (e) => {
      if (isLogin) {
        axios
          .get("/api/users/shoplist/list", config)
          .then(function(response) {
            setShoppingList(response.data);
            setSum();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        setShoppingList([]);
      }
    },
    [cartCourses]
  );

  function setSum() {
    setLectureSum(0);
    for (let i = 0; i < shoppingList.length; i++)
      setLectureSum(lectureSum + shoppingList[i].lecturePrice);
  }

  const handleRemoveCart = (i, index) => {
    axios
      .delete("/api/users/shoplist/" + index, config)
      .then(function(response) {
        const item = cartCourses[i];
        setCartCourses((pre) => [...pre.filter((elm) => elm !== item)]);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const sum = cartCourses.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.originalPrice * currentValue.quantity;
    }, 0);
    setTotalPrice(sum);
  }, [cartCourses]);
  return (
    <div className="header-cart bg-white -dark-bg-dark-1 rounded-8">
      <div
        className="px-30 pt-30 pb-10"
        style={{ maxHeight: "300px", overflowY: "scroll" }}
      >
        {shoppingList.map((elm, i) => (
          <div key={i} className="row justify-between x-gap-40 pb-20">
            <Link
              style={{ textDecoration: "none" }}
              href={`/courses/${elm.lectureSeq}`}
              className="col"
            >
              <div className="row x-gap-10 y-gap-10">
                <div
                  className="size-100 bg-image rounded-8 js-lazy"
                  style={{
                    backgroundImage: `url(../../../assets/img/courses/${elm.lectureImage})`,
                  }}
                ></div>

                <div className="col">
                  <div className="text-dark-1 lh-15">{elm.lectureName}</div>

                  <div className="d-flex items-center mt-10">
                    <div className="lh-12 fw-500 text-light-1 mr-10">
                      ${elm.lecturePrice}
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div
              className="col-auto"
              onClick={() => handleRemoveCart(i, elm.lectureSeq)}
            >
              <button>
                <Image
                  width={12}
                  height={12}
                  src="/assets/img/menus/close.svg"
                  alt="icon"
                />
              </button>
            </div>
          </div>
        ))}
        {!shoppingList.length && (
          <div className="p-20 pb-30 text-18 text-dark-1">
            카트가 비어있습니다.
          </div>
        )}
      </div>

      <div className="px-30 pt-20 pb-30 border-top-light">
        <div className="d-flex justify-between">
          <div className="text-18 lh-12 text-dark-1 fw-500">Total:</div>
          <div className="text-18 lh-12 text-dark-1 fw-500">{lectureSum}원</div>
        </div>

        <div className="row x-gap-20 y-gap-10 pt-30">
          {shoppingList.length && (
            <>
              <Link
                href={"/course-cart"}
                style={{ textDecoration: "none" }}
                className="col-sm-6"
              >
                <button className="button py-20 -dark-1 text-white -dark-button-white col-12">
                  카트 상세보기
                </button>
              </Link>
              <Link
                href={"/course-checkout"}
                style={{ textDecoration: "none" }}
                className="col-sm-6"
              >
                <button className="button py-20 -purple-1 text-white col-12">
                  결제
                </button>
              </Link>
            </>
          )}
          {!shoppingList.length && (
            <>
              <Link
                href={"/courses-list"}
                style={{ textDecoration: "none" }}
                className="col-12"
              >
                <button className="button py-20 -purple-1 text-white col-12">
                  강의 둘러보기
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCart;
