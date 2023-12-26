import { useAppSelector } from "@/hooks/reduxHook";
import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthMiddleware({
  children,
}: {
  children: React.ReactNode;
}) {
  const authData = useAppSelector((state) => state.authUser);
  const pathname = usePathname();
  const router = useRouter();

  if (pathname !== "/login" && authData.user === null) {
    router.push("/login");
  }
  if (pathname === "/login" && authData.user !== null) {
    if (jwtDecode(authData.token).exp > Date.now() / 1000) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }

  return <>{children}</>;
}
