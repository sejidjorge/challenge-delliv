"use client";
import {
  ButtonClose,
  ModalBody,
  ModalContainerClose,
  ModalOverlay,
} from "./baseModal.styles";

interface PropsModal {
  open: boolean;
  setOpen: () => void;
  children: React.ReactNode;
}

const iconClose: JSX.Element = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24pt"
    viewBox="0 -960 960 960"
    width="24pt"
    fill="currentColor"
  >
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
  </svg>
);

export default function ModalBase({ open, setOpen, children }: PropsModal) {
  return (
    <ModalOverlay open={open}>
      <ModalBody>
        <ModalContainerClose>
          <ButtonClose onClick={setOpen}>{iconClose}</ButtonClose>
        </ModalContainerClose>
        {children}
      </ModalBody>
    </ModalOverlay>
  );
}
