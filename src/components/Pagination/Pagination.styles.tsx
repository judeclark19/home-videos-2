import styled from "styled-components";
import { colors } from "../GlobalStyles";

export const PaginationStyle = styled.div`
  padding: 0 20px 50px 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

export const PrevNext = styled.button`
    
    &:disabled {
       border: none
    }
    
`

export const PageNumbers = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 768px) {
    display: none;
  }

  button {
    font-size: 14px;

    &:hover {
      background-color: ${colors.meadow_jade};
    }

    &:disabled {
        background-color: ${colors.lavender_indigo};
      color: ${colors.ivory_frost};
      border: 1px solid ${colors.lavender_indigo};
      cursor: not-allowed;
      pointer-events: none;
    }
  }
`;

export const PageSelect = styled.select`
  padding: 0px 8px;
  background-color: ${colors.meadow_jade};
  color: white;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;
