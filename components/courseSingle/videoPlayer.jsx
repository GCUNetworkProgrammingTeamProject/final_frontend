import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl }) => {
    return (
        <div className="video-player">
            <ReactPlayer
                url={videoUrl}
                width="1080px"
                height="720px"
                controls={true}
            />
        </div>
    );
};

export default VideoPlayer;