import { usePrivateApi } from "@/hooks/apiPrivateHooks";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { saveListOrders } from "@/store/reducers/ordersReducer";
import { useEffect, useState } from "react";
import Button from "../atoms/button";
import {
  ContainerDashBoardActionsIntern,
  ContainerDashBoardCardData,
} from "../atoms/containers";
import Notification from "../atoms/notifications";
import NewOrder from "../molecules/ModalNewOrder";
import CardData from "../molecules/cardData";
import Table from "../molecules/table/table";

export default function OrderDash() {
  const { user } = useAppSelector((state) => state.authUser);
  const orders = useAppSelector((state) => state.order.listOrders);
  const dispath = useAppDispatch();
  const [newOrder, setNewOrder] = useState(false);
  const { getAllOrders, getOrderUserById } = usePrivateApi();

  const ordersNumberByStatus = orders.reduce((acc, item) => {
    acc[item.status] = acc[item.status] || [];
    acc[item.status].push(item);
    return acc;
  }, {});

  async function getGeneralOrders() {
    try {
      const { data } = await getAllOrders();
      const reOrder = data.map((item) => ({
        id: item.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        status: item.status,
        name: item.user.name,
        address: item.user.address,
      }));
      dispath(saveListOrders(reOrder));
    } catch (error) {
      console.log(error);
      Notification({ type: "error", message: error.response.data.message });
    }
  }

  async function getUserOrders() {
    try {
      const { data } = await getOrderUserById(user.id);
      const reOrder = data.map((item) => ({
        id: item.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        status: item.status,
        name: item.user.name,
        address: item.user.address,
      }));

      dispath(saveListOrders(reOrder));
    } catch (error) {
      console.log(error);
      Notification({ type: "error", message: error.response.data.message });
    }
  }

  function refresh() {
    if (user?.role === "USER") {
      getUserOrders();
    } else {
      getGeneralOrders();
    }
  }
  useEffect(() => {
    refresh();
  }, [user]);
  return (
    <>
      <ContainerDashBoardCardData>
        {Object.entries(ordersNumberByStatus).map(([status, items]) => (
          <CardData key={status} title={status} count={items.length} />
        ))}
      </ContainerDashBoardCardData>
      <ContainerDashBoardActionsIntern>
        <Button
          label="Novo pedido"
          variant="contained"
          click={() => setNewOrder((newOrder) => !newOrder)}
        />
        <Button variant="contained" label="Atualizar" click={() => refresh()} />
      </ContainerDashBoardActionsIntern>
      <ContainerDashBoardCardData>
        <Table
          columns={[
            "AÇÕES",
            "ID DO PEDIDO",
            "CRIADO EM",
            "ATUALIZADO EM",
            "STATUS",
            "USUARIO",
            "ENDEREÇO DE ENTREGA",
          ]}
          data={orders}
          refresh={() => refresh()}
        />
      </ContainerDashBoardCardData>
      {newOrder && (
        <NewOrder
          open={newOrder}
          setOpen={setNewOrder}
          refresh={() => refresh()}
        />
      )}
    </>
  );
}
