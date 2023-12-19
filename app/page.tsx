"use client";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import VideoList from "../components/VideoList/VideoList";
import {
  currentPageNumberState,
  isModalOpenState,
  totalVideosState
} from "./providers";
import MessageModal from "../components/MessageModal/MessageModal";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../components/Pagination/Pagination";
import { fetchVideosByPage } from "../helpers/fetchVideos";

function Home() {
  const [page, setPage] = useRecoilState<number>(currentPageNumberState);

  const setTotalVideos = useSetRecoilState<number>(totalVideosState);

  useEffect(() => {
    // Get the page number from URL query string
    const pageNumber = parseInt(
      new URL(window.location.href).searchParams.get("page") || "1",
      10
    );
    setPage(pageNumber);
  }, [setPage]);

  useEffect(() => {
    document.title = "Fox Family Home Videos";
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["videos", page],
    queryFn: () => fetchVideosByPage(page),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  useEffect(() => {
    if (data) {
      setTotalVideos(data.totalVideos);
    }
  }, [data, setTotalVideos]);

  const isModalOpen = useRecoilValue(isModalOpenState);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>An error occurred: {(error as Error).message}</div>}
      {!isLoading && !error && data && (
        <>
          <Pagination page={page} setPage={setPage} data={data} />
          {isModalOpen && <MessageModal />}
          <VideoList videos={data.videos} />
          <Pagination page={page} setPage={setPage} data={data} />
        </>
      )}
    </>
  );
}

export default Home;
