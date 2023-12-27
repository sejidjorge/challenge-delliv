import styled from "styled-components";

export const ContainerAuthPage = styled.div`
  width: 100vw;
  height: 100dvh;
  background-color: ${({ theme }) => theme.background};
  background-image: linear-gradient(
    to right top,
    #12171a,
    #171d20,
    #1b2326,
    #20292d,
    #252f33,
    #2a393f,
    #2f444b,
    #344f57,
    #39626d,
    #3c7682,
    #3e8a98,
    #3f9fae
  );
  padding: 1em 0;
  display: flex;
  justify-content: center;
  gap: 1em;
  ${({ theme }) => theme.breakpoints.up("md")} {
    flex-direction: row;
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
  }
`;

export const ContainerError = styled.div`
  color: ${({ theme }) => theme.error};
`;

export const ContainerForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContainerDashPage = styled.div`
  width: 100vw;
  height: 100dvh;
  background-color: ${({ theme }) => theme.background};
  ${({ theme }) => theme.breakpoints.up("md")} {
    flex-direction: row;
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
  }
`;
