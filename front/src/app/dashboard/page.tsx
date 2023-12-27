"use client";

import { ContainerDashPage } from "@/components/molecules/containers";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { logout } from "@/store/reducers/authReducer";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const authData = useAppSelector((state) => state.authUser);
  const dispath = useAppDispatch();
  const router = useRouter();

  if (authData.token) {
    const decoded = jwtDecode(authData.token);
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
      <h1>dash is running!</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
        quisquam.
      </p>
      <Link href="/">go home</Link>
      <Link href="/login">go login</Link>
    </ContainerDashPage>
  );
}
