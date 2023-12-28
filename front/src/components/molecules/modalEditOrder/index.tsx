"use client";

import BaseModal from "@/components/atoms/baseModal";
import Button from "@/components/atoms/button";
import Input from "@/components/atoms/inputs";
import { usePrivateApi } from "@/hooks/apiPrivateHooks";
import { Dispatch, SetStateAction, useState } from "react";
import { ContainerActions, ContainerContent } from "./editOrder.styles";
import Notification from "@/components/atoms/notifications";
import { AxiosError } from "axios";

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

const options = [
  {
    value: "PENDING",
    label: "Pendente",
  },
  {
    value: "DELIVERED",
    label: "Entregue",
  },
  {
    value: "ONROUTE",
    label: "Em rota de entrega",
  },
  {
    value: "RETURNED",
    label: "Devolvido",
  },
  {
    value: "CANCELED",
    label: "Cancelado",
  },
];

export default function ModalEditOrder({ open, setOpen, order }: PropsModal) {
  const [status, setStatus] = useState(order?.status);
  const { updateOrder } = usePrivateApi();

  function onClose() {
    setStatus("");
    setOpen((open) => !open);
  }

  async function handleChangeStatus() {
    try {
      await updateOrder(status, order?.id);
      Notification({
        type: "success",
        message: "Status changed successfully",
      });
      onClose();
    } catch (error: AxiosError) {
      Notification({ type: "error", message: error.response.data.message });
    }
  }

  return (
    <BaseModal open={open} setOpen={onClose}>
      <ContainerContent>
        <Input
          name="Alterar status do pedido"
          value={status}
          changeValue={(e) => setStatus(e.target.value)}
          type="select"
          options={options}
        />
        <ContainerActions>
          <Button label={"cancelar"} variant={"text"} click={onClose} />
          <Button
            label={"confirmar"}
            variant={"contained"}
            click={handleChangeStatus}
          />
        </ContainerActions>
      </ContainerContent>
    </BaseModal>
  );
}
