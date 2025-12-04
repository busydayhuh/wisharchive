import type { AccessRoles } from "@/features/collaborators";
import React from "react";

export const RolesContext = React.createContext<AccessRoles | undefined | null>(
  null
);
