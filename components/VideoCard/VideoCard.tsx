import { useRecoilState, useSetRecoilState } from "recoil";
import { Video } from "../../db/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarO } from "@fortawesome/free-regular-svg-icons";
import {
  ButtonAndStar,
  CommentsCTA,
  IFrame,
  Loading,
  SendMessageBtn,
  Sequence,
  Star,
  StarPosition,
  Tooltip,
  VideoEl,
  VideoInfo,
  VideoTitleAndDate
} from "./VideoCard.styles";
import {
  isModalOpenState,
  videoBeingCommentedState
} from "../../app/providers";
import useDateFormat from "../../helpers/dateFormat";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

const fetchFavorites = async () => {
  const response = await fetch(`/api/favorites`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function VideoCard({
  video,
  sequenceButton = true
}: {
  video: Video;
  sequenceButton?: boolean;
}) {
  const router = useRouter();
  const setIsModalOpen = useSetRecoilState(isModalOpenState);
  const [videoBeingCommented, setVideoBeingCommented] = useRecoilState(
    videoBeingCommentedState
  );

  const [tooltipIsOpen, setTooltipIsOpen] = useState<boolean>(false);

  const { data, error, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  const [isFavorite, setIsFavorite] = useState<boolean>(
    data?.some((favorite: Video) => favorite._id === video._id) || false
  );

  const addToFavorites = useMutation({
    mutationFn: (videoId: string) => {
      return fetch(`/api/favorites/${videoId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  });

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
        >
          {video.sequence}.
        </Sequence>
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
        <h2>
          {video.title}
          {video.partNumber && ` (Part ${video.partNumber})`}
        </h2>
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

        {video.notes && (
          <p>
            <strong>Notes</strong>: {video.notes}
          </p>
        )}
      </VideoInfo>
      <CommentsCTA>
        <p>
          <em>Have comments or corrections for this video?</em>
        </p>
        <ButtonAndStar>
          <SendMessageBtn
            onClick={() => {
              setVideoBeingCommented({
                ...videoBeingCommented,
                videoId: video._id,
                partNumber: video.partNumber,
                sequence: video.sequence,
                url: video.url,
                title: video.title
              });
              setIsModalOpen(true);
            }}
          >
            Send message about this video
          </SendMessageBtn>

          <StarPosition
          >
            <Tooltip isFavorite={isFavorite} isVisible={tooltipIsOpen}>
              {isFavorite
                ? "Remove this video from favorites"
                : "Add this video to favorites"}
            </Tooltip>
            <Star
              onClick={() => {
                setIsFavorite(!isFavorite);
                addToFavorites.mutate(video._id);
              }}
              onMouseEnter={() => {
                setTimeout(() => {
                  setTooltipIsOpen(true);
                }, 500);
              }}
              onMouseLeave={() => {
                setTooltipIsOpen(false);
              }}
              isFavorite={isFavorite}
            >
              <FontAwesomeIcon icon={isFavorite ? faStar : faStarO} />
            </Star>
          </StarPosition>
        </ButtonAndStar>
      </CommentsCTA>
    </VideoEl>
  );
}

export default VideoCard;
