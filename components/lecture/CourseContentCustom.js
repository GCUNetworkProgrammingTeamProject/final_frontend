"use client";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lessonItems } from "@/data/aboutcourses";
import axios from "axios";
import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import VideoWebcam from "./VideoWebcam";

export default function CourseContent(props) {
    const [activeItemId, setActiveItemId] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [videoSeq, setVideoSeq] = useState(0); // 선택한 강의의 ID 또는 다른 식별자
    const [recordingStarted, setRecordingStarted] = useState(false);
    const [webcamRecording, setWebcamRecording] = useState(false);
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setAccessToken(token);
    },[]);

    // const handleVideoFinish = () => {
    //     // 동영상 시청이 완료되면 녹화를 종료하고 서버로 녹화된 웹캠을 전송합니다.
    //     setWebcamRecording(false);
    //
    //     // 여기에서 녹화된 웹캠 비디오를 서버로 전송하는 코드를 추가합니다.
    //     // 예: axios.post("/uploadWebcamVideo", { webcamVideo: recordedWebcamBlob })
    // };

    // const handleVideoPlayClick = () => {
    //     // 웹캠 녹화를 시작합니다.
    //     setRecordingStarted(true);
    //     setWebcamRecording(true);
    // };

  
    function requestMediaAccess() {
        // 미디어 액세스 권한을 요청하기 전에 미리 확인합니다.
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("미디어 액세스가 지원되지 않습니다.");
            return;
        }

        // 카메라 및 마이크 액세스 권한을 요청합니다.
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(function (stream) {
                // 성공적으로 권한을 얻은 경우의 처리 로직을 여기에 추가합니다.
                alert("미디어 액세스 권한이 허용되었습니다.");
                // 예: 비디오 요소에 스트림 연결
                const videoElement = document.getElementById("video");
                videoElement.srcObject = stream;
            })
            .catch(function (error) {
                // 권한 요청에 실패한 경우의 처리 로직을 여기에 추가합니다.
                alert("미디어 액세스 권한을 얻을 수 없습니다: " + error.message);
            });
    }

    // function handleClick() {
    //     requestMediaAccess();
    //     handleVideoPlayClick();
    // }

    return (
        <>
            <div id="course-content" className="pt-10 lg:pt-40">
                

                <div className="mt-10">
                    <div className="accordion -block-2 text-left js-accordion">
                        {/* <VideoPlayer videoUrl={`https://www.youtube.com/watch?v=rSihmNPEAzo`} /> */}
                        {/* <ReactPlayer url="assets/video/video.mp4" width="1080px" height="720px" controls={true} />
                        <div>
                            {recordingStarted ? (
                                <WebcamRecorder id = {coursesData.id}
                                    isRecording={webcamRecording}
                                    onRecordingFinish={handleVideoFinish}
                                />
                            ) : (
                                <button onClick={handleClick}>비디오 재생</button>
                            )}
                        </div> */}
                        <VideoWebcam video={props.video}/>
                    {/*    {lessonItems.map((elm, i) => (*/}
                    {/*        <div*/}
                    {/*            key={i}*/}
                    {/*            className={`accordion__item ${*/}
                    {/*                activeItemId == elm.id ? "is-active" : ""*/}
                    {/*            } `}*/}
                    {/*        >*/}
                    {/*            <div*/}
                    {/*                onClick={() =>*/}
                    {/*                    setActiveItemId((pre) => (pre == elm.id ? 0 : elm.id))*/}
                    {/*                }*/}
                    {/*                className="accordion__button py-20 px-30 bg-light-4"*/}
                    {/*            >*/}
                    {/*                <div className="d-flex items-center">*/}
                    {/*                    <div className="accordion__icon">*/}
                    {/*                        <div className="icon">*/}
                    {/*                            <FontAwesomeIcon icon={faChevronDown} />*/}
                    {/*                        </div>*/}
                    {/*                        <div className="icon">*/}
                    {/*                            <FontAwesomeIcon icon={faChevronUp} />*/}
                    {/*                        </div>*/}
                    {/*                    </div>*/}
                    {/*                    <span className="text-17 fw-500 text-dark-1">*/}
                    {/*  강의 목록*/}
                    {/*</span>*/}
                    {/*                </div>*/}

                    {/*                <div>*/}
                    {/*                    {elm.lessons.length} lectures • {elm.duration} min*/}
                    {/*                </div>*/}
                    {/*            </div>*/}

                    {/*            <div*/}
                    {/*                className="accordion__content"*/}
                    {/*                style={activeItemId == elm.id ? { maxHeight: "700px" } : {}}*/}
                    {/*            >*/}
                    {/*                <div className="accordion__content__inner px-30 py-30">*/}
                    {/*                    <div className="y-gap-20">*/}
                    {/*                        {elm.lessons.map((itm, index) => (*/}
                    {/*                            <div key={index} className="d-flex justify-between">*/}
                    {/*                                <div className="d-flex items-center">*/}
                    {/*                                    <div className="d-flex justify-center items-center size-30 rounded-full bg-purple-3 mr-10">*/}
                    {/*                                        <div className="icon-play text-9"></div>*/}
                    {/*                                    </div>*/}
                    {/*                                    <div>{itm.title}</div>*/}
                    {/*                                </div>*/}

                    {/*                                <div className="d-flex x-gap-20 items-center">*/}
                    {/*                                    <span onClick={() => setIsOpen(true)} className="text-14 lh-1 text-purple-1 underline cursor ">*/}
                    {/*                                        미리보기*/}
                    {/*                                    </span>*/}
                    {/*                                    */}
                    {/*                                    <a*/}
                    {/*                                        href="#"*/}
                    {/*                                        className="text-14 lh-1 text-purple-1 underline"*/}
                    {/*                                    >*/}
                    {/*                                        강의 길이{elm.duration}*/}
                    {/*                                    </a>*/}
                    {/*                                </div>*/}
                    {/*                            </div>*/}
                    {/*                        ))}*/}
                    {/*                    </div>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    ))}*/}
                    </div>
                </div>
            </div>
            {/*<ModalVideoComponent*/}
            {/*    isOpen={isOpen}*/}
            {/*    setIsOpen={setIsOpen}*/}
            {/*    videoId={videoUrl}*/}
            {/*/>*/}
        </>
    );
}

