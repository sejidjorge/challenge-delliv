import SidebarBase from "@/components/atoms/baseSideBar";
import Button from "@/components/atoms/button";
import { ContainerForm } from "@/components/atoms/containers";
import Input from "@/components/atoms/inputs";
import Notification from "@/components/atoms/notifications";
import Typography from "@/components/atoms/typography";
import { usePublicApi } from "@/hooks/apiPublicHooks";
import { Dispatch, SetStateAction, useState } from "react";
import sha256 from "sha256";

interface PropsSidebar {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refresh: () => void;
}

export default function NewUserSidebar({
  open,
  setOpen,
  refresh,
}: PropsSidebar) {
  const { registerConection } = usePublicApi();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    address: "",
    role: "USER",
    password: "",
    confirmPassword: "",
  });
  const [viewPass, setViewPass] = useState(false);

  function onClose() {
    setOpen(false);
    setRegisterData({
      name: "",
      email: "",
      address: "",
      role: "USER",
      password: "",
      confirmPassword: "",
    });
    refresh();
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
      onClose();
    } catch (error: any) {
      console.log(error);
      Notification({ type: "error", message: error.response.data.message });
    }
  }

  return (
    <SidebarBase open={open} setOpen={onClose}>
      <Typography.Title>Novo Usuário</Typography.Title>
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
    </SidebarBase>
  );
}
