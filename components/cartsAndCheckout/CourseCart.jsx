"use client";

import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { useContextElement } from "@/context/Context";
import Link from "next/link";
import axios from "axios";

export default function CourseCart() {
  const { cartCourses, setCartCourses } = useContextElement();
  const [totalPrice, setTotalPrice] = useState(0);
  const [shoppingList, setShoppingList] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleIncrease = (index) => {
    const item = cartCourses[index];

    item.quantity += 1;
    const updated = [...cartCourses];
    updated[index] == item;

    setCartCourses(updated);
  };

  const handleDecrease = (index) => {
    const item = cartCourses[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
      const updated = [...cartCourses];
      updated[index] == item;

      setCartCourses(updated);
    }
  };

  const accessToken = localStorage.getItem('accessToken');

  const config = {
    headers: {
      "Content-Type": 'application/json',
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`
    }
  }

  useEffect((e) => {
    axios.get("/api/users/shoplist/list", config)
        .then(function (response) {
          setShoppingList(response.data)
        })
        .catch(function (error) {
          alert(error);
        })
  });

  useEffect(() => {

    const sum = cartCourses.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.discountedPrice * currentValue.quantity;
    }, 0);
    setTotalPrice(sum);
  }, [cartCourses]);

  const handleRemoveCart = (i, index) => {
    axios.delete("/api/users/shoplist/" + index, config)
        .then(function (response) {
          console.log(response.request.response);
          window.location.href = '/course-cart';
        })
        .catch(function (error) {
          console.log(error);
        })
  }



  return (
      <>
        <section className="page-header -type-1">
          <div className="container">
            <div className="page-header__content">
              <div className="row justify-center text-center">
                <div className="col-auto">
                  <div>
                    <h1 className="page-header__title">장바구니</h1>
                  </div>

                  <div>
                    <p className="page-header__text">
                      장바구니에 담긴 강의를 구매하세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="layout-pt-md layout-pb-lg">
          <div className="container">
            <div className="row justify-end">
              <div className="col-12">
                <div className="px-30 pr-60 py-25 rounded-8 bg-light-6 md:d-none">
                  <div className="row justify-between">
                    <div className="col-md-4">
                      <div className="fw-500 text-purple-1">강의</div>
                    </div>
                    <div className="col-md-2">
                      <div className="fw-500 text-purple-1">가격</div>
                    </div>
                    <div className="col-md-1">
                      <div className="d-flex justify-end">
                        <div className="fw-500 text-purple-1"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-30 pr-60 md:px-0">
                  {shoppingList.map((elm, i) => (
                      <div
                          key={i}
                          className="row y-gap-20 justify-between items-center pt-30 pb-30 border-bottom-light"
                      >
                        <div className="col-md-4">
                          <div className="d-flex items-center">
                            <div className="">
                              <div
                                  className="size-100 bg-image rounded-8 js-lazy"
                              ></div>
                            </div>
                            <div className="">
                              <div
                                  className="size-100 bg-image rounded-8 js-lazy"
                                  style={{ backgroundImage: `url(../../../assets/img/courses/${elm.lectureImage})` }}
                              ></div>
                            </div>
                            <div className="fw-500 text-dark-1 ml-30">
                              <Link
                                  className="linkCustom"
                                  href={`/courses/${elm.id}`}
                              >
                                {elm.lectureName}{" "}
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-2 md:mt-15">
                          <div className="">
                            <div className="shopCart-products__title d-none md:d-block mb-10">
                              Price
                            </div>
                            <p>{`${elm.lecturePrice}`}</p>
                          </div>
                        </div>

                        <div className="col-md-1">
                          <div
                              className="md:d-none d-flex justify-end"
                              onClick={() => handleRemoveCart(i, elm.lectureSeq)}
                          >
                            <FontAwesomeIcon icon={faX} />
                          </div>
                        </div>
                      </div>
                  ))}
                </div>

                <div className="shopCart-footer px-16 mt-30">
                  {cartCourses.length > 0 ? (
                      <div className="row justify-between y-gap-30">
                        <div className="col-xl-5">
                          {/* <form className="" onSubmit={handleSubmit}>
                        <div className="d-flex justify-between border-dark">
                          <input
                            required
                            className="rounded-8 px-25 py-20"
                            type="text"
                            placeholder="Coupon Code"
                          />
                          <button className="text-black fw-500" type="submit">
                            Apply coupon
                          </button>
                        </div>
                      </form> */}
                        </div>

                        <div className="col-auto">
                          <div className="shopCart-footer__item">
                            <Link className="button -md -purple-3 text-purple-1" href="/course-checkout">
                              강의 구매
                            </Link>
                          </div>
                        </div>
                      </div>
                  ) : (
                      <div className="row justify-center pt-60 lg:pt-40">
                        <div className="col-auto">
                          <Link
                              href="/courses-list-1"
                              className="button -md -outline-purple-1 text-purple-1"
                          >
                            강의 담기
                          </Link>
                        </div>
                      </div>
                  )}
                </div>
              </div>

              {/* <div className="col-xl-4 col-lg-5 layout-pt-lg">
              <div className="py-30 bg-light-4 rounded-8 border-light">
                <h5 className="px-30 text-20 fw-500">Cart Totals</h5>

                <div className="d-flex justify-between px-30 item mt-25">
                  <div className="py-15 fw-500 text-dark-1">Subtotal</div>
                  <div className="py-15 fw-500 text-dark-1">
                    ${totalPrice.toFixed(2)}
                  </div>
                </div>

                <div className="d-flex justify-between px-30 item border-top-dark">
                  <div className="pt-15 fw-500 text-dark-1">Total</div>
                  <div className="pt-15 fw-500 text-dark-1">
                    ${totalPrice.toFixed(2)}
                  </div>
                </div>
              </div>

              <Link
                href="/course-checkout"
                className="button -md -purple-1 text-white col-12 mt-30"
              >
                Proceed to checkout
              </Link>
            </div> */}
            </div>
          </div>
        </section>
      </>
  );
}
