import { useAppSelector } from "@/hooks/reduxHook";
import { usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function AuthMiddleware({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.authUser);
  const pathname = usePathname();
  // const tokenDecoded = user !== undefined ? jwtDecode(user?.token) : "";
  // const validToken = tokenDecoded.exp! > Math.floor(Date.now() / 1000);

  // if (!user.token || (pathname === "/" && validToken)) {
  //   console.log("ir para login");
  // } else {
  //   console.log("ir para home");
  // }
  return <>{children}</>;
}
