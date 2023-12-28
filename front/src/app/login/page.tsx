"use client";
import Button from "@/components/atoms/button";
import { AuthCard } from "@/components/atoms/cards";
import {
  ContainerAuthPage,
  ContainerForm,
} from "@/components/atoms/containers";
import Input from "@/components/atoms/inputs";
import Notification from "@/components/atoms/notifications";
import Typography from "@/components/atoms/typography";
import { usePublicApi } from "@/hooks/apiPublicHooks";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { login, logout } from "@/store/reducers/authReducer";
import { newPalet } from "@/styles/theme";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import sha256 from "sha256";

export default function Login() {
  const { loginConection, registerConection } = usePublicApi();
  const token = useAppSelector((state) => state.authUser.token);
  const dispath = useAppDispatch();
  const router = useRouter();
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
      Notification({ type: "success", message: "login successfully" });
      dispath(login(data));
    } catch (error: any) {
      console.log(error);
      Notification({ type: "error", message: error.response.data.message });
    }
  }

  async function handleSubmitRegister() {
    try {
      if (registerData.password !== registerData.confirmPassword) {
        Notification({ type: "error", message: "Passwords don't match" });
        return;
      }
      const body = {
        name: registerData.name,
        email: registerData.email,
        address: registerData.address,
        role: registerData.role,
        password: sha256(registerData.password),
      };
      await registerConection(body);
      Notification({
        type: "success",
        message: "New user successfully registered",
      });
      setNewRegister(false);
    } catch (error: any) {
      console.log(error);
      Notification({ type: "error", message: error.response.data.message });
    }
  }

  if (token !== "") {
    const decoded: {
      id: string;
      name: string;
      role: string;
      exp: number;
      iat: number;
    } = jwtDecode(token);

    if (decoded?.exp > Math.floor(Date.now() / 1000)) {
      router.push("/dashboard");
    } else {
      dispath(logout());
    }
  }

  return (
    <>
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
                  name="Exibir senha"
                  type="checkbox"
                  value={viewPass}
                  changeValue={() => setViewPass((viewPass) => !viewPass)}
                />
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
                    setRegisterData({
                      ...registerData,
                      address: e.target.value,
                    })
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
                      label: "Usuario",
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
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
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
                  click={handleSubmitRegister}
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
    </>
  );
}
