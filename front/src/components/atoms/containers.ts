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
  margin: 0.5em 0;
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
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.background};
  ${({ theme }) => theme.breakpoints.up("md")} {
    flex-direction: row;
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
  }
`;

export const ContainerNavbar = styled.div`
  width: 100%;
  height: 5rem;
  padding: 1em 0.6em;
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.primary};
`;

export const ContainerUserProfile = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.4em;
  padding-right: 2em;
  border-right: 2px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.primaryText};
`;

export const ContainerActionsBar = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.4em;
`;

export const ContainerDashBoard = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  padding: 1em;
  position: relative;
  top: 5rem;
`;

export const ContainerDashBoardContent = styled.div`
  padding: 0.5em 1.2em;
  border-radius: 0.3rem;
`;

export const ContainerDashBoardActions = styled.div`
  display: flex;
  gap: 0.5em;
  margin-bottom: 1em;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

export const ContainerDashBoardActionsIntern = styled(
  ContainerDashBoardActions
)`
  display: flex;
  justify-content: end;
  gap: 0.5em;
  margin-bottom: 1em;
  border-bottom: none;
`;

export const ContainerDashBoardCardData = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;
