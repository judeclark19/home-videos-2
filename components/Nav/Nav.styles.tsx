import styled from "styled-components";
import { colors } from "../../app/GlobalStyles";

export const StyledNav = styled.nav`
  background-color: ${colors.magic_mint};
  margin-bottom: 30px;
  padding: 20px;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: space-around;
  }

  a {
    color: inherit;
    text-decoration: none;
    padding: 6px;
    border: 1px solid ${colors.moonstone_blue};
    border-radius: 2px;

    &:hover:not(.active) {
      text-decoration: underline;
      font-weight: 700;
    }
  }

  .active {
    background-color: ${colors.powder_blue};
    font-weight: 700;
  }
`;
