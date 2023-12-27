"use client";

import Button from "@/components/atoms/button";
import { UserCardAvatar } from "@/components/atoms/cards";
import {
  ContainerActionsBar,
  ContainerDashBoard,
  ContainerDashBoardActions,
  ContainerDashBoardActionsIntern,
  ContainerDashBoardCardData,
  ContainerDashBoardContent,
  ContainerDashPage,
  ContainerNavbar,
  ContainerUserProfile,
} from "@/components/atoms/containers";
import Typography from "@/components/atoms/typography";
import CardData from "@/components/molecules/cardData";
import RefreshButton from "@/components/molecules/refreshButton";
import Table from "@/components/molecules/table/table";
import { usePrivateApi } from "@/hooks/apiPrivateHooks";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { logout } from "@/store/reducers/authReducer";
import { saveListOrders } from "@/store/reducers/ordersReducer";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, token } = useAppSelector((state) => state.authUser);
  const orders = useAppSelector((state) => state.order.listOrders);
  const dispath = useAppDispatch();
  const router = useRouter();
  const { getAllOrders, getOrderUserById } = usePrivateApi();
  console.log(orders);

  const ordersNumberByStatus = orders.reduce((acc, item) => {
    acc[item.status] = acc[item.status] || [];
    acc[item.status].push(item);
    return acc;
  }, {});

  console.log(ordersNumberByStatus);

  if (token) {
    const decoded = jwtDecode(token);
    if (decoded?.exp > Math.floor(Date.now() / 1000)) {
      router.push("/dashboard");
    } else {
      dispath(logout());
      router.push("/login");
    }
  } else {
    router.push("/login");
  }

  async function getGeneralOrders() {
    try {
      const { data } = await getAllOrders();
      const reorderData = data.map((item) => ({
        id: item.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        userId: item.userId,
        status: item.status,
        name: item.user.name,
        address: item.user.address,
        email: item.user.email,
      }));

      dispath(saveListOrders(reorderData));
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserOrders() {
    try {
      const { data } = await getOrderUserById(user.id);
      const reorderData = data.map((item) => ({
        id: item.id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        userId: item.userId,
        status: item.status,
        name: item.user.name,
        address: item.user.address,
        email: item.user.email,
      }));
      dispath(saveListOrders(reorderData));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user.role === "USER") {
      getUserOrders();
    } else {
      getGeneralOrders();
    }
  }, [user]);

  return (
    <ContainerDashPage>
      <ContainerNavbar>
        <Typography.Title>Dashboard</Typography.Title>
        <ContainerActionsBar>
          <ContainerUserProfile>
            <UserCardAvatar>
              <Typography.Body>{user?.name.slice(0, 1)}</Typography.Body>
            </UserCardAvatar>
            <Typography.Label>{user?.name}</Typography.Label>
          </ContainerUserProfile>
          <Button
            label="Logout"
            variant="contained"
            click={() => {
              dispath(logout());
              router.push("/login");
            }}
          />
        </ContainerActionsBar>
      </ContainerNavbar>
      <ContainerDashBoard>
        <ContainerDashBoardContent>
          <ContainerDashBoardActions>
            <Button label="Pedidos" variant="text" click={() => {}} />
            <Button label="Usuarios" variant="text" click={() => {}} />
          </ContainerDashBoardActions>
          <ContainerDashBoardActionsIntern>
            <RefreshButton
              variant="contained"
              click={() => {
                if (user.role === "USER") {
                  getUserOrders();
                } else {
                  getGeneralOrders();
                }
              }}
            />
          </ContainerDashBoardActionsIntern>
          <ContainerDashBoardCardData>
            {Object.entries(ordersNumberByStatus).map(([status, items]) => (
              <CardData key={status} title={status} count={items.length} />
            ))}
            <Table
              columns={[
                "PEDIDO",
                "CRIADO EM",
                "ATUALIZADO EM",
                "USUARIO",
                "STATUS",
                "NOME",
                "ENDEREÇO",
                "EMAIL",
              ]}
              data={orders}
            />
          </ContainerDashBoardCardData>
        </ContainerDashBoardContent>
      </ContainerDashBoard>
    </ContainerDashPage>
  );
}
