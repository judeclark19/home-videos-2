import styled from "styled-components";
import { colors } from "../../app/GlobalStyles";

export const ModalShade = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalWindow = styled.div`
  background-color: ${colors.anemone};
  width: fit-content;
  padding: 30px;
  border-radius: 8px;
  height: 800px;
  max-height: 100vh;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    text-align: center;
  }

  button {
    border-radius: 8px;
  }
`;

export const SendMessageForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  input,
  textarea {
    padding: 8px;
    font-size: 16px;
    margin-bottom: 10px;
    font-family: inherit;
  }

  #webmaster {
    background-color: ${colors.anemone};
    color: ${colors.nocturnal_sea};
    border-color: ${colors.nocturnal_sea};
    border-radius: 8px;

    &:hover {
      background-color: ${colors.nocturnal_sea};
      color: ${colors.anemone};
    }
  }
`;

export const CancelButton = styled.button`
  background-color: ${colors.faded_rose}!important;
  color: ${colors.anemone}!important;
  border-color: ${colors.faded_rose}!important;
  width: fit-content;
  margin: auto;

  &:hover {
    filter: brightness(1.1);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${colors.gray}!important;
    border-color: ${colors.gray}!important;
    color: white !important;
  }
`;
