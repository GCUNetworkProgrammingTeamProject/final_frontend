"use client";
import React, { useState, useEffect } from "react";
import { reviews } from "@/data/aboutcourses";
import Star from "../common/Star";
import axios from "axios";
export default function Reviews({ id }) {
  const [reviewList, setReviewList] = useState([]);
  const [reviewContent, setReviewContent] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [revSeq, setRevSeq] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get("/api/users/lectures/review/" + id, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function(response) {
        setReviewList(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const handleSetContent = (e) => {
    setReviewContent(e.target.value);
  };

  var data = {
    revContent: reviewContent,
    revScore: 5,
  };

  const handleSubmit = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (isEdit === true) {
      axios
        .put("/api/users/lectures/review/" + id + "/" + revSeq, data, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(function(response) {
          console.log(response.request.response);
        })
        .catch(function(error) {
          console.log(error);
        });
      window.location.href = "courses?id=" + id;
    } else {
      axios
        .post("/api/users/lectures/review/" + id, data, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(function(response) {
          console.log(response.request.response);
          window.location.href = "courses?id=" + id;
        })
        .catch(function(error) {
          console.log(error);
        });
      window.location.href = "courses?id=" + id;
    }
  };

  const handleDelete = (seq) => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .delete("/api/users/lectures/review/" + id + "/" + seq, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function(response) {
        console.log(response.request.response);
        window.location.href = "courses?id=" + id;
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const setEdit = (revSeq) => {
    setRevSeq(revSeq);
    setIsEdit(true);
  };

  const cancelEdit = () => {
    setIsEdit(false);
  };

  return (
    <div id="reviews" className="pt-60 lg:pt-40">
      <div className="blogPost -comments">
        <div className="blogPost__content">
          {/* <h2 className="text-20 fw-500">Student feedback</h2>
            <div className="row x-gap-10 y-gap-10 pt-30">
              <div className="col-md-4">
                <div className="d-flex items-center justify-center flex-column py-50 text-center bg-light-6 rounded-8">
                  <div className="text-60 lh-11 text-dark-1 fw-500">4.8</div>
                  <div className="d-flex x-gap-5 mt-10">
                    <Star star={5} textSize={"text-11"} />
                  </div>
                  <div className="mt-10">Course Rating</div>
                </div>
              </div>

              <div className="col-md-8">
                <div className="py-20 px-30 bg-light-6 rounded-8">
                  <div className="row y-gap-15">
                    <div className="col-12">
                      <div className="d-flex items-center">
                        <div className="progress-bar w-1/1 mr-15">
                          <div className="progress-bar__bg bg-light-12"></div>
                          <div className="progress-bar__bar bg-purple-1 w-1/1"></div>
                        </div>
                        <div className="d-flex x-gap-5 pr-15">
                          <Star star={5} />
                        </div>
                        <div className="text-dark-1">70%</div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-flex items-center">
                        <div className="progress-bar w-1/1 mr-15">
                          <div className="progress-bar__bg bg-light-12"></div>
                          <div className="progress-bar__bar bg-purple-1 w-1/2"></div>
                        </div>
                        <div className="d-flex x-gap-5 pr-15">
                          <Star star={5} />
                        </div>
                        <div className="text-dark-1">15%</div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-flex items-center">
                        <div className="progress-bar w-1/1 mr-15">
                          <div className="progress-bar__bg bg-light-12"></div>
                          <div className="progress-bar__bar bg-purple-1 w-1/3"></div>
                        </div>
                        <div className="d-flex x-gap-5 pr-15">
                          <Star star={5} />
                        </div>
                        <div className="text-dark-1">20%</div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-flex items-center">
                        <div className="progress-bar w-1/1 mr-15">
                          <div className="progress-bar__bg bg-light-12"></div>
                          <div className="progress-bar__bar bg-purple-1 w-1/5"></div>
                        </div>
                        <div className="d-flex x-gap-5 pr-15">
                          <Star star={5} />
                        </div>
                        <div className="text-dark-1">3%</div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="d-flex items-center">
                        <div className="progress-bar w-1/1 mr-15">
                          <div className="progress-bar__bg bg-light-12"></div>
                          <div className="progress-bar__bar bg-purple-1 w-1/7"></div>
                        </div>
                        <div className="d-flex x-gap-5 pr-15">
                          <Star star={5} />
                        </div>
                        <div className="text-dark-1">2%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

          <h2 className="text-20 fw-500 mt-60 lg:mt-40">리뷰 목록</h2>
          <ul className="comments__list mt-30">
            {!reviewList.length && (
              <div className="p-20 pb-30 text-18 text-dark-1">
                아직 리뷰가 없습니다.
              </div>
            )}
            {reviewList.map((elm, i) => (
              <li key={i} className="comments__item">
                <div className="comments__item-inner md:direction-column">
                  <div className="comments__img mr-20">
                    <div
                      className="bg-image rounded-full js-lazy"
                      style={{
                        backgroundImage: `url(/assets/img/general/avatar-1.png)`,
                      }}
                    ></div>
                  </div>

                  <div className="comments__body md:mt-15">
                    <div className="comments__header">
                      <h4 className="text-17 fw-500 lh-15">
                        {elm.member.name}
                        <span
                          className="text-13 text-light-1 fw-400"
                          style={{ marginLeft: "10px" }}
                        ></span>
                      </h4>
                      <div className="stars"></div>
                    </div>

                    <div className="comments__text mt-10">
                      <p>{elm.revContent}</p>
                    </div>

                    <div className="comments__helpful mt-20">
                      {isEdit === true ? (
                        <button
                          className="button text-11 -sm -purple-1 text-white"
                          onClick={cancelEdit}
                        >
                          취소
                        </button>
                      ) : (
                        <button
                          className="button text-11 -sm -purple-1 text-white"
                          onClick={() => {
                            setEdit(elm.revSeq);
                          }}
                        >
                          수정
                        </button>
                      )}

                      <button
                        className="button text-11 -sm -light-7 text-purple-1"
                        onClick={() => {
                          handleDelete(elm.revSeq);
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="respondForm pt-60">
        <h3 className="text-20 fw-500">
          {isEdit === true ? "리뷰 수정" : "리뷰 작성"}
        </h3>

        {/* <div className="mt-30">
            <h4 className="text-16 fw-500">별점</h4>
            <div className="d-flex x-gap-10 pt-10">
              <Star star={5} textSize={"text-14"} />
            </div>
          </div> */}

        <form className="contact-form respondForm__form row y-gap-30 pt-30">
          <div className="col-12">
            <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              {isEdit === true ? "내용 수정" : "리뷰 내용"}
            </label>
            <textarea
              required
              id="comment"
              placeholder={
                isEdit === true
                  ? "수정 내용을 입력해주세요"
                  : "리뷰 내용을 입력해주세요"
              }
              rows="8"
              onChange={handleSetContent}
            ></textarea>
          </div>
          <div className="col-12">
            <button
              type="button"
              name="submit"
              id="submit"
              className="button -md -purple-1 text-white"
              onClick={handleSubmit}
            >
              {isEdit === true ? "리뷰 수정하기" : "리뷰 작성하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
