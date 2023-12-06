"use client";

import React, { useState, useEffect } from "react";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
import axios from "axios";
export default function EventCheckOut() {
  const { cartEvents } = useContextElement();
  const [totalPrice, setTotalPrice] = useState(0);
  const [shiping, setShiping] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [subscriptionType, setSubscriptionType] = useState("monthly"); // 추가
  const [subscriptionPrice, setsubscriptionPrice] = useState(9900);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
  },[]);

   // setSubscriptionPrice를 최상위 레벨에서 선언
   const handleSubscriptionChange = (newType) => {
    setSubscriptionType(newType);

    // 구독 기간에 따라 가격 설정
    setsubscriptionPrice(newType === "monthly" ? 9900 : 99000);
  };

  const handlePaymentChange = (newMethod) => {
    setPaymentMethod(newMethod);
  };

  useEffect(() => {
    const sum = cartEvents.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price * currentValue.quantity;
    }, 0);
    const sumQuantity = cartEvents.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.quantity;
    }, 0);
    setShiping(sumQuantity * 10);
    setTotalPrice(sum);
  }, [cartEvents]);


  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setsubscriptionPrice(subscriptionType === "monthly" ? 9900 : 99000);

    const totalSubscriptionPrice = totalPrice + shiping + subscriptionPrice;

    axios
      .post("/api/users/analysis/order", { price: totalSubscriptionPrice }, config)
      .then(function (response) {
        alert(response.request.response);
        window.location.href = "/dashboard";
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  


  return (
    <>
      <section className="page-header -type-1">
        <div className="container">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">집중도 분석권 결제</h1>
                </div>

                <div>
                  <p className="page-header__text">
                    집중도 분석권을 결제해주세요.
                  </p>
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

                  <div className="py-30 px-30 bg-white mt-30 border-light rounded-8 bg-light-4">
                          <h5 className="px-30 text-20 fw-500">구독 기간 선택</h5>

                          <div className="mt-30">
                            <div className="form-radio d-flex items-center">
                              <div className="radio">
                                <input type="radio" name="monthly" checked={subscriptionType === "monthly"} onChange={() => handleSubscriptionChange("monthly")} />
                                <div className="radio__mark">
                                  <div className="radio__icon"></div>
                                </div>
                              </div>
                              <h5 className="ml-15 text-15 lh-1 fw-500 text-dark-1">1달 구독 (가격: 9,900원)</h5>
                            </div>
                          </div>

                          <div className="mt-30">
                            <div className="form-radio d-flex items-center">
                              <div className="radio">
                                <input type="radio" name="yearly" checked={subscriptionType === "yearly"} onChange={() => handleSubscriptionChange("yearly")} />
                                <div className="radio__mark">
                                  <div className="radio__icon"></div>
                                </div>
                              </div>
                              <h5 className="ml-15 text-15 lh-1 fw-500 text-dark-1">1년 구독 (가격: 99,000원)</h5>
                            </div>
                          </div>
                        </div>




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

                  {/** 
                  <div className="d-flex justify-between px-30 mt-25">
                    <div className="py-15 fw-500 text-dark-1">Product</div>
                    <div className="py-15 fw-500 text-dark-1">Subtotal</div>
                  </div>
                  */}

                  {cartEvents.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex justify-between ${
                        i == 0 ? "border-top-dark" : ""
                      }  px-30`}
                    >
                      <div className="py-15 text-grey">
                      <Link
                          className="linkCustom"
                          href={`/events/${elm.id}`}
                        >
                          {elm.title}{" "}
                        </Link> x {elm.quantity}
                      </div>
                      <div className="py-15 text-grey">
                        ₩{(elm.price * elm.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}

<div className="d-flex justify-between border-top-dark px-30">
                    <div className="py-15 fw-500 text-dark-1">총 결제금액</div>
                    <div className="py-15 fw-500 text-dark-1">
                      {(totalPrice + shiping + subscriptionPrice).toLocaleString()}₩
                    </div>
                  </div>
                </div>

                <div className="py-30 px-30 bg-white mt-30 border-light rounded-8 bg-light-4">
                  <h5 className="text-20 fw-500">결제방법</h5>

                  <div className="mt-30">
                    <div className="form-radio d-flex items-center">
                      <div className="radio">
                        <input type="radio" name="account" checked={paymentMethod === "account"} onChange={() => handlePaymentChange("account")} />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <h5 className="ml-15 text-15 lh-1 fw-500 text-dark-1">
                        무통장입금
                      </h5>
                    </div>
                    <p className="ml-25 pl-5 mt-25">
                    </p>
                  </div>

                  <div className="mt-30">
                    <div className="form-radio d-flex items-center">
                      <div className="radio">
                        <input type="radio" name="card" checked={paymentMethod === "card"} onChange={() => handlePaymentChange("card")} />
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
                        <input type="radio" name="cash" checked={paymentMethod === "cash"} onChange={() => handlePaymentChange("cash")} />
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
                        <input type="radio" name="paypal" checked={paymentMethod === "paypal"} onChange={() => handlePaymentChange("payapl")} />
                        <div className="radio__mark">
                          <div className="radio__icon"></div>
                        </div>
                      </div>
                      <h5 className="ml-15 text-15 lh-1 text-dark-1">PayPal</h5>
                    </div>
                  </div>
                </div>
                <div className="mt-30">
                  <button className="button -md -green-1 text-dark-1 fw-500 w-1/1" 
                  onClick={handleSubmit}>
                    집중도 분석권 결제
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
