"use client";
import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import ChatbotPersonal from "@/components/courseSingle/ChatbotPersonal";
import axios from "axios";

export default function CourseListTwo() {
  const [url, setUrl] = useState("");
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [accessToken, setAccessToken] = useState("");
  const [urlEntered, setUrlEntered] = useState(false); // Track if URL has been entered

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  useEffect(() => {
    let stream;
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        stream = currentStream;
        videoRef.current.srcObject = stream;
        const options = { mimeType: "video/webm" };
        const recorder = new MediaRecorder(stream, options);
        setMediaRecorder(recorder);

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
          }
        };

        recorder.onstop = handleStopRecording;
      })
      .catch((error) => {
        console.error("미디어 스트림 권한 오류:", error);
      });

    return () => {
      if (stream) {
        // 각 트랙을 중단합니다.
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [url]);

  const handleStartRecording = () => {
    if (mediaRecorder?.state === "inactive") {
      mediaRecorder.start(1000);
      setRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (
      mediaRecorder &&
      (mediaRecorder.state === "recording" || mediaRecorder.state === "paused")
    ) {
      mediaRecorder.stop();
      setRecording(false);

      if (recordedChunks.length > 0) {
        const blob = new Blob(recordedChunks, { type: "video/webm" });
        const formData = new FormData();
        formData.append("personalVideoCn", url);
        formData.append("file", blob, "recorded-video.webm");

        axios
          .post(`/api/users/lectures/stream/per`, formData, config)
          .then((response) => {
            console.log("영상 전송 성공:", response.data);
            alert(response.data);
          })
          .catch((error) => {
            console.error("영상 전송 오류:", error);
          });

        setRecordedChunks([]);
      }
    }
  };

  const handlePause = () => {
    if (recording && mediaRecorder?.state === "recording") {
      mediaRecorder.pause();
    }
  };

  // Function to handle saving the URL
  const handleSaveUrl = () => {
    axios
      .get("/api/users/subscribe", config)
      .then(function(response) {
        // console.log(response);
        if (response.data[0].status == "BUY" && url) {
          setUrlEntered(true);
        } else {
          alert("구독권을 결제해주세요");
          setUrlEntered(false);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <>
      <section className="page-header -type-1 mt-90 pt-90">
        <div className="container">
          <div
            className="page-header__content counter"
            style={{ fontSize: "70px" }}
          >
            {!urlEntered ? ( // Render input form if URL not entered
              <>
                개인학습 URL 입력
                <form>
                  <input
                    type="text"
                    placeholder="Enter URL"
                    value={url}
                    onChange={handleUrlChange}
                  />
                  <button type="button" className="button -md -green-1 text-dark-1 fw-500 w-1/1" onClick={handleSaveUrl}>
                    입력
                  </button>
                </form>
              </>
            ) : (
              // Render this section if URL entered
              <section className="layout-pt-md layout-pb-lg">
                <div className="container">
                  <div className="row y-gap-50">
                    <div className="col-xl-9 col-lg-8">
                      <ReactPlayer
                        ref={playerRef}
                        url={url}
                        controls={true}
                        playing={false}
                        onPlay={handleStartRecording}
                        onPause={handlePause}
                        onEnded={handleStopRecording}
                      />
                    </div>
                    <div>
                      <ChatbotPersonal url={url} />
                    </div>
                  </div>
                </div>
              </section>
            )}
            <video ref={videoRef} style={{ display: "none" }} autoPlay muted />
          </div>
        </div>
      </section>
    </>
  );
}
