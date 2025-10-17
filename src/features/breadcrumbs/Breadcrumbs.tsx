import type { PathParams } from "@/shared/model/routes";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/kit/breadcrumb";
import { href, Link, matchPath } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { breadcrumbMap, type Crumb } from "./breadcrumbMap";
import { useRoute } from "./model/createRouteContext";

type BreadcrumbKey = keyof typeof breadcrumbMap;

export function Breadcrumbs() {
  const { location, params } = useRoute();
  const { pathname, state } = location;

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
    <Breadcrumb>
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

          return (
            <Fragment key={crumb.path}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={link}>{crumb.label}</Link>
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
