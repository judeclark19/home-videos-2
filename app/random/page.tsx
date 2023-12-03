"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { totalVideosState } from '../providers';
import { useQuery } from '@tanstack/react-query';

const fetchVideos = async (page: number) => {
    const response = await fetch(`/api/videos?page=${page}&limit=10`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}


export default function RandomPage() {

    const router = useRouter();


    const [totalVideos, setTotalVideos] = useRecoilState<number>(totalVideosState);

    const { data, error, isLoading } = useQuery({
        queryKey: ['videos', 1],
        queryFn: () => fetchVideos(1),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    useEffect(() => {
        if (data) {
            setTotalVideos(data.totalVideos);
        }
    }, [data, setTotalVideos]);


    useEffect(() => {
        console.log('totalVideos', totalVideos)
        if (totalVideos > 0) {
            // Generate a random number
            let randomSequence = Math.floor(Math.random() * totalVideos) + 1;

            // Redirect to /video/[random number]
            router.push(`/video/${randomSequence}`);
        }
    }, [totalVideos]);

    // You can show a loading message or a spinner here
    return <div>Redirecting to a random video...</div>;
}
