import { Video } from "@/pages";
import React from "react";
import {
  CommentsCTA,
  IFrame,
  Loading,
  SendMessageBtn,
  VideoEl,
  VideoInfo,
  VideoTitleAndDate
} from "./VideoCard.styles";
import { useRecoilState } from "recoil";
import { isModalOpenState, videoBeingCommentedState } from "@/state";
import { useMutation } from "@tanstack/react-query";

function VideoCard({ video }: { video: Video }) {

  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);
  const [videoBeingCommented, setVideoBeingCommented] = useRecoilState(videoBeingCommentedState);

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


      <VideoTitleAndDate>
        <h2>{video.title}</h2>
        <h3>{videoDate}</h3>
      </VideoTitleAndDate>
      <VideoInfo>
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

        {video.notes && <p><strong>Notes</strong>: {video.notes}</p>}
      </VideoInfo>
      <CommentsCTA>
        <p>
          <em>Have comments or corrections for this video?</em>
        </p>
        <SendMessageBtn
          onClick={() => {
            setVideoBeingCommented({ ...videoBeingCommented, videoId: video._id, url: video.url, title: video.title });
            setIsModalOpen(true);
          }}
        >Send message about this video</SendMessageBtn>
      </CommentsCTA>
    </VideoEl>
  );
}

export default VideoCard;
