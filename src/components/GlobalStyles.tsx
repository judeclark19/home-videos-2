import styled from "styled-components";

export const colors = {
    teal_blue: '#388087',
    moonstone_blue: '#6fb3b8',
    powder_blue: '#badfe7',
    magic_mint: '#c2edce',
    white_smoke: '#f6f6f2',
}


export const GlobalStylesDiv = styled.div`

background-color: ${colors.white_smoke};
color: ${colors.teal_blue};
font-family: 'Noto Sans', sans-serif;

button {
    padding: 8px 16px;
    cursor: pointer;
    border-radius: 2px;
}

`

export const PageTitle = styled.h1`
text-align: center;
margin: 0;
margin-bottom: 30px;
padding: 22px 0px;
color: ${colors.teal_blue};

`