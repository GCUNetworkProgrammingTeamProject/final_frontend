"use client";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lessonItems } from "@/data/aboutcourses";
import axios from "axios";
import React, {useEffect, useState} from "react";
import ModalVideoComponent from "../common/ModalVideo";
import ReactPlayer from "react-player";
import VideoPlayer from "./videoPlayer"
import WebcamRecorder from "./WebcamRecorderCustom";
export default function CourseContent({ id }) {
    const [activeItemId, setActiveItemId] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [videoList, setVideoList] = useState([]);
    const [videoSeq, setVideoSeq] = useState("");
    const [recordingStarted, setRecordingStarted] = useState(false);
    const [webcamRecording, setWebcamRecording] = useState(false);
    const [recordedWebcamBlob, setRecordedWebcamBlob] = useState(null);
  
    const handleVideoFinish = () => {
      setWebcamRecording(false);
    };
  
    const handleVideoPlayClick = () => {
      setRecordingStarted(true);
      setWebcamRecording(true);
    };
  
    function requestMediaAccess() {
      const isSecureContext = window.isSecureContext || /^https:/.test(window.location.protocol);
  
      if (!isSecureContext) {
        alert("미디어 액세스는 보안 컨텍스트에서만 지원됩니다.");
        return;
      }
  
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("미디어 액세스가 지원되지 않습니다.");
        return;
      }
  
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(function (stream) {
          alert("미디어 액세스 권한이 허용되었습니다.");
          const videoElement = document.getElementById("video-output");
          videoElement.srcObject = stream;
        })
        .catch(function (error) {
          alert("미디어 액세스 권한을 얻을 수 없습니다: " + error.message);
        });
    }
  
    const handleClick = () => {
      requestMediaAccess();
      handleVideoPlayClick();
    };
  
    return (
      <>
        <div id="course-content" className="pt-60 lg:pt-40">
          <h2 className="text-20 fw-500">강의 시청</h2>
  
          <div className="d-flex justify-between items-center mt-30"></div>
  
          <div className="mt-10">
            <div className="accordion -block-2 text-left js-accordion">
              <div>
                {recordingStarted ? (
                  <WebcamRecorder
                    isRecording={webcamRecording}
                    onRecordingFinish={(blob) => {
                      setWebcamRecording(false);
                      setRecordedWebcamBlob(blob);
                    }}
                  />
                ) : (
                  <button onClick={handleClick}>비디오 재생</button>
                )}
              </div>
  
              <div>
                {/* Add your video player component here */}
                <VideoPlayer videoUrl={recordedWebcamBlob} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }