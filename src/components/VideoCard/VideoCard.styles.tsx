import styled from "styled-components";

export const VideoEl = styled.div`
  border: 1px solid #888;
  width: min-content;
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 0 10px #888;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: column;
`;

export const Loading = styled.div`
  position: relative;
  width: 560px;
  max-width: 100%;
  margin: auto;
  min-height: 315px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const IFrame = styled.iframe`
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;`

export const VideoInfo = styled.div`
  padding: 20px;
  border-radius: 8px;
  flex-grow: 1;

  .video-beginning {
    width: fit-content;
    background-color: yellow;
  }
`;
