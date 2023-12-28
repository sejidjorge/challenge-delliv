import ModalBase from "@/components/atoms/baseModal";
import Button from "@/components/atoms/button";
import Input from "@/components/atoms/inputs";
import Notification from "@/components/atoms/notifications";
import Typography from "@/components/atoms/typography";
import { usePrivateApi } from "@/hooks/apiPrivateHooks";
import { useAppSelector } from "@/hooks/reduxHook";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ContainerActions, ContainerContent } from "./NewOrder.styles";

interface NewOrderProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refresh: () => void;
}

export default function NewOrder({ open, setOpen, refresh }: NewOrderProps) {
  const user = useAppSelector((state) => state.authUser.user);
  const [steps, setSteps] = useState<number | null>(null);
  const { newOrder, getAllUsers } = usePrivateApi();
  const [users, setUsers] = useState(undefined);
  const [userSelected, setUserSelected] = useState("");

  function onClose() {
    setOpen(false);
    setSteps(null);
    setUsers(undefined);
    setUserSelected("");
    refresh();
  }

  useEffect(() => {
    if (open && user.role === "ADMIN") {
      setSteps(0);
    } else if (open && user.role === "USER") {
      setSteps(1);
    }
  }, [open]);

  useEffect(() => {
    if (open && steps === 2) {
      getUsers();
    }
  }, [open, steps]);

  async function handleNewOrder(userId: string) {
    try {
      await newOrder(userId);
      Notification({
        type: "success",
        message: "Order created successfully",
      });
      onClose();
    } catch (error) {
      Notification({ type: "error", message: error.response.data.message });
    }
  }

  async function getUsers() {
    try {
      const {
        data: { data },
      } = await getAllUsers();
      const cleanedData = data.filter((item) => item.id !== user.id);
      const reorder = cleanedData.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      console.log(reorder);
      setUsers(reorder);
    } catch (error) {
      Notification({ type: "error", message: error.response.data.message });
    }
  }

  return (
    <ModalBase open={open} setOpen={onClose}>
      <ContainerContent>
        <Typography.Title>Novo pedido</Typography.Title>
        {steps === 0 && (
          <>
            <ContainerContent>
              <Typography.Label>
                Você está em um perfil de Admin, o pedido é seu ou para um
                usuario?
              </Typography.Label>
            </ContainerContent>
            <ContainerActions>
              <Button
                label={"meu"}
                variant={"contained"}
                size="100%"
                click={() => setSteps(1)}
              />
              <Button
                label={"usuario"}
                variant={"contained"}
                size="100%"
                click={() => setSteps(2)}
              />
            </ContainerActions>
          </>
        )}
        {steps === 1 && (
          <>
            <ContainerContent>
              <Typography.Label>
                Confirma a criação de um novo pedido?
              </Typography.Label>
            </ContainerContent>
            <ContainerActions>
              <Button
                label={"cancelar"}
                variant={"text"}
                size="100%"
                click={onClose}
              />
              <Button
                label={"confirmar"}
                variant={"contained"}
                size="100%"
                click={() => handleNewOrder(user.id)}
              />
            </ContainerActions>
          </>
        )}
        {steps === 2 && (
          <>
            <ContainerContent>
              <Input
                name=" Selecione o usuario dono do pedido"
                value={userSelected}
                changeValue={(e) => setUserSelected(e.target.value)}
                type="select"
                options={users}
              />
            </ContainerContent>
            <ContainerActions>
              <Button
                label={"cancelar"}
                variant={"text"}
                size="100%"
                click={onClose}
              />
              <Button
                label={"confirmar"}
                variant={"contained"}
                size="100%"
                click={() => handleNewOrder(userSelected)}
              />
            </ContainerActions>
          </>
        )}
      </ContainerContent>
    </ModalBase>
  );
}
