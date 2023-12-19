import styled from "styled-components";
import { colors } from "../../app/GlobalStyles";

export const PaginationStyle = styled.div`
  padding: 0 20px 50px 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const PrevNext = styled.button`
  border-radius: 2px;

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
    border-radius: 2px;

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
  border-radius: 4px;
  background-color: ${colors.magic_mint};
  border-color: ${colors.moonstone_blue};
  color: ${colors.teal_blue};
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;
