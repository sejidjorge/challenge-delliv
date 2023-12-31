import styled from "styled-components";
import Typography from "../typography";

interface ButtonProps {
  size?: string;
}

export const BodyButton = styled.button<ButtonProps>`
  padding: 0.4rem 0.8rem;
  width: ${({ size }) => size ?? "auto"};
  max-width: 250pt;
  border: 1px solid transparent;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primaryText};
  border-radius: 0.2em;
  cursor: pointer;
  outline: none;
  &:is(&:hover) {
    background-color: ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.primary};
    border: 1px solid transparent;
  }
  &:disabled {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.secondaryText};
    border: 1px solid transparent;
    cursor: not-allowed;
    &:hover {
      background-color: ${({ theme }) => theme.secondary};
      color: ${({ theme }) => theme.secondaryText};
      border: 1px solid transparent;
      cursor: not-allowed;
    }
  }
`;

export const BodyButtonText = styled(BodyButton)<ButtonProps>`
  background-color: transparent;
  padding: 0.4rem 0.8rem;
  width: ${({ size }) => size ?? "auto"};
  color: ${({ theme }) => theme.primary};
  border: 1px solid transparent;
  &:is(&:hover) {
    background-color: ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.primary};
    border: 1px solid transparent;
  }
`;

export const BodyButtonOutlined = styled(BodyButtonText)<ButtonProps>`
  border: 1px solid ${({ theme }) => theme.primary};
  width: ${({ size }) => size ?? "auto"};
  &:is(&:hover) {
    background-color: ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.primary};
    border: 1px solid ${({ theme }) => theme.primary};
    box-shadow: none;
  }
`;

export const ButtonLabel = styled(Typography.Label)`
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
