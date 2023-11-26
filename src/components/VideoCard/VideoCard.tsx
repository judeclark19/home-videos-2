import { Video } from "@/pages";
import React from "react";
import {
  CommentsCTA,
  IFrame,
  Loading,
  SendMessageBtn,
  VideoEl,
  VideoInfo,
  VideoTitle
} from "./VideoCard.styles";

function VideoCard({ video }: { video: Video }) {
  const videoDate = new Date(`${video.date}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric"
    }
  );

  function formatDuration(seconds: number) {
    // Calculate the minutes and seconds from the total seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Pad the minutes and seconds with leading zeros if they are less than 10
    const paddedMinutes = String(minutes).padStart(2, "0");
    const paddedSeconds = String(remainingSeconds).padStart(2, "0");

    // Combine the minutes and seconds in MM:SS format
    return `${paddedMinutes}:${paddedSeconds}`;
  }

  return (
    <VideoEl id={video._id}>
      <Loading>
        Loading video...
        <IFrame
          className="video-iframe"
          src={video.url}
          frameBorder="0"
          width="560"
          height="315"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></IFrame>
      </Loading>

      <VideoTitle>{video.title}</VideoTitle>
      <VideoInfo>
        <p>
          <strong>Date</strong>: {videoDate}
        </p>
        <p>
          <strong>Duration</strong>: {formatDuration(video.duration)}
        </p>
        {video.beginning && (
          <p style={{ backgroundColor: "yellow" }}>
            <strong>Clip begins at</strong>: {video.beginning}
          </p>
        )}
        {video.description && (
          <p>
            <strong>Description</strong>: {video.description}
          </p>
        )}
        <p>
          <strong>Location</strong>: {video.location}
        </p>

        <p>
          <strong>Tags</strong>: {video.tags.join(", ")}
        </p>
        <p>
          <strong>People</strong>: {video.people.join(", ")}
        </p>

        {video.notes && <p className="video-notes"></p>}
      </VideoInfo>
      <CommentsCTA>
        <p>
          <em>Have comments or corrections for this video?</em>
        </p>
        <SendMessageBtn>Send message about this video</SendMessageBtn>
      </CommentsCTA>
    </VideoEl>
  );
  // return (
  //   <div className="videoEl">
  //     <div className="loading">
  //       Loading video...
  //       <iframe
  //         className="video-iframe"
  //         src=""
  //         frameBorder="0"
  //         width="560"
  //         height="315"
  //         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  //         allowFullScreen
  //         loading="lazy"
  //       ></iframe>
  //     </div>
  //     <div className="video-info">
  //       <h3 className="video-title">{title}</h3>
  //       <p className="video-date"></p>
  //       <p className="video-duration"></p>
  //       <p className="video-beginning"></p>
  //       <p className="video-description"></p>
  //       <p className="video-location"></p>
  //       <p className="video-tags"></p>
  //       <p className="video-people"></p>
  //       <p className="video-notes"></p>
  //     </div>
  //     <div style="padding: 20px; text-align: center">
  //       <p><em>Have comments or corrections for this video?</em></p>
  //       <button className="send-message">Send message about this video</button>
  //     </div>
  //   </div>
  // )
}

export default VideoCard;
