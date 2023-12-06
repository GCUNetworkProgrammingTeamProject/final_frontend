import axios from "axios";
import React, { useState, useRef } from "react";

const WebcamRecorder = ({ videoSeq }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const videoRef = useRef(null);
  const chunks = useRef([]);
  const webcamStream = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      webcamStream.current = stream;
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: "video/webm" });
        chunks.current = [];

        // 녹화된 Blob 데이터를 서버로 전송 (예: Axios 사용)
        sendRecordedVideoToServer(recordedBlob);

        videoRef.current.srcObject = null;
        webcamStream.current.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);
      setMediaRecorder(mediaRecorder);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const sendRecordedVideoToServer = (blob) => {
    const formData = new FormData();
    formData.append("recordedVideo", blob);

    axios
      .get(`/user/lectures/${videoSeq}/analysis`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    // 서버로 녹화된 비디오 전송 (예: Axios 사용)
    // axios.post("/upload-video", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    // .then(response => {
    //   console.log("Video upload successful:", response);
    // })
    // .catch(error => {
    //   console.error("Video upload error:", error);
    // });

    // 실제로는 서버에 녹화된 비디오를 업로드하는 로직을 구현해야 합니다.
  };

  return (
    <div className="webcam-recorder">
      <div>
        <button onClick={startRecording} disabled={recording}>
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!recording}>
          Stop Recording
        </button>
      </div>
      <div className="video-container">
        <video ref={videoRef} autoPlay muted controls />
      </div>
    </div>
  );
};

export default WebcamRecorder;
