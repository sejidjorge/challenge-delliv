"use client";

import Button from "@/components/atoms/button";
import { usePublicApi } from "@/hooks/apiPublicHooks";

export default function Register() {
  const data = {
    name: "John Doe front",
    email: "johndoe@userfront.com",
    address: "Av. Paulista, 123 - Paraíso, São Paulo - SP, 01311-000",
    password:
      "1db4a0041876241916ff8b935a46b680de655e06456c77c1d2970688ea2838b9",
  };

  const { register } = usePublicApi();

  function registerUser() {
    register(data);
  }

  return (
    <div>
      <h1>Register is running!</h1>
      <Button click={registerUser} label="Register" />
    </div>
  );
}
