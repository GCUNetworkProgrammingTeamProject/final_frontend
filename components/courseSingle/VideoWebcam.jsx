import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ReactPlayer from "react-player";
import Webcam from "react-webcam";

export default function VideoWebcam(props) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [video, setVideo] = useState(props.video);
  const [accessToken, setAccessToken] = useState("");
  const [videoPath, setVideoPath] = useState("");

  useEffect(() => {
    setVideo(props.video);
    const tmp = "/assets/img/courses/" + video.videoSrc;
    setVideoPath(tmp);
  },[props]);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    setPlaying(true);
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setPlaying(false);
    setCapturing(false);
    // After stopping, send the recorded video to the server
    sendVideoToServer();
  }, [mediaRecorderRef, setCapturing]);

  const sendVideoToServer = () => {
    console.log("call sendVideoToServer", recordedChunks.length);
    if (recordedChunks.length) {
      const formData = new FormData();
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      formData.append("video", blob, "captured_video.webm");
      console.log(formData);
      // Make an Axios POST request to your server endpoint to upload the video
      axios
        .post(`/api/user/lectures/${props.video.id}/analysis`,formData,config)
        .then((response) => {
          console.log(response);
          // Handle the server's response if needed
          console.log("Video uploaded successfully:", response.data);
        })
        .catch((error) => {
          // Handle any errors that occurred during the upload
          console.error("Error uploading video:", error);
        });
    }
  };
  return (
    <>
      <ReactPlayer
        url ={`/assets/img/courses/${props.video.videoContent}`}
        width="1080px"
        height="720px"
        controls={true}
        playing={playing}
      />
      <div>
       자꾸 캠 떠서 사용할때 주석 해제하기
       <Webcam audio={false} ref={webcamRef} style={{ display: "none" }} />
       {/*<Webcam audio={false} ref={webcamRef} />*/}
        {capturing ? (
          <button className="button -md -green-1 text-dark-1 fw-500 w-1/1" onClick={handleStopCaptureClick}>Stop Capture</button>
        ) : (
          <button className="button -md -green-1 text-dark-1 fw-500 w-1/1" onClick={handleStartCaptureClick}>Start Capture</button>
        )}
      </div>
    </>
  );
}
