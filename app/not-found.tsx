"use client";

import { useRouter } from "next/navigation";
import React from "react";

function NotFound() {
  const router = useRouter();
  return (
    <div
      style={{
        border: "1px solid red",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h1
        style={{
          textAlign: "center"
        }}
      >
        Page not found
      </h1>
      <button
        style={{
          margin: "auto"
        }}
        onClick={() => {
          router.back();
        }}
      >
        Go Back
      </button>
    </div>
  );
}

export default NotFound;
