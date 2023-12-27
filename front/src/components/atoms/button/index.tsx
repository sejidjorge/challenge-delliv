"use client";

import { MouseEventHandler } from "react";
import {
  BodyButton,
  BodyButtonOutlined,
  BodyButtonText,
  ButtonLabel,
} from "./button.styles";

interface ButtonProps {
  label: string | JSX.Element;
  variant: "text" | "outlined" | "contained";
  click: MouseEventHandler<HTMLButtonElement>;
  size?: string;
  disabled?: boolean;
}

export default function Button({
  label,
  variant = "text",
  click,
  size,
  disabled = false,
}: ButtonProps): JSX.Element {
  if (variant === "outlined") {
    return (
      <BodyButtonOutlined
        disabled={disabled}
        size={size}
        onClick={(e) => click(e)}
      >
        <ButtonLabel>{label}</ButtonLabel>
      </BodyButtonOutlined>
    );
  }
  if (variant === "contained") {
    return (
      <BodyButton disabled={disabled} size={size} onClick={(e) => click(e)}>
        <ButtonLabel>{label}</ButtonLabel>
      </BodyButton>
    );
  }
  return (
    <BodyButtonText disabled={disabled} size={size} onClick={(e) => click(e)}>
      <ButtonLabel>{label}</ButtonLabel>
    </BodyButtonText>
  );
}
