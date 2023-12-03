import styled from "styled-components";
import { colors } from "../../app/GlobalStyles";



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
`;

export const IFrame = styled.iframe`
  max-width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

export const VideoTitleAndDate = styled.div`
  background-color: ${colors.teal_blue};
  color: ${colors.white_smoke};
  text-align: center;
  position: relative;
  h2 {
    margin: 20px;
  }
`;

export const Sequence = styled.div<{
  sequenceButton: boolean;
}>`
  font-size: 20px;
  height: 28px;
  width: 28px;
  color: black;
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
  background-color: ${colors.magic_mint};
  padding: 10px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.sequenceButton &&
    `
    cursor: pointer;
    transition: all 150ms ease-in-out;

    &:hover {
      background-color: ${colors.teal_blue};
      color: ${colors.white_smoke};
      font-weight: 700;
      scale: 1.07;
    }
  `}
`;

export const VideoInfo = styled.div`
  padding: 0 20px;
  border-radius: 8px;
  flex-grow: 1;

  .video-beginning {
    width: fit-content;
    background-color: yellow;
  }
`;

export const CommentsCTA = styled.div`
  padding: 20px;
  text-align: center;
  background-color: ${colors.magic_mint};
  color: ${colors.teal_blue};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

// TODO: figure out my button styles
export const SendMessageBtn = styled.button`
  background-color: ${colors.white_smoke}!important;
  color: ${colors.teal_blue}!important;
  border-color: ${colors.moonstone_blue}!important;
  border-radius: 8px;

  &:hover {
    background-color: ${colors.teal_blue}!important;
    color: ${colors.white_smoke}!important;
  }
`;
