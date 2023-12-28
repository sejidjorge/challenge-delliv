import { Dispatch, SetStateAction } from "react";
import {
  ButtonClose,
  SideBarBody,
  SideBarContainerClose,
  SideBarOverlay,
} from "./baseSideBar.styles";

interface PropsSidbar {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
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

export default function SidebarBase({ open, setOpen, children }: PropsSidbar) {
  return (
    <SideBarOverlay open={open}>
      <SideBarBody>
        <SideBarContainerClose>
          <ButtonClose onClick={() => setOpen((open) => !open)}>
            {iconClose}
          </ButtonClose>
        </SideBarContainerClose>
        {children}
      </SideBarBody>
    </SideBarOverlay>
  );
}
