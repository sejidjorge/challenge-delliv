import Button from "@/components/atoms/button";
import Typography from "@/components/atoms/typography";
import { MouseEventHandler } from "react";
interface ButtonProps {
  variant: "text" | "outlined" | "contained";
  click: MouseEventHandler<HTMLButtonElement>;
}
export default function RefreshButton({
  variant = "text",
  click,
}: ButtonProps) {
  return (
    <Button
      label={
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16pt"
            viewBox="0 -960 960 960"
            width="16pt"
            fill="currentColor"
          >
            <path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z" />
          </svg>
        </>
      }
      variant={variant}
      click={click}
    />
  );
}
