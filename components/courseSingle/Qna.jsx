"use client";
import React, {useState, useEffect} from "react";
import { reviews } from "@/data/aboutcourses";
import Star from "../common/Star";
import axios from "axios";
import Pagination from "./CdoPagination";
export default function Reviews(props) {
    const [title, setTitle] = useState("");
    const [question, setQuestion] = useState("");
    const [isSecret, setIsSecret] = useState("false");
    const [accessToken, setAccessToken] = useState("");
    const [videoSeq, setVideoSeq] = useState("");
    const [lectureSeq, setLectureSeq] = useState(props.lectureSeq);
    const [queryList, setQueryList] = useState([]);
    const [showDetail, setShowDetail] = useState({});
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 관리하는 상태
    const [postsPerPage] = useState(5); // 페이지당 표시할 게시물 수 (원하는 값으로 수정)
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    useEffect(() => {
        // videoSeq가 유효한지 확인
        if (props.video && props.video.videoSeq) {
            // console.log("qna url : ", `/api/users/lectures/qna/${props.video.videoSeq}`);

            axios.get(`/api/users/lectures/qna/${props.video.videoSeq}`)
                .then(function (response) {
                    setQueryList(response.data);
                    console.log("queryList : ",queryList);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            // videoSeq가 유효하지 않은 경우의 처리 (예: 로깅, 상태 업데이트 등)
            console.log("videoSeq is undefined");
        }
    }, [props.video.videoSeq]);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setAccessToken(token);
      },[accessToken]);
    // 질문 제목 클릭 시 세부 내용 표시 상태를 토글하는 함수
    const toggleDetail = (index) => {
        setShowDetail(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const handleInputTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleInputQuestion = (e) => {
        setQuestion(e.target.value);
    }
    const handleInputIsSecret = (e) => {
        setQuestion(e.target.value);
    }
    var data = {

            inquiryTitle : title,
            inquiryQuestion : question,
            inquiryIsSecret : isSecret

    }

    const config = {
        headers: {
            "Content-Type": 'application/json',
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/api/users/lectures/qna/${props.video.videoSeq}`, data , config)
            .then(function (response) {
                alert(response.request.response);
                // 새로운 게시글을 queryList에 추가
                const newQuery = {
                    inquiryTitle: title,
                    inquiryQuestion: question,
                    inquiryIsAnswered: false, // 새로 작성된 게시글은 아직 답변되지 않았다고 가정
                    // 다른 필요한 데이터도 여기에 추가
                };
                setQueryList(prevQueryList => [...prevQueryList, newQuery]);
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    const currentPosts = queryList.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div id="reviews" className="pt-60 lg:pt-40">
            <div className="respondForm pt-60">
                <h3 className="text-20 fw-500">강의 질문</h3>
                <form
                    className="contact-form respondForm__form row y-gap-30 pt-30"
                    onSubmit={handleSubmit}
                >
                    <div className="col-12">
                        <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                            질문 제목
                        </label>
                        <input
                            required
                            type="text"
                            name="inquiryTitle"
                            value={title}
                            onChange={handleInputTitle}
                            placeholder="질문의 제목을 입력해주세요."
                        />
                    </div>
                    <div className="col-12">
                        <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                            질문 내용
                        </label>
                        <textarea
                            required
                            name="inquiryQuestion"
                            placeholder="질문 내용을 입력해주세요."
                            value={question}
                            onChange={handleInputQuestion}
                            rows="8"
                        ></textarea>
                    </div>
                    <div className="col-12">
                        <button
                            type="submit"
                            name="submit"
                            id="submit"
                            className="button -md -purple-1 text-white"
                        >
                            질문 등록
                        </button>
                    </div>
                </form>
            </div>

            <div className="blogPost -comments">
                <div className="blogPost__content">
                    <h2 className="text-20 fw-500 mt-60 lg:mt-40">Q&A</h2>
                    <ul className="comments__list mt-30">
                        {currentPosts.map((elm, i) => (
                            <li key={i} className="comments__item mb-20 pb-0">
                                <div className="comments__item-inner md:direction-column">
                                    <div className="comments__body md:mt-15">
                                        <h5
                                            className="text-30 fw-500 mt-15 mb-15 hover-border"
                                            onClick={() => toggleDetail(i)} // 클릭 이벤트 핸들러 추가
                                        >
                                            질문 : {elm.inquiryTitle}
                                        </h5>
                                        {showDetail[i] && ( // 조건부 렌더링
                                            <div>
                                                <div className="comments__header ">
                                                    <h4 className="text-15 fw-500 lh-15">
                                                        질문자 : {elm.questioner}
                                                    </h4>
                                                </div>
                                                <div className="comments__text mt-10  border-dark-3 rounded-4">
                                                    <p>{elm.inquiryQuestion}</p>
                                                </div>
                                                <span className="text-13 text-light-1 fw-400 mt-10" style={{ float: "right" }}>
                                                    작성일 : {elm.date}
                                                </span>
                                                {elm.inquiryIsAnswered && ( // 답변이 있는 경우에만 렌더링
                                                    <div className="ml-50">
                                                        <div className="comments__header ">
                                                            <h4 className="text-15 fw-500 lh-15">
                                                                답변자 : {elm.responder} {/* 예시로 답변자 정보 수정 */}
                                                            </h4>
                                                        </div>
                                                        <div className="comments__text mt-10  border-dark-3 rounded-4">
                                                            <p>{elm.answer} {/* 예시로 답변 내용 수정 */}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Pagination
                        currentPage={currentPage}
                        postsPerPage={postsPerPage}
                        totalPosts={queryList.length} // 전체 게시물 수
                        paginate={setCurrentPage} // 페이지 번호 업데이트 함수
                    />
                </div>
            </div>
        </div>
    );
}
