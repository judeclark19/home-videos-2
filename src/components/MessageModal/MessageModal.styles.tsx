import styled from "styled-components";
import { colors } from "../GlobalStyles";

export const ModalShade = styled.div`
    background-color: rgba(0, 0, 0, .4);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    
`

export const ModalWindow = styled.div`
    background-color: white;
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
`

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

`

export const CancelButton = styled.button`
   background-color: ${colors.vermillion_flame}!important;
   color: ${colors.sunshine_glow}!important;
   border-color: ${colors.vermillion_flame}!important;

    &:hover {
         background-color: ${colors.sunshine_glow}!important;
         color: ${colors.vermillion_flame}!important;
    }

    &:disabled {
        cursor: not-allowed;
        background-color: ${colors.gray}!important;
        border-color: ${colors.gray}!important;
        color: white!important;
    }
`