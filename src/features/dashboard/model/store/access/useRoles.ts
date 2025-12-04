import { useContext } from "react";
import { RolesContext } from "./Context";

export function useRoles() {
  const ctx = useContext(RolesContext);
  if (!ctx) {
    throw new Error("useRoles must be used inside RolesContext");
  }
  return ctx;
}
