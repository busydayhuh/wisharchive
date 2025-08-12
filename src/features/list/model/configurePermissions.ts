import { Permission, Role } from "appwrite";

export function configurePermissions(isPrivate: boolean, teamId: string) {
  const editingPermissions = [
    Permission.update(Role.team(teamId, "owner")),
    Permission.update(Role.team(teamId, "editors")),
    Permission.delete(Role.team(teamId, "owner")),
  ];

  if (!isPrivate) {
    return [Permission.read(Role.any()), ...editingPermissions];
  }

  return [
    Permission.read(Role.team(teamId, "readers")),
    Permission.read(Role.team(teamId, "owner")),
    ...editingPermissions,
  ];
}
