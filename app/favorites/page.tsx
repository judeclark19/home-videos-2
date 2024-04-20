"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import MessageModal from "../../components/MessageModal/MessageModal";
import VideoList from "../../components/VideoList/VideoList";
import { useRecoilValue } from "recoil";
import { isModalOpenState } from "../providers";
import Loader from "../../components/Loader/Loader";

const fetchFavorites = async () => {
  const response = await fetch(`/api/favorites`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function Favorites() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorites,
    staleTime: 0
  });

  const isModalOpen = useRecoilValue(isModalOpenState);

  return (
    <>
      {isLoading && <Loader />}
      {error && <div>An error occurred: {(error as Error).message}</div>}
      {!isLoading && !error && data.length === 0 && (
        <div style={{ textAlign: "center" }}>No favorites yet!</div>
      )}

      {!isLoading && !error && data.length > 0 && (
        <>
          {isModalOpen && <MessageModal />}
          <VideoList videos={data} isLoading={isLoading} />
        </>
      )}
    </>
  );
}

export default Favorites;
