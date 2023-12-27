"use client";

import Button from "@/components/atoms/button";
import { UserCardAvatar } from "@/components/atoms/cards";
import {
  ContainerActionsBar,
  ContainerDashBoard,
  ContainerDashBoardCardData,
  ContainerDashBoardContent,
  ContainerDashPage,
  ContainerNavbar,
  ContainerUserProfile,
} from "@/components/atoms/containers";
import Typography from "@/components/atoms/typography";
import CardData from "@/components/molecules/cardData";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { logout } from "@/store/reducers/authReducer";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, token } = useAppSelector((state) => state.authUser);
  const dispath = useAppDispatch();
  const router = useRouter();

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
          <Typography.Title>Dashboard</Typography.Title>
          <ContainerDashBoardCardData>
            <CardData />
            <CardData />
            <CardData />
            <CardData />
            <CardData />
            <CardData />
          </ContainerDashBoardCardData>
        </ContainerDashBoardContent>
      </ContainerDashBoard>
    </ContainerDashPage>
  );
}
