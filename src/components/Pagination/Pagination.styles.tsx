import styled from "styled-components";
import { colors } from "../GlobalStyles";

export const PaginationStyle = styled.div`
  padding: 0 20px 50px 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const PrevNext = styled.button`
  background-color: ${colors.magic_mint};
  border: 1px solid ${colors.teal_blue};
  &:hover {
    background-color: ${colors.teal_blue};
    color: ${colors.white_smoke};
  }
  &:disabled {
    border: none;
  }
`;

export const PageNumbers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 768px) {
    display: none;
  }

  button {
    font-size: 14px;

    background-color: ${colors.magic_mint};
    border: 1px solid ${colors.moonstone_blue};

    &:hover {
      background-color: ${colors.teal_blue};
      color: ${colors.white_smoke};
    }

    &:disabled {
      background-color: ${colors.powder_blue};
      color: ${colors.white_smoke};
      border: 1px solid ${colors.powder_blue};
      cursor: not-allowed;
      pointer-events: none;
    }
  }
`;

export const PageSelect = styled.select`
  padding: 0px 8px;
  background-color: ${colors.magic_mint};
  color: white;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;
