"use client";

import React, {useEffect, useState} from "react";
import axios from "axios";

export default function BlogDetails({ id }) {
  const [CommunityItems,setCommunityItems] = useState([]);
  const [CommunityComment, setCommunityComment] = useState([]);

    const [CcSeq, setCcSeq] = useState("");
    const [CcContent, setCcContent] = useState("");
    // 댓글 수정기능

    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = (commentId) => {
      console.log("댓글번호",commentId);
      // 수정 버튼 클릭 시 실행되는 함수
      handleInputCcSeq(commentId); // 수정 대상 댓글 ID 설정
      setIsEditing(true); // 수정 모드로 전환
      // 기존 댓글 내용을 입력 폼에 설정
      const commentToEdit = CommunityComment.find((comment) => comment.id === commentId);
      setCcContent(commentToEdit.ccContent);
    };
    
    const handleCancelEdit = () => {
      // 수정 취소 시 실행되는 함수
      setIsEditing(false); // 수정 모드 종료
      setCcSeq(""); // 수정 대상 댓글 ID 초기화
      setCcContent(""); // 입력 폼 내용 초기화
    };

    const handleEdit = (e) => {
      e.preventDefault();
      axios.patch(`api/community/comments/${CcSeq}`, { content: CcContent }, config)
        .then(function (response) {
          alert(response.request.response);
          window.location.href = (`/blogs?id=${id}`);
        })
        .catch(function (error) {
          console.log(error);
        });
    
      // 다음 라인들은 .then 블록 이후로 이동하여 경쟁 상태(race condition)를 방지합니다.
      setIsEditing(false);
      setCcSeq("");
      setCcContent("");
    };
    
    useEffect(() => {
      console.log("댓글 초기화 번호 ", CcSeq);
      console.log("댓글 초기화 내용 ", CcContent);
    }, [CcSeq, CcContent]);
    
    



    const handleInputCcSeq = (e) => {
        setCcSeq(e);
    }

    const handleInputCcContent = (e) => {
        setCcContent(e.target.value);
    }


    const handleSubmitDelete = (e) => {
      e.preventDefault();
      axios.delete("api/community/comments/" + CcSeq, config)
        .then(function (response) {
          alert(response.request.response);
          // 상태 업데이트를 .then 블록 안으로 이동
          setCommunityComment((prevComments) => prevComments.filter(comment => comment.id !== CcSeq));
          window.location.href=("/blogs?id="+id);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    
    // 댓글 작성
    const handleSubmitPost = (e) => {
        e.preventDefault();
        axios.post("/api/community/" + id + "/new", { ccContent: CcContent } , config)
            .then(function (response) {
                alert(response.request.response);
                window.location.href=("/blogs?id="+id);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const accessToken = localStorage.getItem('accessToken');

    const config = {
        headers: {
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`
        }
    }

    useEffect(() => {
      const url = "/community/" + id;
      const ccUrl = "api/community/" + id + "/comments";
    
      axios.get(url)
        .then(function (response) {
          setCommunityItems(response.data);
        })
        .catch(function (error) {
        });
    
      axios.get(ccUrl)
        .then(function (values) {
          const commentsData = values.data.content;
    
          // 수정 중인 댓글의 내용이 있는지 확인
          if (isEditing && CcSeq) {
            const editingComment = commentsData.find((comment) => comment.id === CcSeq);
            if (editingComment) {
              // 수정 중인 댓글이 있으면 해당 내용으로 설정
              setCcContent(editingComment.ccContent);
            }
          }
    
          // 성공적으로 데이터를 불러온 후에 상태를 업데이트
          setCommunityComment(commentsData);
        })
        .catch(function (error) {
        });
    }, [id, isEditing, CcSeq]);
    



  return (
      <>
        <section className="page-header -type-1">
          <div className="container">
            <div className="page-header__content">
              <div className="row justify-center text-center">
                <div className="col-auto">
                  <div>
                    <h1 className="page-header__title">제목 : {CommunityItems.cpTitle}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="layout-pt-md layout-pb-lg">
          <div className="container">
            <div className="blogSection">
              <div className="blogCard">
                <div className="row justify-center">
                  <div className="col-xl-8 col-lg-9 col-md-11">
                    <div className="blogCard__content" style={{ whiteSpace: "normal", wordBreak:"break-all" }}>
                      <h4 className="text-18 fw-500">
                        작성자 : {CommunityItems.writer}
                      </h4>
                      <p className="mt-30">
                        {CommunityItems.cpContent}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="layout-pt-md layout-pb-lg">
          <div className="row justify-center pt-30">
            <div className="col-xl-8 col-lg-9 col-md-11">
              <div className="blogPost -comments">
                <div className="blogPost__content">
                  <h2 className="text-20 fw-500">댓글</h2>
                  <form className="contact-form respondForm__form row y-gap-20 pt-30"
                        onSubmit={handleSubmitDelete}>
                    {CommunityComment.map((elm, i) => (
                        <ul className="comments__list mt-30">
                          <li className="comments__item">
                            <div className="comments__item-inner md:direction-column">
                              <div className="comments__body md:mt-15">
                                <div className="comments__header">
                                  <h4 className="text-17 fw-500 lh-15" >
                                    작성자 : {elm.writer}
                                  </h4>
                                  <div className="stars"></div>
                                </div>
                                <div className="comments__text mt-10">
                                  <p  style={{ whiteSpace: "normal", wordBreak:"break-all"}}
                                      value={elm.id}
                                  >
                                    {elm.ccContent}
                                  </p>


                                  {isEditing && elm.id === CcSeq ? (
                                    // 수정 중인 댓글일 경우
                                    <>
                                      <button onClick={handleCancelEdit} className="button text-13 -sm -light-7 text-purple-1" style={{ float: "right" }}>
                                        수정 취소
                                      </button>
                                    </>
                                  ) : (
                                    // 수정 중이 아닌 경우
                                    <button
                                      onClick={() => handleEditClick(elm.id)}
                                      className="button text-13 -sm -light-7 text-purple-1"
                                      style={{ float: "right" }}
                                    >
                                      수정
                                    </button>
                                  )}
                                  {/* 삭제 버튼은 수정 중이 아닌 경우에만 표시 */}
                                  {!isEditing && (
                                    <button onClick={() => handleInputCcSeq(elm.id)} type="submit" className="button text-13 -sm -light-7 text-purple-1" style={{ float: "right" }}>
                                      삭제
                                    </button>
                                  )}
                                </div>


                                
                                <span className="text-13 text-light-1 fw-400">
                                   등록일 : {elm.modTime}
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                    ))}
                  </form>
                  <div className="respondForm pt-30">
                  <h3 className="text-20 fw-500">
                    {isEditing ? "댓글 수정하기" : "댓글 달기"}
                  </h3>
                  </div>
                  <form className="contact-form respondForm__form row y-gap-30 pt-30" onSubmit={isEditing ? handleEdit : handleSubmitPost}>
                    <div className="col-12">
                      <input
                        required
                        type="text"
                        name="title"
                        placeholder={isEditing ? "댓글을 수정해주세요." : "댓글을 입력해주세요."}
                        value={CcContent}
                        onChange={handleInputCcContent}
                      />
                    </div>
                    <div className="col-12">
                      <button
                        type="submit"
                        name="submit"
                        id="submit"
                        className="button -md -purple-1 text-white"
                      >
                        {isEditing ? "수정하기" : "작성하기"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>



        </section>
      </>
  );
}
