"use client";

import styled from "styled-components";
import Typography from "./typography";
import { MouseEventHandler } from "react";

export const BodyButton = styled.button`
  padding: 0.5em 1em;
  border: none;
  background-color: goldenrod;
  color: blueviolet;
  cursor: pointer;
`;

export const ButtonLabel = styled(Typography.Label)`
  text-transform: uppercase;
`;

export default function Button({
  label,
  click,
}: {
  label: string;
  click: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <BodyButton onClick={(e) => click(e)}>
      <ButtonLabel>{label}</ButtonLabel>
    </BodyButton>
  );
}
