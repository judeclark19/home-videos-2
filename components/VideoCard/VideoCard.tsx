

import { useRecoilState, useSetRecoilState } from "recoil";

import { Video } from "../../db/types";
import { CommentsCTA, IFrame, Loading, SendMessageBtn, Sequence, VideoEl, VideoInfo, VideoTitleAndDate } from "./VideoCard.styles";
import { isModalOpenState, videoBeingCommentedState } from "../../app/providers";
import useDateFormat from "../../helpers/dateFormat";
import { useRouter } from "next/navigation";

function VideoCard({ video, sequenceButton = true }: { video: Video, sequenceButton?: boolean }) {

  const router = useRouter();
  const setIsModalOpen = useSetRecoilState(isModalOpenState);
  const [videoBeingCommented, setVideoBeingCommented] = useRecoilState(videoBeingCommentedState);


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
        <Sequence
          sequenceButton={sequenceButton}
          onClick={() => {
            if (sequenceButton) {
              router.push(`/video/${video.sequence}`);
            }
          }}
        >{video.sequence}.</Sequence>
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
        <h2>{video.title}{video.partNumber && ` (Part ${video.partNumber})`}</h2>
        <h3>{useDateFormat(video.date)}</h3>
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
            setVideoBeingCommented({ ...videoBeingCommented, videoId: video._id, partNumber: video.partNumber, sequence: video.sequence, url: video.url, title: video.title });
            setIsModalOpen(true);
          }}
        >Send message about this video</SendMessageBtn>
      </CommentsCTA>
    </VideoEl>
  );
}

export default VideoCard;
