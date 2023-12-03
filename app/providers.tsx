"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { queryClient } from "../db/queryClient";
import { GlobalStylesBody } from "./GlobalStyles";
import { Inter } from 'next/font/google'
import { RecoilRoot, atom } from "recoil";
import { Video } from "../db/types";

const inter = Inter({ subsets: ['latin'] })

export default function Providers({ children }: { children: ReactNode }) {

    return (
        <GlobalStylesBody className={inter.className}>
            <QueryClientProvider client={queryClient}>
                <RecoilRoot>
                    {children}
                </RecoilRoot>
            </QueryClientProvider>
        </GlobalStylesBody>
    );
}



export const isModalOpenState = atom({
    key: "isModalOpen",
    default: false
});

export const videoBeingCommentedState = atom<{
    videoId: string;
    sequence: number | null;
    partNumber: number | null;
    url: string;
    title: string;
    senderName: string;
    message: string;
    addressed: boolean;
}>({
    key: "videoBeingCommented",
    default: {
        videoId: "",
        sequence: null,
        partNumber: null,
        url: "",
        title: "",
        senderName: "",
        message: "",
        addressed: false
    }
});


export const totalVideosState = atom({
    key: "totalVideos",
    default: 0
});

export const currentPageNumberState = atom({
    key: "currentPageNumber",
    default: 1
});
