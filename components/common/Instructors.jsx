import React from "react";
import Image from "next/image";
import { teamMembers } from "../../data/instractors";
import Link from "next/link";
export default function Instructors({ backgroundColor }) {
  return (
    <section
      className={`layout-pt-lg layout-pb-lg ${
        backgroundColor ? backgroundColor : ""
      }`}
    >
      <div className="container">
        <div className="row y-gap-20 justify-between items-center">
          <div className="col-lg-6">
            <div className="sectionTitle ">
              <h2 className="sectionTitle__title " data-aos="fade-left">
                최고의 강사들과 함께하는 강의
              </h2>

              <p className="sectionTitle__text " data-aos="fade-left">
              </p>
            </div>
          </div>

          <div className="col-auto" data-aos="fade-left">
            <Link
              href="/instructors-list-1"
              className="button -icon -purple-3 text-purple-1"
            >
              모든 강사 확인하기
              <i className="icon-arrow-top-right text-13 ml-10"></i>
            </Link>
          </div>
        </div>

        <div className="row y-gap-30 pt-50">
          {teamMembers.slice(0, 4).map((elm, i) => (
            <div
              key={i}
              className="col-lg-3 col-sm-6"
              data-aos="fade-left"
              data-aos-duration={(i + 1) * 500}
            >
              <div className="teamCard -type-1 -teamCard-hover">
                <div className="teamCard__image">
                  <Image
                    width={600}
                    height={700}
                    style={{ height: "100%", width: "100%" }}
                    src={elm.image}
                    alt="image"
                  />
                  <div className="teamCard__socials">
                    <div className="d-flex x-gap-20 y-gap-10 justify-center items-center h-100">
                      {elm.socialProfile?.map((itm, i) => (
                        <Link key={i} href={itm.url ? itm.url : "#"}>
                          <i className={`${itm.icon} text-white`}></i>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="teamCard__content">
                  <h4 className="teamCard__title">
                    <Link
                      className="linkCustom"
                      href={`/instructors/${elm.id}`}
                    >
                      {elm.name}
                    </Link>
                  </h4>
                  <p className="teamCard__text">{elm.role}</p>

                  <div className="row items-center y-gap-10 x-gap-10 pt-10">
                    <div className="col-auto">
                      <div className="d-flex items-center">
                        <div className="icon-star text-yellow-1 text-11 mr-5"></div>
                        <div className="text-14 lh-12 text-yellow-1 fw-500">
                          {elm.rating}
                        </div>
                      </div>
                    </div>

                    <div className="col-auto">
                      <div className="d-flex items-center">
                        <div className="icon-online-learning text-light-1 text-11 mr-5"></div>
                        <div className="text-14 lh-12">
                          {elm.students} Students
                        </div>
                      </div>
                    </div>

                    <div className="col-auto">
                      <div className="d-flex items-center">
                        <div className="icon-play text-light-1 text-11 mr-5"></div>
                        <div className="text-14 lh-12">
                          {elm.courses} Course
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row justify-center text-center pt-60 lg:pt-40">
          <div className="col-auto">
            <p className="lh-1">
              강사로 함께하길 원하시나요?
              <Link
                className="text-purple-1 underline"
                //href="/instructor-become"
                href="/signupt"
              >
                강사 회원가입하기
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
