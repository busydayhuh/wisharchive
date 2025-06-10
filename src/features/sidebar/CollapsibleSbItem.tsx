import { ROUTES } from "@/shared/model/routes";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui/kit/collapsible";
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/shared/ui/kit/sidebar";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { href, Link } from "react-router";
import useListSubset from "./model/useListSubset";

type CollapsibleSbItemProps = {
  name: string;
  icon: ReactNode;
};

function CollapsibleSbItem({ name, icon }: CollapsibleSbItemProps) {
  const { documentsList, isPending, error } = useListSubset();
  return (
    <Collapsible
      key={name}
      asChild
      defaultOpen={false}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={name} className="cursor-pointer">
            {icon}
            {name}
            {documentsList && (
              <SidebarMenuBadge className="relative bg-muted rounded-full ml-1">
                {documentsList.total}
              </SidebarMenuBadge>
            )}
            <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {isPending &&
              Array.from({ length: 5 }).map((_, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuSkeleton />
                </SidebarMenuItem>
              ))}
            {documentsList && documentsList.total === 0 && (
              <div className="text-muted-foreground">
                У вас пока нет списков
              </div>
            )}
            {documentsList &&
              documentsList.total > 0 &&
              documentsList.documents.map((subItem) => (
                <SidebarMenuSubItem key={subItem.$id}>
                  <SidebarMenuSubButton asChild>
                    <Link to={href(ROUTES.WISHLIST, { listId: subItem.$id })}>
                      <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            {error && <>{error.error_message}</>}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export default CollapsibleSbItem;
