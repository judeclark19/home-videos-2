"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { queryClient } from "../db/queryClient";
import { GlobalStylesBody, PageTitle } from "./GlobalStyles";
import { Inter, Permanent_Marker } from "next/font/google";
import { RecoilRoot, atom } from "recoil";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer/Footer";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

const inter = Inter({ subsets: ["latin"] });

const permanentMarker = Permanent_Marker({
  subsets: ["latin"],
  weight: ["400"]
});

function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <StyledComponentsRegistry>
        <GlobalStylesBody className={inter.className}>
          <RecoilRoot>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh"
              }}
            >
              <PageTitle className={permanentMarker.className}>
                Fox&nbsp;Family Home&nbsp;Videos
              </PageTitle>
              <Nav />
              <div
                style={{
                  flex: 1
                }}
              >
                {children}
              </div>
              <Footer />
            </div>
          </RecoilRoot>
        </GlobalStylesBody>
      </StyledComponentsRegistry>
    </QueryClientProvider>
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
