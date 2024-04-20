import styled from "styled-components";

export const colors = {
  gray: "#8fa2a7",
  basically_black: "#1a1a1a",
  nocturnal_sea: "#095D6A",
  faded_rose: "#B86161",
  anemone: "#F6F1EC",
  alabaster: "#EAE3DC",
  almond_beige: "#DED5CB"
};

export const GlobalStylesBody = styled.body`
  margin: 0;

  background-color: ${colors.anemone};
  color: ${colors.basically_black};

  button {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    color: ${colors.basically_black};
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${colors.alabaster};
    /* border: 1px solid ${colors.nocturnal_sea}; */
    transition: all 0.2s ease;

    &:hover {
      /* background-color: ${colors.nocturnal_sea};
      color: ${colors.anemone}; */
      filter: brightness(1.1);
    }

    &:disabled {
      background-color: ${colors.gray};
      color: ${colors.anemone};
      border: 1px solid ${colors.gray};
      cursor: not-allowed;
    }
  }
`;

export const PageTitle = styled.h1`
  text-align: center;
  font-size: 44px;
  margin: 0 14px 14px 14px;
  padding: 22px 0px;
  color: ${colors.basically_black};
`;
