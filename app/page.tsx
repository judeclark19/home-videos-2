"use client"

import { useRecoilValue } from "recoil"
import VideoList from "../components/VideoList/VideoList"
import { PageTitle } from "./GlobalStyles"
import { isModalOpenState } from "./providers";
import MessageModal from "../components/MessageModal/MessageModal";

function Home() {

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