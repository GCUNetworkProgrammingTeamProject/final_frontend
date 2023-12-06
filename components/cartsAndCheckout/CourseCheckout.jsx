"use client";

import React, { useState, useEffect } from "react";
import { useContextElement } from "@/context/Context";
import axios from "axios";

export default function CourseCheckOut() {
  const { cartCourses } = useContextElement();
  const [totalPrice, setTotalPrice] = useState(0);
  const [shiping, setShiping] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cartList, setCartList] = useState([]);
  const [lectureSum, setLectureSum] = useState(0);
  const [bool, setBool] = useState(0);

  const handlePaymentChange = (newMethod) => {
    setPaymentMethod(newMethod);
  };

  useEffect(() => {
    const sum = cartCourses.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.discountedPrice * currentValue.quantity;
    }, 0);
    const sumQuantity = cartCourses.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.quantity;
    }, 0);
    setShiping(sumQuantity * 10);
    setTotalPrice(sum);
  }, [cartCourses]);

  const accessToken = localStorage.getItem("accessToken");

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  useEffect(() => {
    let sum;
    axios
      .get("/api/users/shoplist/list", config)
      .then(function(response) {
        setCartList(response.data);
        setLectureSum(setSum);
      })
      .catch(function(error) {
        console.log(error);
      });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get("/api/users/shoplist/order", config)
      .then(function(response) {
        alert(response.request.response);
        window.location.href = "/";
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  function setSum() {
    let sum = 0;
    for (let i = 0; i < cartList.length; i++)
      sum = sum + cartList[i].lecturePrice;

    return sum;
  }

  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">강의 결제</h1>
                </div>

                <div>
                  <p className="page-header__text">강의를 결제해주세요.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="layout-pt-md layout-pb-lg">
        <div className="container">
          <div className="row y-gap-50">
            <div className="col-lg-8">
              <div className="shopCheckout-form">
                <form
                  onSubmit={handleSubmit}
                  className="contact-form row x-gap-30 y-gap-30"
                >
                  <div className="col-12">
                    <h5 className="text-20">결제 정보 입력</h5>
                  </div>
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      이름
                    </label>
                    <input
                      required
                      type="text"
                      name="firstName"
                      placeholder="이름"
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      성
                    </label>
                    <input
                      required
                      type="text"
                      name="lastName"
                      placeholder="성"
                    />
                  </div>
                  <div className="col-12">
                    <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                      주소
                    </label>
                    <input
                      required
                      type="text"
                      name="province"
                      placeholder="주소"
                    />
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="">
                <div className="pt-30 pb-15 bg-white border-light rounded-8 bg-light-4">
                  <h5 className="px-30 text-20 fw-500">결제 정보</h5>
                  <br />

                  {cartList.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex justify-between ${
                        i == 0 ? "border-top-dark" : ""
                      }  px-30`}
                    >
                      <div className="py-15 text-grey">{elm.lectureName} </div>
                      <div className="py-15 text-grey">{elm.lecturePrice}₩</div>
                    </div>
                  ))}

                  <div className="d-flex justify-between border-top-dark px-30">
                    <div className="py-15 fw-500 text-dark-1">총 결제금액</div>
                    <div className="py-15 fw-500 text-dark-1">
                      {lectureSum}₩
                    </div>
                  </div>
                </div>

                <div className="py-30 px-30 bg-white mt-30 border-light rounded-8 bg-light-4">
                  <h5 className="text-20 fw-500">결제방법</h5>

                  <div className="mt-30">
                    <div className="form-radio d-flex items-center">
                      <div className="radio">
                        <input
                          type="radio"
                          name="account"
                          checked={paymentMethod === "account"}
                          onChange={() => handlePaymentChange("account")}
                        />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <h5 className="ml-15 text-15 lh-1 fw-500 text-dark-1">
                        무통장입금
                      </h5>
                    </div>
                    <p className="ml-25 pl-5 mt-25"></p>
                  </div>

                  <div className="mt-30">
                    <div className="form-radio d-flex items-center">
                      <div className="radio">
                        <input
                          type="radio"
                          name="card"
                          checked={paymentMethod === "card"}
                          onChange={() => handlePaymentChange("card")}
                        />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <h5 className="ml-15 text-15 lh-1 text-dark-1">
                        체크카드
                      </h5>
                    </div>
                  </div>

                  <div className="mt-30">
                    <div className="form-radio d-flex items-center">
                      <div className="radio">
                        <input
                          type="radio"
                          name="cash"
                          checked={paymentMethod === "cash"}
                          onChange={() => handlePaymentChange("cash")}
                        />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <h5 className="ml-15 text-15 lh-1 text-dark-1">
                        현금결제
                      </h5>
                    </div>
                  </div>

                  <div className="mt-30">
                    <div className="form-radio d-flex items-center">
                      <div className="radio">
                        <input
                          type="radio"
                          name="paypal"
                          checked={paymentMethod === "paypal"}
                          onChange={() => handlePaymentChange("payapl")}
                        />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <h5 className="ml-15 text-15 lh-1 text-dark-1">PayPal</h5>
                    </div>
                  </div>
                </div>
                <div className="mt-30">
                  <button
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                    onClick={handleSubmit}
                  >
                    강의 결제
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
