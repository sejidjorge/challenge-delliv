import styled from "styled-components";

export const AuthCard = styled.div<{
  background?: string | null;
  width?: string | null;
}>`
  ${({ theme }) => theme.breakpoints.up("md")} {
    width: ${({ width }) => width ?? "100%"};
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    width: auto;
  }
  padding: 0.5em 1.2em;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  border-radius: 0.3rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: ${({ background }) =>
    background ?? (({ theme }) => theme.background)};
`;
