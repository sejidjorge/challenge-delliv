import styled, { keyframes } from "styled-components";

const slideInTop = keyframes`
  0% {
    transform: translateY(-1000px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
const slideOutTop = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-1000px);
     opacity: 0;
   }
`;

interface PropsModal {
  open: boolean;
}

export const ModalOverlay = styled.div<PropsModal>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100dvh;
  animation: ${({ open }) => (open ? slideInTop : slideOutTop)} 0.5s
    cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
`;

export const ModalBody = styled.div`
  width: auto;
  height: auto;
  min-width: 20rem;
  max-width: 30rem;
  background-color: ${({ theme }) => theme.secondary};
  position: absolute;
  top: 20%;
  left: 50%;
  transition: 0.3s all;
  transform: translate(-50%, -50%);
  padding: 0.5em 1.2em;
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  border-radius: 0.3rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalContainerClose = styled.div`
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
