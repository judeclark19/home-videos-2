"use client"

import { useRecoilValue } from "recoil"
import VideoList from "../components/VideoList/VideoList"
import { PageTitle } from "./GlobalStyles"
import { isModalOpenState } from "./providers";
import MessageModal from "../components/MessageModal/MessageModal";
import { useEffect } from "react";

function Home() {

    useEffect(() => {
        document.title = "Fox Family Home Videos";
    }, []);

    const isModalOpen = useRecoilValue(isModalOpenState);

    return (
        <>
            <PageTitle>
                Fox&nbsp;Family Home&nbsp;Videos
            </PageTitle>
            {isModalOpen && (<MessageModal />)}
            <VideoList />
        </>

    )
}

export default Home