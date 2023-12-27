import styled from "styled-components";

export const TableStyled = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.hover};
  tr:nth-child(even) {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

export const TableHead = styled.thead`
  background-color: ${({ theme }) => theme.primary};
  border: none;
  tr {
    background-color: ${({ theme }) => theme.primary};
  }
`;

export const TableHeadTh = styled.th`
  border: none;
  padding: 0.5em 1em;
  text-align: left;
  white-space: nowrap;
`;

export const TableTd = styled.td`
  border: none;
  padding: 0.5em 1em;
  white-space: nowrap;
`;
