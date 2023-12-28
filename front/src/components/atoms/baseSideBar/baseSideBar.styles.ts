import styled, { keyframes } from "styled-components";

const slideInRigth = keyframes`
  0% {
    transform: translateX(1000px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;
const slideOutRigth = keyframes`
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(1000px);
     opacity: 0;
   }
`;

interface PropsModal {
  open: boolean;
}

export const SideBarOverlay = styled.div<PropsModal>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100dvh;
  animation: ${({ open }) => (open ? slideInRigth : slideOutRigth)} 0.5s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

export const SideBarBody = styled.div`
  width: auto;
  height: calc(100dvh - 5rem);
  min-width: 20rem;
  max-width: 30rem;
  background-color: ${({ theme }) => theme.secondary};
  position: absolute;
  top: 5rem;
  right: 0;
  transition: 0.3s all;
  padding: 0.5em 1.2em;
  border: 1px solid ${({ theme }) => theme.border};
  border-right: none;
  display: flex;
  overflow: hidden;
  border-top-left-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
  flex-direction: column;
`;

export const SideBarContainerClose = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const ButtonClose = styled.button`
  border: none;
  outline: none;
  padding: 0.1em;
  display: flex;
  justify-content: center;
  color: ${({ theme }) => theme.primaryText};
  background: transparent;
  cursor: pointer;
  font-size: 1.8rem;
  border-radius: 50px;
  &:is(:hover, :focus) {
    color: ${({ theme }) => theme.secondaryText};
    background: ${({ theme }) => theme.hover};
    transition: 0.3s all;
  }
`;
