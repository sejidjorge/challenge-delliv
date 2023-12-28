import Button from "@/components/atoms/button";
import { MouseEventHandler } from "react";

interface ButtonProps {
  variant: "text" | "outlined" | "contained";
  icon: string;
  click: MouseEventHandler<HTMLButtonElement>;
}

const icons: {
  [key: string]: JSX.Element;
  refresh: JSX.Element;
  edit: JSX.Element;
  delete: JSX.Element;
} = {
  refresh: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16pt"
      viewBox="0 -960 960 960"
      width="16pt"
      fill="currentColor"
    >
      <path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z" />
    </svg>
  ),
  edit: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16pt"
      viewBox="0 -960 960 960"
      width="16pt"
      fill="currentColor"
    >
      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
    </svg>
  ),
  delete: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16pt"
      viewBox="0 -960 960 960"
      width="16pt"
      fill="currentColor"
    >
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
    </svg>
  ),
};

export default function IconButton({
  variant = "text",
  click,
  icon,
}: ButtonProps) {
  return <Button label={<>{icons[icon]}</>} variant={variant} click={click} />;
}
