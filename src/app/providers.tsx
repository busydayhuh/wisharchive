import { UserProvider } from "@/features/auth";
import { type ReactNode } from "react";

function Providers(props: { children: ReactNode }) {
  return <UserProvider>{props.children}</UserProvider>;
}

export default Providers;
