"use client"

import { useRecoilValue } from "recoil"
import VideoList from "../components/VideoList/VideoList"
import { PageTitle } from "./GlobalStyles"
import { isModalOpenState } from "./providers";
import MessageModal from "../components/MessageModal/MessageModal";
import { useEffect } from "react";
import { Permanent_Marker } from "next/font/google";
import Nav from "../components/Nav/Nav";

const permanentMarker = Permanent_Marker({ subsets: ['latin'], weight: ['400'], });

function Home() {

    useEffect(() => {
        document.title = "Fox Family Home Videos";
    }, []);

    const isModalOpen = useRecoilValue(isModalOpenState);

    return (
        <>
            <PageTitle className={permanentMarker.className}>
                Fox&nbsp;Family Home&nbsp;Videos
            </PageTitle>
            <Nav />
            {isModalOpen && (<MessageModal />)}
            <VideoList />
        </>

    )
}

export default Home