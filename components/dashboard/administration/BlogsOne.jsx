"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
export default function BlogsOne() {
  const [CommunityItems,setCommunityItems] = useState([]);
  const [CommunityPost,setCommunityPost] = useState([]);


  const accessToken = localStorage.getItem('accessToken');
  const handleInputCqSeq = (e) => {
    setCommunityPost(e);
  }

  const handleSubmitDelete = (e) => {
    e.preventDefault();
    axios.delete("/community/" + CommunityPost, config)
        .then(function (response) {
          alert(response.request.response);
          window.location.href=("/blog-list-1");
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  const config = {
    headers: {
      "Content-Type": 'application/json',
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`
    }
  }

  function handleModify(id){
    window.location.href=`blogs-modify?id=${id}`
  }


  useEffect(() => {
    const url = "/community";
    axios.get(url)
        .then(function (response) {
          setCommunityItems(response.data);
        })
        .catch(function (error) {
        })
  },[]);


  return (
      <>
        <section className="page-header -type-1">
          <div className="container">
            <div className="page-header__content">
              <div className="row justify-center text-center">
                <div className="col-auto">
                  <div>
                    <h1 className="page-header__title">아무거나 게시판</h1>
                  </div>

                  <div>
                    <p className="page-header__text">
                      당신의 생각을 다른 사람과 나누어보세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="layout-pt-sm layout-pb-lg">
          <div className="container">
            <div className="tabs -pills js-tabs">
              <div className="tabs__content pt-40 js-tabs-content">
                <div className="tabs__pane -tab-item-1 is-active">
                  <div className="row y-gap-30">

                    <Link href={`/blogs-modify`}>
                      <button
                          type="submit"
                          className="button text-13 -sm -light-7 text-purple-1"
                          style={{float:"right"}} >
                        게시글 등록
                      </button>
                    </Link>


                  </div>
                  {CommunityItems.map((elm, i) => (

                      <div key={i} className="col-lg-4 col-md-6">
                        <form onSubmit={handleSubmitDelete}>
                          <button
                              onClick={()=>{
                                handleInputCqSeq(elm.id)
                              }}
                              type="submit"
                              className="button text-13 -sm -light-7 text-purple-1"
                              style={{float:"right"}} >
                            삭제
                          </button>
                        </form>
                        <button
                            onClick={()=>{
                              handleModify(elm.id)
                            }}
                            type="submit"
                            className="button text-13 -sm -light-7 text-purple-1"
                            style={{float:"right", marginRight:"10px"}} >
                          수정
                        </button>
                        <div className="blogCard -type-1">
                        </div>
                        <div className="blogCard__content mt-20">
                          <h4 className="blogCard__title text-20 lh-15 fw-500 mt-5">
                            <Link
                                className="linkCustom"
                                href={`blogs?id=${elm.id}`}
                            >
                              제목 : {elm.cpTitle}
                            </Link>
                          </h4>
                          <div className="blogCard__category">
                            <p>작성자 : {elm.writer}</p>
                          </div>
                          <div className="blogCard__date text-14 mt-5">
                            작성일 : {elm.modTime}
                          </div>
                        </div>
                      </div>
                  ))}
                  <div className="row justify-center pt-60 lg:pt-40">
                    <div className="col-auto">
                      <div className="pagination -buttons">
                        <button className="pagination__button -prev">
                          <i className="icon icon-chevron-left"></i>
                        </button>

                        <div className="pagination__count">
                          <a href="#">1</a>
                          <a className="-count-is-active" href="#">
                            2
                          </a>
                          <a href="#">3</a>
                          <span>...</span>
                          <a href="#">7</a>
                        </div>

                        <button className="pagination__button -next">
                          <i className="icon icon-chevron-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
  );
}