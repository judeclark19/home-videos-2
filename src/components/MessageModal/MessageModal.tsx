/* eslint-disable react/no-unescaped-entities */
import { isModalOpenState } from "@/state";
import { IFrame, Loading } from "../VideoCard/VideoCard.styles";
import { CancelButton, ModalShade, ModalWindow, SendMessageForm } from "./MessageModal.styles";
import { useSetRecoilState } from "recoil";

function MessageModal() {

    const setIsModalOpen = useSetRecoilState(isModalOpenState);

    return (
        <ModalShade>
            <ModalWindow>

                <h2>
                    Submit comments and/or corrections for <br />"<span id="video-to-comment">"</span>
                </h2>
                <Loading>
                    Loading video...
                    <IFrame
                        id="comment-iframe"
                        src=""
                        frameBorder="0"
                        width="560"
                        height="315"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                    ></IFrame>
                </Loading>
                <SendMessageForm id="send-message-form">
                    <label htmlFor="your-name">Your name:</label>
                    <input
                        type="text"
                        placeholder="Your name"
                        name="your-name"
                        required
                    />

                    <label htmlFor="comment-box">Enter your message here:</label>
                    <textarea
                        name="comment-box"
                        id="comment-box"
                        cols={30}
                        rows={5}
                        placeholder="Your message"
                        required
                    ></textarea>

                    <button type="submit" id="webmaster">
                        Send message to the webmaster (Jude)
                    </button>
                    <div style={{ textAlign: 'center', padding: "10px" }}>--- or ---</div>
                </SendMessageForm>
                <CancelButton
                    onClick={() => { setIsModalOpen(false) }}
                    id="cancel-btn">Cancel</CancelButton>
            </ModalWindow>
        </ModalShade>
    );
}

export default MessageModal;
