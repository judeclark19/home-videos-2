import styled from "styled-components";

export const colors = {
    meadow_jade: '#4fc883',
    ivory_frost: '#fcf1f2',
    lavender_indigo: '#985fe0',
    midnight_noir: '#2d2430',
}


export const GlobalStylesDiv = styled.div`

background-color: ${colors.ivory_frost};
color: ${colors.midnight_noir};
font-family: 'Noto Sans', sans-serif;

button {
    color: ${colors.midnight_noir};
    padding: 8px 16px;
    background: transparent;
    border: 1px solid ${colors.meadow_jade};
    cursor: pointer;
    border-radius: 2px;
    font-size: 16px;

    &.active {
        background-color: green;
        color: white;
    }

    &:hover:not(.active) {
        background-color: ${colors.meadow_jade};
        color: white;
    }

    &:disabled {
        background-color: #ccc;
        color: #888;
        cursor: not-allowed;
        pointer-events: none;
    }

    &#cancel-btn {
        border: 1px solid rgba(128, 0, 0, .4);
        width: 500px;
        max-width: 100%;

        &:hover {
            background-color: rgba(128, 0, 0, .4);
            color: white;
        }
    }
}

`

export const PageTitle = styled.h1`
text-align: center;
margin: 0;
margin-bottom: 30px;
padding: 22px 0px;
color: ${colors.ivory_frost};
background-color: ${colors.midnight_noir};

`