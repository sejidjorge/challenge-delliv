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
  position: sticky;
  left: 0;
  top: 0;
  tr {
    background-color: ${({ theme }) => theme.primary};
  }
`;

export const TableHeadTh = styled.th`
  border: none;
  padding: 0.2em 0.8em;
  text-align: left;
  white-space: nowrap;
`;

export const TableTd = styled.td`
  border: none;
  padding: 0em 0.8em;
  white-space: nowrap;
`;

export const ContainerTablePagination = styled.div`
  width: 100%;
  padding: 0.5em 1em;
  position: sticky;
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.background};
  display: flex;
  justify-content: end;
  color: ${({ theme }) => theme.secondaryText};
`;
