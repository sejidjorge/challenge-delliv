"use client";
import Button from "@/components/atoms/button";
import Input from "@/components/atoms/inputs";
import Typography from "@/components/atoms/typography";
import { AuthCard } from "@/components/molecules/cards";
import {
  ContainerAuthPage,
  ContainerError,
  ContainerForm,
} from "@/components/molecules/containers";
import { usePublicApi } from "@/hooks/apiPublicHooks";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { login } from "@/store/reducers/authReducer";
import { newPalet } from "@/styles/theme";
import { useEffect, useState } from "react";
import sha256 from "sha256";

export default function Login() {
  const { loginConection, registerConection } = usePublicApi();
  const data = useAppSelector((state) => state.authUser);
  const dispath = useAppDispatch();
  const [newRegister, setNewRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    address: "",
    role: "USER",
    password: "",
    confirmPassword: "",
  });
  const [authLogin, setAuthLogin] = useState({
    email: "",
    password: "",
  });
  const [viewPass, setViewPass] = useState(false);

  useEffect(() => {
    setAuthLogin({
      email: "",
      password: "",
    });
    setRegisterData({
      name: "",
      email: "",
      address: "",
      role: "USER",
      password: "",
      confirmPassword: "",
    });
  }, [newRegister]);

  async function handleSubmitLogin() {
    try {
      const body = {
        email: authLogin.email,
        password: sha256(authLogin.password),
      };
      const {
        data: { data },
      } = await loginConection(body);
      console.log(data);
      dispath(login(data));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ContainerAuthPage>
      <>
        {!newRegister && (
          <AuthCard width="40%" background={newPalet.background}>
            <Typography.Display>Login</Typography.Display>
            <Typography.Body>
              Insira suas credencias para prosseguir
            </Typography.Body>
            <ContainerForm>
              <Input
                name="E-mail"
                type="email"
                placeholder="Insira seu email"
                value={authLogin.email}
                changeValue={(e: any) =>
                  setAuthLogin({ ...authLogin, email: e.target.value })
                }
              />
              <Input
                name="Senha"
                type={viewPass ? "text" : "password"}
                placeholder="Insira sua senha"
                value={authLogin.password}
                changeValue={(e: any) =>
                  setAuthLogin({ ...authLogin, password: e.target.value })
                }
              />
              <Input
                name="exibir senha"
                type="checkbox"
                value={viewPass}
                changeValue={() => setViewPass((viewPass) => !viewPass)}
              />
              {/* <ContainerError>
                <Typography.Overline>teste</Typography.Overline>
              </ContainerError> */}
              <Button
                click={handleSubmitLogin}
                disabled={!authLogin.email || !authLogin.password}
                label="login"
                variant="contained"
                size="100%"
              />
            </ContainerForm>
            <Typography.Label>
              Não tem uma conta?{" "}
              <Button
                click={() => setNewRegister((newRegister) => !newRegister)}
                label="crie agora"
                variant="text"
              />
            </Typography.Label>
          </AuthCard>
        )}
        {newRegister && (
          <AuthCard width="40%" background={newPalet.background}>
            <Typography.Title>Registro</Typography.Title>
            <Typography.Body>Crie uma conta para acessar</Typography.Body>
            <ContainerForm>
              <Input
                name="Nome"
                placeholder="Insira seu nome"
                value={registerData.name}
                changeValue={(e: any) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
              />
              <Input
                name="E-mail"
                placeholder="Insira seu email"
                value={registerData.email}
                changeValue={(e: any) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
              <Input
                name="Endereço"
                placeholder="Insira seu endereço"
                value={registerData.address}
                changeValue={(e: any) =>
                  setRegisterData({ ...registerData, address: e.target.value })
                }
              />
              <Input
                name="Tipo de perfil"
                value={registerData.role}
                changeValue={(e: any) =>
                  setRegisterData({ ...registerData, role: e.target.value })
                }
                placeholder="role"
                type="select"
                options={[
                  { label: "Admin", value: "ADMIN" },
                  {
                    label: "User",
                    value: "USER",
                  },
                ]}
              />
              <Input
                name="Senha"
                value={registerData.password}
                placeholder="Insira uma senha"
                type={viewPass ? "text" : "password"}
                changeValue={(e: any) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
              <Input
                name="Confirmar Senha"
                placeholder="Confirma a senha inserida"
                type={viewPass ? "text" : "password"}
                value={registerData.confirmPassword}
                changeValue={(e: any) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value,
                  })
                }
              />
              <Input
                name="exibir senha"
                type="checkbox"
                value={viewPass}
                changeValue={(e: any) => setViewPass((viewPass) => !viewPass)}
              />
              <Button
                click={() => {}}
                label="Registrar"
                variant="contained"
                size="100%"
              />
            </ContainerForm>
            <Typography.Label>
              Já possui uma conta?{" "}
              <Button
                click={() => setNewRegister((newRegister) => !newRegister)}
                label="faça login "
                variant="text"
              />
            </Typography.Label>
          </AuthCard>
        )}
      </>
    </ContainerAuthPage>
  );
}
