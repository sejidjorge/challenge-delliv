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

export interface Order {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  name: string;
  address: string;
}

interface PropsModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  order: Order | undefined;
}

export default function ModalDeleteOrder({ open, setOpen, order }: PropsModal) {
  const { deleteOrder } = usePrivateApi();

  function onClose() {
    setOpen((open) => !open);
  }

  async function handleChangeStatus() {
    try {
      await deleteOrder(order?.id);
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
        <Typography.Body>Deseja realmente excluir este pedido?</Typography.Body>
        <ContainerActions>
          <Button
            label={"confirmar"}
            variant={"text"}
            click={handleChangeStatus}
          />
          <Button label={"cancelar"} variant="contained" click={onClose} />
        </ContainerActions>
      </ContainerContent>
    </BaseModal>
  );
}
