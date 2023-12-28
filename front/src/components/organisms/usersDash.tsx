import { usePrivateApi } from "@/hooks/apiPrivateHooks";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { saveAllUsers } from "@/store/reducers/authReducer";
import { useEffect, useState } from "react";
import Button from "../atoms/button";
import {
  ContainerDashBoardActionsIntern,
  ContainerDashBoardCardData,
} from "../atoms/containers";
import Notification from "../atoms/notifications";
import NewUserSidebar from "../molecules/NewUserSidebar";
import Table from "../molecules/table/table";

export default function UsersDash() {
  const listUsers = useAppSelector((state) => state.authUser.listUsers);
  const user = useAppSelector((state) => state.authUser.user);
  const dispath = useAppDispatch();
  const { getAllUsers } = usePrivateApi();
  const [newUser, setNewUser] = useState(false);

  async function getUsers() {
    try {
      const {
        data: { data },
      } = await getAllUsers();
      console.log(data);
      dispath(saveAllUsers(data));
    } catch (error) {
      console.log(error);
      Notification({ type: "error", message: error.response.data.message });
    }
  }

  useEffect(() => {
    getUsers();
  }, [user]);

  return (
    <>
      <ContainerDashBoardActionsIntern>
        <Button
          label="Novo usuario"
          variant="contained"
          click={() => setNewUser((newUser) => !newUser)}
        />
        <Button
          variant="contained"
          label="Atualizar"
          click={() => getUsers()}
        />
      </ContainerDashBoardActionsIntern>
      <ContainerDashBoardCardData>
        <Table
          columns={[
            "AÇÕES",
            "ID DO USUARIO",
            "NOME",
            "EMAIL",
            "ROLE",
            "CRIADO EM",
            "ATUALIZADO EM",
            "ENDEREÇO",
          ]}
          data={listUsers}
          refresh={() => getUsers()}
        />
      </ContainerDashBoardCardData>
      {newUser && (
        <NewUserSidebar
          open={newUser}
          setOpen={setNewUser}
          refresh={() => getUsers()}
        />
      )}
    </>
  );
}
