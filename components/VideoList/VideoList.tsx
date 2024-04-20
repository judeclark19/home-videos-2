"use client";

import { Video } from "../../db/types";
import Loader from "../Loader/Loader";
import VideoCard from "../VideoCard/VideoCard";
import styled from "styled-components";

const VideoListStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  margin: 0px 14px 40px 14px;
`;

function VideoList({
  videos,
  isLoading
}: {
  videos: Video[];
  isLoading: boolean;
}) {
  return (
    <VideoListStyle>
      {isLoading && <Loader />}
      {!isLoading &&
        videos &&
        videos.map((video: Video) => (
          <VideoCard key={video._id} video={video} />
        ))}
    </VideoListStyle>
  );
}

export default VideoList;
