"use client";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { lessonItems } from "@/data/aboutcourses";
import axios from "axios";
import React, {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import VideoWebcam from "./VR";

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


    return (
        <>
            <VideoWebcam video={props.video}/>
        </>
    );
}

