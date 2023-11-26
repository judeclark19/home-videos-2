import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import Layout from '../components/Layout'; // Or your layout file
import { AppProps } from 'next/app';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </QueryClientProvider>
    );
}

export default MyApp;
