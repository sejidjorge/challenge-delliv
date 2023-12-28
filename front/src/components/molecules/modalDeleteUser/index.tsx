"use client";

import BaseModal from "@/components/atoms/baseModal";
import Button from "@/components/atoms/button";
import Input from "@/components/atoms/inputs";
import { usePrivateApi } from "@/hooks/apiPrivateHooks";
import { Dispatch, SetStateAction, useState } from "react";
import { ContainerActions, ContainerContent } from "./deleteOrder.styles";
import Notification from "@/components/atoms/notifications";
import { AxiosError } from "axios";
import Typography from "@/components/atoms/typography";

interface User {
  id: string;
  email: string;
  name: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface PropsModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  user: User | undefined;
}

export default function ModalDeleteUser({ open, setOpen, user }: PropsModal) {
  const { deleteUserProfile } = usePrivateApi();

  function onClose() {
    setOpen((open) => !open);
  }

  async function handleChangeDelete() {
    try {
      await deleteUserProfile(user?.id);
      Notification({
        type: "success",
        message: "Order deleted successfully",
      });
      onClose();
    } catch (error: AxiosError) {
      Notification({ type: "error", message: error.response.data.message });
    }
  }

  return (
    <BaseModal open={open} setOpen={onClose}>
      <ContainerContent>
        <Typography.Body>Deseja realmente excluir este perfil?</Typography.Body>
        <ContainerActions>
          <Button
            label={"confirmar"}
            variant={"text"}
            click={handleChangeDelete}
          />
          <Button label={"cancelar"} variant="contained" click={onClose} />
        </ContainerActions>
      </ContainerContent>
    </BaseModal>
  );
}
