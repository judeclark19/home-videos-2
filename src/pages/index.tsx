import React from 'react';
import Layout from '../components/Layout';
import { useQuery } from '@tanstack/react-query';


async function fetchVideos() {
    const response = await fetch('/api/videos');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

const HomePage: React.FC = () => {

    const { data, error, isLoading } = useQuery({
        queryKey: ['videos'],
        queryFn: fetchVideos
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;
    return (
        // <Layout>
        <>
            {data && data.data.map(video => (
                <div key={video._id}>
                    <h3>{video.title}</h3>
                    {/* Display other video details */}
                </div>
            ))}
        </>
        // </Layout>
    );
};

export default HomePage;
