"use client";

import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination/Pagination';

import { Video } from '../../db/types';
import VideoCard from '../VideoCard/VideoCard';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { currentPageNumberState, totalVideosState } from '../../app/providers';

const VideoListStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  margin: 0px 14px 40px 14px;
`;


const fetchVideos = async (page: number) => {
    const response = await fetch(`/api/videos?page=${page}&limit=10`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function VideoList() {

    const [page, setPage] = useRecoilState<number>(currentPageNumberState);

    const [totalVideos, setTotalVideos] = useRecoilState<number>(totalVideosState);

    useEffect(() => {
        // Get the page number from URL query string
        const pageNumber = parseInt(new URL(window.location.href).searchParams.get("page") || "1", 10);
        setPage(pageNumber);
    }, [setPage]);

    const { data, error, isLoading } = useQuery({
        queryKey: ['videos', page],
        queryFn: () => fetchVideos(page),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    useEffect(() => {
        if (data) {
            setTotalVideos(data.totalVideos);
        }
    }, [data, setTotalVideos]);

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {error && <div>An error occurred: {(error as Error).message}</div>}
            <Pagination page={page} setPage={setPage} data={data} />

            {isLoading && <div>Loading...</div>}
            {error && <div>An error occurred: {(error as Error).message}</div>}
            {!isLoading && !error && data && (


                <VideoListStyle>
                    {/* videos here */}
                    {data && data.videos.map((video: Video) => (
                        <VideoCard key={video._id} video={video} />
                    ))}
                </VideoListStyle>
            )}

            <Pagination page={page} setPage={setPage} data={data} />

        </>

    )
}

export default VideoList