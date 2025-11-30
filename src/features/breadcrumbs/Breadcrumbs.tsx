import { useIsMobile } from "@/shared/lib/react/useIsMobile";
import type { PathParams } from "@/shared/model/routes";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/kit/breadcrumb";
import { href, Link, matchPath } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { breadcrumbMap, type Crumb } from "./model/breadcrumbMap";
import { useRoute } from "./model/useRoute";

type BreadcrumbKey = keyof typeof breadcrumbMap;

export function Breadcrumbs({ className }: { className?: string }) {
  const { location, params } = useRoute();
  const { pathname, state } = location;
  const isMobile = useIsMobile();

  // Ищем крошку в мапе крошек
  const currentEntry = Object.entries(breadcrumbMap).find(([pattern]) =>
    matchPath({ path: pattern, end: true }, pathname)
  );
  if (!currentEntry) return null;

  const [currentPathPattern] = currentEntry;

  // Строим логическую цепочку крошек
  const chain: { path: BreadcrumbKey; label: string }[] = [];

  const buildChain = (path: BreadcrumbKey) => {
    const entry: Crumb | undefined = breadcrumbMap[path];
    if (!entry) return;

    // Ищем подходящего родителя по предыдущей локации или по текущему pathname
    const matchedParent = entry.parents?.find((p) =>
      state?.prevLocation
        ? matchPath({ path: p, end: false }, state.prevLocation)
        : matchPath({ path: p, end: false }, pathname)
    );

    if (matchedParent) buildChain(matchedParent);

    const label =
      typeof entry.label === "function"
        ? entry.label(params, state?.data ?? undefined)
        : entry.label;

    chain.push({ path, label });
  };

  buildChain(currentPathPattern);

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {chain.map((crumb, i) => {
          const isLast = i === chain.length - 1;
          const mergedParams = state?.prevParams
            ? {
                ...state.prevParams,
                ...params,
              }
            : params;
          const link = href(crumb.path as keyof PathParams, mergedParams);

          if (isMobile && chain.length > 2 && i < 1)
            return (
              <Fragment key={crumb.path}>
                <BreadcrumbEllipsis />
                <BreadcrumbSeparator />
              </Fragment>
            );

          return (
            <Fragment key={crumb.path}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="max-w-[20ch] md:max-w-full truncate">
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      to={link}
                      state={{
                        data: {
                          wishTitle: crumb.label,
                          wlTitle: crumb.label,
                        },
                      }}
                      className="max-w-[20ch] md:max-w-full truncate"
                    >
                      {crumb.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
