import styled from "styled-components";

export const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2em;
  width: 100%;
  max-width: 250pt;
  margin-bottom: 1em;
`;

export const InputStyled = styled.input`
  width: 100%;
  border: 1.8px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  border-radius: 0.3em;
  ${({ theme }) => theme.breakpoints.up("md")} {
    height: 20pt;
    font-size: 14pt;
    padding: 14pt 0.5em;
  }
  ${({ theme }) => theme.breakpoints.between("sm", "md")} {
    height: 16pt;
    font-size: 12pt;
    padding: 12pt 0.5em;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    height: 16pt;
    font-size: 11pt;
    padding: 11pt 0.5em;
  }
  outline: none;
  color: ${({ theme }) => theme.primaryText};
  &:is(&:hover) {
    border: 1.8px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    transition: 0.2s;
    outline: none;
  }
`;

export const SelectStyled = styled.select`
  width: 100%;
  border: 1.8px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  border-radius: 0.3em;
  ${({ theme }) => theme.breakpoints.up("md")} {
    font-size: 14pt;
    padding: 6pt 0.5em;
  }
  ${({ theme }) => theme.breakpoints.between("sm", "md")} {
    font-size: 12pt;
    padding: 5pt 0.5em;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 11pt;
    padding: 4.5pt 0.5em;
  }
  outline: none;
  color: ${({ theme }) => theme.primaryText};
  appearance: none;
  option:checked {
    background-color: ${({ theme }) => theme.background};
    border: 1.8px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.primaryText};
  }
  &:is(&:hover) {
    border: 1.8px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    transition: 0.2s;
    outline: none;
  }
`;

export const ContainerCheckbox = styled(ContainerInput)`
  display: flex;
  flex-direction: row;
`;

export const CheckboxStyled = styled.input.attrs({ type: "checkbox" })`
  border: 1.8px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};
  border-radius: 0.3em;
  cursor: pointer;
  ${({ theme }) => theme.breakpoints.up("md")} {
    height: 20pt;
    width: 20pt;
  }
  ${({ theme }) => theme.breakpoints.between("sm", "md")} {
    height: 16pt;
    width: 16pt;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    height: 16pt;
    width: 16pt;
  }
  outline: none;
  appearance: none;
  position: relative;
  &::before,
  &::after {
    content: "";
    position: absolute;
    background-color: ${({ theme }) => theme.background};
    height: calc(100% - 4pt);
    width: calc(100% - 4pt);
    top: 2pt;
    left: 2pt;
    transition: 0.2s;
    border-radius: 50%;
    transform: scale(0.1);
  }
  &:checked:before {
    display: none;
    height: calc(100% - 4pt);
    width: calc(100% - 4pt);
    top: 2pt;
    left: 2pt;
    background-color: ${({ theme }) => theme.background};
    transition: 0.2s;
    opacity: 0;
    border-radius: 50%;
    transform: scale(0.1);
  }
  &:checked:after {
    display: block;
    height: calc(100% - 4pt);
    width: calc(100% - 4pt);
    top: 2pt;
    left: 2pt;
    background-color: ${({ theme }) => theme.primary};
    transition: 0.2s;
    opacity: 1;
    border-radius: 2pt;
    transform: scale(1);
  }
  color: ${({ theme }) => theme.primaryText};
  &:is(&:hover) {
    border: 2.8px solid ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primary};
    transition: 0.2s;
    outline: none;
  }
  &:checked {
    background-color: ${({ theme }) => theme.background};
    border: 2.8px solid ${({ theme }) => theme.primary};
  }
`;
