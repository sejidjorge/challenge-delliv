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

export default function EditUserPassSidebar({
  open,
  setOpen,
  user,
}: PropsSidebar) {
  const { updateUserPass } = usePrivateApi();
  const [viewPass, setViewPass] = useState(false);
  const [registerData, setRegisterData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function onClose() {
    setOpen(false);
    setRegisterData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }

  async function handleSubmitRegister() {
    if (registerData.newPassword !== registerData.confirmPassword) {
      Notification({ type: "error", message: "new passwords don't match" });
      return;
    }
    try {
      const body = {
        oldPassword: registerData.oldPassword,
        newPassword: registerData.newPassword,
      };
      await updateUserPass(body, user.id);
      Notification({
        type: "success",
        message: "Password successfully edited",
      });
      onClose();
    } catch (error: any) {
      console.log(error);
      Notification({ type: "error", message: error.response.data.message });
    }
  }

  return (
    <SidebarBase open={open} setOpen={onClose}>
      <Typography.Title>Alterar senha</Typography.Title>
      <ContainerForm>
        <Input
          name="Senha"
          value={registerData.oldPassword}
          placeholder="Insira sua senha anterior"
          type={viewPass ? "text" : "password"}
          changeValue={(e: any) =>
            setRegisterData({
              ...registerData,
              oldPassword: e.target.value,
            })
          }
        />
        <Input
          name="Senha"
          value={registerData.oldPassword}
          placeholder="Insira sua nova senha"
          type={viewPass ? "text" : "password"}
          changeValue={(e: any) =>
            setRegisterData({
              ...registerData,
              newPassword: e.target.value,
            })
          }
        />
        <Input
          name="Confirmar a nova senha"
          placeholder="Confirme a nova senha inserida"
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
          label="Atualizar"
          variant="contained"
          size="100%"
        />
      </ContainerForm>
    </SidebarBase>
  );
}
