import styled from "styled-components";
import { colors } from "../../app/GlobalStyles";

export const StyledNav = styled.nav`
  background-color: ${colors.almond_beige};
  margin-bottom: 30px;
  padding: 20px;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    row-gap: 10px;
    column-gap: 20px;
  }

  li {
    margin: 10px 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    padding: 6px;
    border: 2px solid ${colors.basically_black};
    background-color: ${colors.alabaster};
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover:not(.active) {
      text-decoration: underline;
      filter: brightness(1.1);
    }
  }

  .active {
    background-color: ${colors.anemone};
    font-weight: 500;
  }
`;
