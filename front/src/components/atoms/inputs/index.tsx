import { Dispatch, SetStateAction } from "react";
import Typography from "../typography";
import {
  CheckboxStyled,
  ContainerCheckbox,
  ContainerInput,
  InputStyled,
  SelectStyled,
} from "./input.styles";

interface InputProps {
  name: string;
  placeholder?: string;
  type?: string;
  options?: { value: string; label: string }[];
  value: any;
  changeValue: Dispatch<SetStateAction<any>>;
}

export default function Input({
  placeholder,
  type = "text",
  name,
  value,
  changeValue,
  options = [],
}: InputProps): JSX.Element {
  if (type === "select") {
    return (
      <ContainerInput>
        <label htmlFor={name?.replace(" ", "")}>
          <Typography.Label>{name}</Typography.Label>
        </label>
        <SelectStyled
          name={name?.replace(" ", "")}
          id={name?.replace(" ", "")}
          value={value}
          onChange={changeValue}
        >
          <>
            <option value="" selected>selecione uma opção</option>
            {options.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </>
        </SelectStyled>
      </ContainerInput>
    );
  }
  if (type === "checkbox") {
    return (
      <ContainerCheckbox>
        <CheckboxStyled
          name={name?.replace(" ", "")}
          id={name?.replace(" ", "")}
          type="checkbox"
          value={value}
          onChange={changeValue}
        />
        <label htmlFor={name?.replace(" ", "")}>
          <Typography.Label>{name}</Typography.Label>
        </label>
      </ContainerCheckbox>
    );
  }

  return (
    <ContainerInput>
      <label htmlFor={name?.replace(" ", "")}>
        <Typography.Label>{name}</Typography.Label>
      </label>
      <InputStyled
        name={name?.replace(" ", "")}
        id={name?.replace(" ", "")}
        type={type}
        value={value}
        onChange={changeValue}
        placeholder={placeholder}
      />
    </ContainerInput>
  );
}
