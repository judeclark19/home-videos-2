"use client";

import React, { useEffect, useState } from "react";
import FilterForm from "../../components/FilterForm/FilterForm";
import Pagination from "../../components/Pagination/Pagination";
import { useQuery } from "@tanstack/react-query";
import { fetchVideosByYear } from "../../helpers/fetchVideos";
import { useRecoilValue } from "recoil";
import { isModalOpenState } from "../providers";
import MessageModal from "../../components/MessageModal/MessageModal";
import VideoList from "../../components/VideoList/VideoList";

function CustomSearch() {
  const [page, setPage] = useState<number>(1);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const isModalOpen = useRecoilValue(isModalOpenState);

  const { data, isLoading, error } = useQuery({
    queryKey: ["videos", selectedYear, page],
    queryFn: () => fetchVideosByYear(selectedYear, page),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: selectedYear !== "" // This will only run the query if a year is selected
  });

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  useEffect(() => {
    setPage(1);
    // update url
    const url = new URL(window.location.href);
    url.searchParams.set("year", selectedYear.toString());
    url.searchParams.set("page", "1");
    history.pushState({}, "", url.toString());
    // url.searchParams.set("page", page.toString());
  }, [selectedYear]);

  return (
    <>
      <FilterForm
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      {isModalOpen && <MessageModal />}
      {selectedYear !== "" && (
        <>
          <Pagination page={page} setPage={setPage} data={data} />
          <VideoList videos={data?.videos} isLoading={isLoading} />
          <Pagination page={page} setPage={setPage} data={data} />
        </>
      )}
    </>
  );
}

export default CustomSearch;
