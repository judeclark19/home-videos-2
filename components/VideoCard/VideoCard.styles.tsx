// fave star from https://codepen.io/andersonba/pen/rQzQrW

import styled, { keyframes, css } from "styled-components";
import { colors } from "../../app/GlobalStyles";

const favoriteStar = keyframes`

  5% { transform: scale(0.85); }
  50% {
    transform: scale(1.25);
    color: #f9ca06;
  }
  100% {
    transform: scale(1.0);
    color: #f9ca06;
  }
`

const wave1 = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
    background-color: #e54444;
  }
  50% { background-color: #9b4999; }
  80% { background-color: #f9ca06 }
  100% {
    transform: scale(1.5);
    opacity: 0;
    background-color: #f9d140;
  }
`

const wave2 = keyframes`
  30% { background-color: #e82cb2; opacity: 1; transform: scale(0); }
  70% { background-color: #fff; opacity: 0.4; transform: scale(1.2); }
`

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
position: relative;
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

export const Star = styled.div<{
  isFavorite: boolean;
}>`
  height: 30px;
  width: 30px;
  transition: all 150ms ease-in-out;

  svg {
    height: 100%;
    width: 100%;
  }

  &:hover {
    cursor: pointer;
    scale: 1.08;
  }

  &::after, &::before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    height: 30px;
    width: 30px;
    opacity: 0;
    border-radius: 50%;
  }

  ${(props) =>
    props.isFavorite &&
    css`
    &::before{
      animation: ${wave1} 0.8s ease-out;
      z-index: 1;
    }
    &::after {
      animation: ${wave2} 0.8s ease-out;
      z-index: 2;
    }

    svg {
      animation: ${favoriteStar} 0.6s linear forwards;
      position: relative;
      z-index: 3;
    }
  `}
`;

export const Tooltip = styled.div<{
  isFavorite: boolean;
  isVisible: boolean;
}>`
  position: absolute;
  top: -53px;
  left: ${(props) => (props.isFavorite ? "-129px" : "-105px")};
  background-color: #555;
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px #888;
  z-index: 100;
 width: ${(props) => (props.isFavorite ? "270px" : "220px")};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transition: opacity 150ms ease-in-out;

  // no word wrap
  white-space: nowrap;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }

`