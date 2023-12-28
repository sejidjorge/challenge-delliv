import SidebarBase from "@/components/atoms/baseSideBar";
import Button from "@/components/atoms/button";
import { ContainerForm } from "@/components/atoms/containers";
import Input from "@/components/atoms/inputs";
import Notification from "@/components/atoms/notifications";
import Typography from "@/components/atoms/typography";
import { usePrivateApi } from "@/hooks/apiPrivateHooks";
import { Dispatch, SetStateAction, useState } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserTypes {
  name: string;
  role: string;
  address: string;
}
export interface UpdateUserPasswordTypes {
  oldPassword: string;
  newPassword: string;
}

interface PropsSidebar {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: User;
}

export default function EditUserSidebar({ open, setOpen, user }: PropsSidebar) {
  const { updateUserProfile } = usePrivateApi();

  const [registerData, setRegisterData] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
    role: user.role,
  });

  function onClose() {
    setOpen(false);
    setRegisterData({
      name: "",
      email: "",
      address: "",
      role: "USER",
    });
  }

  async function handleSubmitRegister() {
    try {
      const body = {
        name: registerData.name,
        email: registerData.email,
        address: registerData.address,
        role: registerData.role,
      };
      await updateUserProfile(body, user.id);
      Notification({
        type: "success",
        message: "User successfully edited",
      });
      onClose();
    } catch (error: any) {
      console.log(error);
      Notification({ type: "error", message: error.response.data.message });
    }
  }

  return (
    <SidebarBase open={open} setOpen={onClose}>
      <Typography.Title>Editar perfil</Typography.Title>
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
        {/* <Input
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
        /> */}
        <Button
          click={handleSubmitRegister}
          label="Atualizar"
          variant="contained"
          size="100%"
        />
      </ContainerForm>
    </SidebarBase>
  );
}
