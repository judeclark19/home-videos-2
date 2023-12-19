import styled from "styled-components";

export const colors = {
  teal_blue: "#388087",
  moonstone_blue: "#6fb3b8",
  powder_blue: "#badfe7",
  magic_mint: "#c2edce",
  white_smoke: "#f6f6f2",
  vermillion_flame: "#f04134",
  sunshine_glow: "#fbd67e",
  gray: "#8fa2a7"
};

export const GlobalStylesBody = styled.body`
  margin: 0;

  background-color: ${colors.white_smoke};
  color: ${colors.teal_blue};

  button {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    color: ${colors.teal_blue};
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${colors.magic_mint};
    border: 1px solid ${colors.moonstone_blue};

    &:hover {
      background-color: ${colors.teal_blue};
      color: ${colors.white_smoke};
    }

    &:disabled {
      background-color: #8fa2a7;
      color: ${colors.white_smoke};
      border: 1px solid #8fa2a7;
      cursor: not-allowed;
    }
  }
`;

export const PageTitle = styled.h1`
  text-align: center;
  font-size: 44px;
  margin: 0 14px 14px 14px;
  padding: 22px 0px;
  color: ${colors.teal_blue};
`;
