import { ROUTES } from "@/shared/model/routes";
import type { LinkParams } from "@/shared/model/types";
import { href } from "react-router-dom";
import { useRoute } from "./useRoute";

export function useLinkParams(
  type: "wish" | "wishlist",
  id: string,
  ownerId: string,
  data: LinkParams["state"]["data"]
) {
  const { location, params } = useRoute();

  if (type === "wish")
    return {
      to: href(ROUTES.WISH, { wishId: id, userId: ownerId }),
      state: {
        prevLocation: location.pathname,
        prevParams: params,
        data,
      },
    } satisfies LinkParams;

  return {
    to: href(ROUTES.WISHLIST, { listId: id, userId: ownerId }),
    state: {
      prevLocation: location.pathname,
      prevParams: params,
      data,
    },
  } satisfies LinkParams;
}
