"use client";

import Button from "@/components/atoms/button";
import { UserCardAvatar } from "@/components/atoms/cards";
import {
  ContainerActionsBar,
  ContainerDashBoard,
  ContainerDashBoardActions,
  ContainerDashBoardContent,
  ContainerDashPage,
  ContainerNavbar,
  ContainerUserProfile,
} from "@/components/atoms/containers";
import Typography from "@/components/atoms/typography";
import EditUserPassSidebar from "@/components/molecules/EditUserPassSidebar";
import OrderDash from "@/components/organisms/orderDash";
import UsersDash from "@/components/organisms/usersDash";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { logout } from "@/store/reducers/authReducer";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const { user, token } = useAppSelector((state) => state.authUser);
  const dispath = useAppDispatch();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [editPass, setEditPass] = useState(false);

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

  return (
    <ContainerDashPage>
      <ContainerNavbar>
        <Typography.Title>Dashboard</Typography.Title>
        <ContainerActionsBar>
          <ContainerUserProfile>
            <UserCardAvatar>
              <Typography.Body>{user?.name.slice(0, 1)}</Typography.Body>
            </UserCardAvatar>
            <Button
              label={user?.name}
              variant="contained"
              click={() => setEditPass(true)}
            />
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
          {user?.role === "ADMIN" && (
            <ContainerDashBoardActions>
              <Button label="Pedidos" variant="text" click={() => setStep(0)} />
              <Button
                label="Usuarios"
                variant="text"
                click={() => setStep(1)}
              />
            </ContainerDashBoardActions>
          )}
          {step === 0 && <OrderDash />}
          {step === 1 && <UsersDash />}
        </ContainerDashBoardContent>
      </ContainerDashBoard>
      {editPass && (
        <EditUserPassSidebar
          open={editPass}
          setOpen={setEditPass}
          user={user}
        />
      )}
    </ContainerDashPage>
  );
}
