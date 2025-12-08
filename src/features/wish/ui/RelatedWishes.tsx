import { ContentGrid } from "@/features/dashboard/";
import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui/kit/button";
import { Skeleton } from "@/shared/ui/kit/skeleton";
import { ChevronRight } from "lucide-react";
import { useMemo } from "react";
import { Link, href } from "react-router";
import { useWishes } from "../model/hooks/useWishes";
import { WishImage } from "./WishImage";

export function RelatedWishes({
  userId,
  wishId,
}: {
  userId: string;
  wishId: string;
  userName?: string;
}) {
  const { wishes, isLoading, error } = useWishes(
    {
      ownerId: userId,
      archived: false,
      sort: {
        field: "$sequence",
        direction: "desc",
      },
      filters: [],
    },
    "main-wishes",
    userId
  );

  const relatedWishes = useMemo(
    () =>
      wishes
        ?.flat()
        .filter((wish) => wish.$id !== wishId)
        .slice(0, 4),
    [wishes, wishId]
  );

  if (isLoading)
    return (
      <div className="mx-2 md:mx-auto md:max-w-[96%]">
        <ContentGrid viewMode="gallery">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={"related" + index} className="mb-4" />
          ))}
        </ContentGrid>
      </div>
    );
  if (error) return null;

  if (relatedWishes)
    return (
      <div className="space-y-3 md:space-y-6 mx-2 md:mx-auto md:max-w-[96%]">
        <div className="flex flex-wrap justify-between items-center">
          <div className="font-headers font-bold text-lg md:text-xl 2xl:text-2xl">
            Другие желания от @{userId}
          </div>
          <Button
            variant="link"
            className="has-[>svg]:px-0 text-muted-foreground"
            asChild
            aria-label="Смотреть все желания пользователя"
          >
            <Link to={href(ROUTES.WISHES, { userId: userId })}>
              все <ChevronRight />
            </Link>
          </Button>
        </div>

        <ContentGrid viewMode="gallery">
          {relatedWishes.map((wish) => (
            <div
              className="group-card-wrapper transition-all duration-300"
              key={wish.$id}
            >
              <Link
                to={href(ROUTES.WISH, {
                  wishId: wish.$id,
                  userId: wish.ownerId,
                })}
                state={{
                  data: {
                    userName: wish.owner.userName,
                    userId: wish.owner.userId,
                    wishTitle: wish.title,
                    wlTitle: wish.wishlist?.title,
                  },
                }}
              >
                <div className="flex flex-col gap-1 mb-4">
                  <WishImage
                    wishId={wish.$id}
                    url={wish.imageURL}
                    alt={wish.title}
                    variant="gallery"
                  />
                  <div className="font-medium text-sm">{wish.title}</div>
                </div>
              </Link>
            </div>
          ))}
        </ContentGrid>
      </div>
    );
}
