/* eslint-disable react/no-unescaped-entities */

import {
  CancelButton,
  ModalShade,
  ModalWindow,
  SendMessageForm
} from "./MessageModal.styles";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { IFrame, Loading } from "../VideoCard/VideoCard.styles";
import {
  isModalOpenState,
  videoBeingCommentedState
} from "../../app/providers";
import { Tailspin } from "../Loader/Loader";

function MessageModal() {
  const [formDisabled, setFormDisabled] = useState(false);

  const setIsModalOpen = useSetRecoilState(isModalOpenState);
  const [videoBeingCommented, setVideoBeingCommented] = useRecoilState(
    videoBeingCommentedState
  );

  type MessageData = {
    videoId: string;
    title: string;
    senderName: string;
    message: string;
    addressed: boolean;
  };
  const postMessage = useMutation({
    mutationFn: (newMessage: MessageData) => {
      return fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify(newMessage),
        headers: {
          "Content-Type": "application/json"
        }
      });
    },
    onMutate: () => {
      setFormDisabled(true);
    },
    onSettled: () => {
      setTimeout(() => {
        setVideoBeingCommented({
          videoId: "",
          sequence: null,
          partNumber: null,
          url: "",
          title: "",
          senderName: "",
          message: "",
          addressed: false
        });
        setIsModalOpen(false);
        setFormDisabled(false);
      }, 2000);
    }
  });

  function getButtonText() {
    if (postMessage.isSuccess) {
      return "Message sent! ✓";
    } else {
      return "Send message to the webmaster (Jude)";
    }
  }

  return (
    <ModalShade
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setVideoBeingCommented({
            videoId: "",
            sequence: null,
            partNumber: null,
            url: "",
            title: "",
            senderName: "",
            message: "",
            addressed: false
          });
          setIsModalOpen(false);
        }
      }}
    >
      <ModalWindow>
        <h2>
          Submit comments and/or corrections for video number{" "}
          {videoBeingCommented.sequence}: <br />"{videoBeingCommented.title}
          {videoBeingCommented.partNumber &&
            ` (Part ${videoBeingCommented.partNumber})`}
          "
        </h2>
        <Loading>
          <Tailspin />
          <IFrame
            id="comment-iframe"
            src={videoBeingCommented.url}
            frameBorder="0"
            width="560"
            height="315"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          ></IFrame>
        </Loading>
        <SendMessageForm
          id={videoBeingCommented.videoId}
          onSubmit={(e) => {
            e.preventDefault();
            postMessage.mutate(videoBeingCommented);
          }}
        >
          <label htmlFor="your-name">Your name:</label>
          <input
            type="text"
            placeholder="Your name"
            name="your-name"
            value={videoBeingCommented.senderName}
            required
            onChange={(e) => {
              setVideoBeingCommented({
                ...videoBeingCommented,
                senderName: e.target.value
              });
            }}
            disabled={formDisabled}
          />

          <label htmlFor="comment-box">Enter your message here:</label>
          <textarea
            name="comment-box"
            id="comment-box"
            cols={30}
            rows={5}
            placeholder="Your message"
            required
            value={videoBeingCommented.message}
            onChange={(e) => {
              setVideoBeingCommented({
                ...videoBeingCommented,
                message: e.target.value
              });
            }}
            disabled={formDisabled}
          ></textarea>

          <button type="submit" id="webmaster" disabled={formDisabled}>
            {getButtonText()}
          </button>
        </SendMessageForm>
        <div style={{ textAlign: "center", padding: "10px" }}>--- or ---</div>
        <CancelButton
          onClick={() => {
            // reset form
            setVideoBeingCommented({
              videoId: "",
              sequence: null,
              partNumber: null,
              url: "",
              title: "",
              senderName: "",
              message: "",
              addressed: false
            });

            setIsModalOpen(false);
          }}
          id="cancel-btn"
          disabled={formDisabled}
        >
          Cancel
        </CancelButton>
      </ModalWindow>
    </ModalShade>
  );
}

export default MessageModal;
