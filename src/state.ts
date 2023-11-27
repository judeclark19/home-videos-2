import { atom } from "recoil";

export const isModalOpenState = atom({
  key: "isModalOpen",
  default: true
});

export const videoBeingCommentedState = atom({
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
