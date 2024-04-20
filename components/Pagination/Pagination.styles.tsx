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
  border-width: 1px;
  background-color: ${colors.alabaster};
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
`;

export const PageNumber = styled.button`
  font-size: 14px;
  border-radius: 4px;
  border-width: 1px;
  background-color: ${colors.alabaster}!important;

  // hover
  &:hover {
    background-color: ${colors.nocturnal_sea}!important;
    color: ${colors.anemone};
  }

  &:disabled {
    background-color: ${colors.gray}!important;
    color: white;
    border: 1px solid ${colors.gray};
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export const PageSelect = styled.select`
  padding: 0px 8px;
  border-radius: 4px;
  background-color: ${colors.alabaster};
  border-color: ${colors.nocturnal_sea};
  color: ${colors.basically_black};
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;
