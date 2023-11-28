"use client";

import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import Pagination from '../Pagination/Pagination';
import { VideoListStyle } from './VideoList.styles';
import { Video } from '../../db/types';
import VideoCard from './VideoCard';

const fetchVideos = async (page: number) => {
    const response = await fetch(`/api/videos?page=${page}&limit=10`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function VideoList() {

    const [page, setPage] = useState<number>(1
    );

    useEffect(() => {
        // Get the page number from URL query string
        const pageNumber = parseInt(new URL(window.location.href).searchParams.get("page") || "1", 10);
        setPage(pageNumber);
    }, []);

    const { data, error, isLoading } = useQuery({
        queryKey: ['videos', page],
        queryFn: () => fetchVideos(page),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

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