"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { logout } from "@/store/reducers/authReducer";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function Home() {
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
    <div>
      <h1>Front is running!</h1>
    </div>
  );
}
