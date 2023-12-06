import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import axios from "axios";

function VideoRecorder(props) {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [accessToken, setAccessToken] = useState("");

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
  }, [props.video.videoSeq]);

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
        formData.append("file", blob, "recorded-video.webm");

        axios
          .post(
            `/api/user/lectures/${props.video.videoSeq}/analysis`,
            formData,
            config
          )
          .then((response) => {
            // console.log("영상 전송 성공:", response.data);
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

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url={`/assets/video/${props.video.videoContent}`}
        controls={true}
        playing={false}
        onPlay={handleStartRecording}
        onPause={handlePause}
        onEnded={handleStopRecording}
      />
      <video ref={videoRef} style={{ display: "none" }} autoPlay muted />
    </div>
  );
}

export default VideoRecorder;
