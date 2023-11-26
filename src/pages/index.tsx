import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';


interface Video {
    _id: string;
    url: string;
    title: string;
    date: string;
    description: string;
    duration: number;
    beginning: string;
    location: string;
    tags: string[];
    people: string[];
    notes: string;
}

const fetchVideos = async (page: number) => {
    const response = await fetch(`/api/videos?page=${page}&limit=10`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

const HomePage: React.FC = () => {

    const [page, setPage] = useState<number>(1);

    const { data, error, isLoading } = useQuery({
        queryKey: ['videos', page],
        queryFn: () => fetchVideos(page),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;
    return (
        <>
            {isLoading && <div>Loading...</div>}
            {error && <div>An error occurred: {(error as Error).message}</div>}
            {data && data.data.map((video: Video) => (
                <div key={video._id}>
                    <h3>{video.title}</h3>
                    {/* other video details */}
                </div>
            ))}
            <div>
                <button onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page}</span>
                <button onClick={() => setPage(old => old + 1)} disabled={data && data.data.length < 10}>
                    Next
                </button>
            </div>
        </>
    );
};

export default HomePage;
