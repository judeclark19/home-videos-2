"use client";

import React, { useEffect } from "react";
import { PageTitle } from "../../GlobalStyles";
import { useQuery } from "@tanstack/react-query";
import VideoCard from "../../../components/VideoCard/VideoCard";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { isModalOpenState, totalVideosState } from "../../providers";
import { Inter } from "next/font/google";
import Loader from "../../../components/Loader/Loader";
import MessageModal from "../../../components/MessageModal/MessageModal";

const inter = Inter({ subsets: ["latin"] });

const fetchVideo = async (sequence: number) => {
  const response = await fetch(`/api/videos/${sequence}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function VideoPage({ params }: { params: { sequence: string } }) {
  const router = useRouter();

  const totalVideos = useRecoilValue<number>(totalVideosState);
  const isModalOpen = useRecoilValue<boolean>(isModalOpenState);

  const { data, error, isLoading } = useQuery({
    queryKey: ["video", params.sequence],
    queryFn: () => fetchVideo(parseInt(params.sequence, 10)),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // set the video title to be the page title
  useEffect(() => {
    if (data) {
      document.title = data.video.title;
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.log(error);
    return (
      <>
        <div>
          An error occurred: No video found with sequence number{" "}
          {params.sequence}
        </div>
        <a href="/">Go back home</a>
      </>
    );
  }

  const sequenceNo = parseInt(params.sequence.toString(), 10);

  return (
    <>
      {isModalOpen && <MessageModal />}
      <PageTitle>{data.video.title}</PageTitle>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "50px"
        }}
      >
        <button
          className={inter.className}
          disabled={sequenceNo === 1}
          onClick={() => {
            router.push(`/video/${sequenceNo - 1}`);
          }}
        >
          Go to previous video
        </button>
        <button
          disabled={sequenceNo === totalVideos}
          onClick={() => {
            router.push(`/video/${sequenceNo + 1}`);
          }}
        >
          Go to next video
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <VideoCard video={data.video} sequenceButton={false} />
      </div>
    </>
  );
}

export default VideoPage;
