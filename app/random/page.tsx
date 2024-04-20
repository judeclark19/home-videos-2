"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import { totalVideosState } from "../providers";
import { useQuery } from "@tanstack/react-query";
import { fetchVideosByPage } from "../../helpers/fetchVideos";

export default function RandomPage() {
  const router = useRouter();

  const [totalVideos, setTotalVideos] =
    useRecoilState<number>(totalVideosState);

  const { data } = useQuery({
    queryKey: ["videos", 1],
    queryFn: () => fetchVideosByPage(1),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  useEffect(() => {
    if (data) {
      setTotalVideos(data.totalVideos);
    }
  }, [data, setTotalVideos]);

  useEffect(() => {
    if (totalVideos > 0) {
      // Generate a random number
      let randomSequence = Math.floor(Math.random() * totalVideos) + 1;

      // Redirect to /video/[random number]
      router.push(`/video/${randomSequence}`);
    }
  }, [totalVideos]);

  // You can show a loading message or a spinner here
  return (
    <div
      style={{
        textAlign: "center",
        fontSize: "24px"
      }}
    >
      Redirecting to a random video...
    </div>
  );
}
