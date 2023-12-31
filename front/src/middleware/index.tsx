"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { logout } from "@/store/reducers/authReducer";
import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Middleware({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const decoded = tryDecodeToken(token);
  const validToken = decoded && decoded.exp > Math.floor(Date.now() / 1000);

  function validate() {
    if (!token || !validToken) {
      if (pathname !== "/login") {
        dispatch(logout());
        router.push("/login");
      }
    } else {
      if (pathname !== "/dashboard") {
        router.push("/dashboard");
      }
    }
  }

  useEffect(() => {
    validate();
  }, [pathname]);

  return <>{children}</>;
}

function tryDecodeToken(
  token: string | null
): { id: string; name: string; role: string; exp: number; iat: number } | null {
  try {
    return token ? jwtDecode(token) : null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
