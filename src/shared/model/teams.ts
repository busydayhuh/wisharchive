import { ID, type Models } from "appwrite";
import { appwriteService } from "./appwrite";

type TeamApiType = {
  create: (
    name: string,
    teamId?: string,
    roles?: string[]
  ) => Promise<Models.Team<Models.Preferences>>;
  updateName: (
    teamId: string,
    newName: string
  ) => Promise<Models.Team<Models.Preferences>>;
  get: (teamId: string) => Promise<Models.Team<Models.Preferences>>;
  list: (
    queries?: string[],
    search?: string
  ) => Promise<Models.TeamList<Models.Preferences>>;
  delete: (teamId: string) => Promise<unknown>;

  addEditor: (
    teamId: string,
    email?: string,
    userId?: string
  ) => Promise<Models.Membership>;
  addReader: (
    teamId: string,
    email?: string,
    userId?: string
  ) => Promise<Models.Membership>;
  getMember: (
    teamId: string,
    membershipId: string
  ) => Promise<Models.Membership>;
  listMembers: (
    teamId: string,
    queries?: string[],
    search?: string
  ) => Promise<Models.MembershipList>;
  changeMemberRole: (
    teamId: string,
    membershipId: string,
    roles: string[]
  ) => Promise<Models.Membership>;
  acceptInvite: (
    teamId: string,
    membershipId: string,
    userId: string,
    secret: string
  ) => Promise<Models.Membership>;
  deleteMembership: (teamId: string, membershipId: string) => Promise<unknown>;
};

const { teams } = appwriteService;

const team: TeamApiType = {
  // для teams
  create: (name) => teams.create(ID.unique(), name, ["editors", "readers"]),
  updateName: (teamId, newName) => teams.updateName(teamId, newName),
  get: (teamId) => teams.get(teamId),
  list: (queries?, search?) => teams.list(queries, search),
  delete: (teamId) => teams.delete(teamId),

  // для memberships
  addEditor: (teamId, email, userId) =>
    teams.createMembership(
      teamId,
      ["editors", "readers"],
      email,
      userId,
      undefined,
      "http://localhost:5173/"
    ),
  addReader: (teamId, email, userId) =>
    teams.createMembership(
      teamId,
      ["readers"],
      email,
      userId,
      undefined,
      "http://localhost:5173/"
    ),
  getMember: (teamId, membershipId) =>
    teams.getMembership(teamId, membershipId),
  listMembers: (teamId, queries, search) =>
    teams.listMemberships(teamId, queries, search),
  changeMemberRole: (teamId, membershipId, roles) =>
    teams.updateMembership(teamId, membershipId, roles),
  acceptInvite: (teamId, membershipId, userId, secret) =>
    teams.updateMembershipStatus(teamId, membershipId, userId, secret),
  deleteMembership: (teamId, membershipId) =>
    teams.deleteMembership(teamId, membershipId),
};

export default team;
