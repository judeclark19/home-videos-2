"use client";

import React, { useEffect } from 'react'
import { PageTitle } from '../../GlobalStyles'
import { SendMessageBtn } from '../../../components/VideoCard/VideoCard.styles';
import { useQuery } from '@tanstack/react-query';
import useDateFormat from '../../../helpers/dateFormat';
import VideoCard from '../../../components/VideoCard/VideoCard';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { currentPageNumberState, totalVideosState } from '../../providers';

const fetchVideo = async (sequence: number) => {
    const response = await fetch(`/api/videos/${sequence}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

function VideoPage({ params }: { params: { sequence: string } }) {
    const router = useRouter();

    const totalVideos = useRecoilValue<number>(totalVideosState);
    const currentPage = useRecoilValue<number>(currentPageNumberState);

    const { data, error, isLoading } = useQuery({
        queryKey: ['video', params.sequence],
        queryFn: () => fetchVideo(parseInt(params.sequence, 10)),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    const date = useDateFormat(data?.video.date);

    // set the video title to be the page title
    useEffect(() => {
        if (data) {
            document.title = data.video.title
        }
    }, [data]);


    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        console.log(error);
        return <>
            <div>An error occurred: No video found with sequence number {params.sequence}</div>
            <a href="/">Go back home</a>
        </>
    }

    const sequenceNo = parseInt(params.sequence.toString(), 10);

    return (
        <>
            {/* TODO: track page param in recoil and apply here */}
            <button onClick={() => {
                router.push(`/?page=${currentPage}`)
            }}>Go back to All Videos</button>
            <PageTitle>
                {data.video.title}
            </PageTitle>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginBottom: '20px'
            }}>
                <button disabled={sequenceNo === 1}
                    onClick={() => {
                        router.push(`/video/${sequenceNo - 1}`)

                    }}
                >Go to previous video</button>
                <button
                    disabled={
                        sequenceNo === totalVideos
                    }
                    onClick={() => {
                        router.push(`/video/${sequenceNo + 1}`)
                    }}
                >Go to next video</button>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: "30px"
            }}>

                <SendMessageBtn
                    onClick={() => {
                        let randomSequence = Math.floor(Math.random() * totalVideos) + 1;
                        while (randomSequence === sequenceNo) {
                            randomSequence = Math.floor(Math.random() * totalVideos) + 1;
                        }
                        console.log(randomSequence)
                        router.push(`/video/${randomSequence}`)
                    }}
                >Go to random video</SendMessageBtn>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}>

                <VideoCard video={data.video} sequenceButton={false} />


            </div>
        </>
    )
}

export default VideoPage