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
    url: string;
    title: string;
    senderName: string;
    message: string;
    addressed: boolean;
}>({
    key: "videoBeingCommented",
    default: {
        videoId: "",
        url: "",
        title: "",
        senderName: "",
        message: "",
        addressed: false
    }
});
