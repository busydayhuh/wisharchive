import * as React from "react";

import { Button } from "@/shared/ui/kit/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "../lib/css";
import { useIsMobile } from "../lib/react/useIsMobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./kit/drawer";

export type Option = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  colors?: string;
  disabled?: boolean;
  additional?: { ownerId: string };
};

type ResponsiveSelectProps = {
  value?: string;
  onChange: (value: string, additional?: { isPrivate: boolean }) => void;
  options: Option[];
  renderTrigger?: (selected?: Option) => React.ReactNode;
  title?: string;
  renderOption?: (opt: Option, isSelected: boolean) => React.ReactNode;
  isLoading?: boolean;
  error?: Error;
  triggerCSS?: string;
  contentCSS?: string;
};

export function ResponsiveSelect({
  value,
  onChange,
  options,
  renderTrigger,
  title = "Выбор",
  renderOption,
  isLoading = false,
  error,
  triggerCSS,
  contentCSS,
}: ResponsiveSelectProps) {
  const isMobile = useIsMobile();
  const selected =
    options.find((o) => o.value === value) ??
    options.find((o) => o.value === "none");

  if (error) {
    return (
      <div className="bg-red-50 p-2 rounded-lg text-red-500 text-sm">
        {error.message}
      </div>
    );
  }

  if (isLoading) {
    return (
      <Button
        variant="outline"
        disabled
        className="flex items-center gap-2 w-full"
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        Загрузка...
      </Button>
    );
  }

  // мобильная версия
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-between bg-secondary border-0 outline-0 w-fit font-normal",
              triggerCSS
            )}
          >
            {renderTrigger ? (
              renderTrigger(selected)
            ) : (
              <span className="flex justify-between items-center gap-2 w-full">
                {selected?.label ?? ""}
                <ChevronDown className="size-3" />
              </span>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="rounded-t-2xl w-full">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col">
            {options.map((opt) => (
              <DrawerClose asChild key={opt.value}>
                <Button
                  variant={opt.value === value ? "secondary" : "ghost"}
                  disabled={opt.disabled}
                  onClick={() => {
                    return onChange(opt.value);
                  }}
                  className="justify-start py-6 font-normal"
                >
                  {renderOption ? (
                    renderOption(opt, opt.value === value)
                  ) : (
                    <span className="flex items-center gap-2">
                      {opt.icon}
                      {opt.label}
                    </span>
                  )}
                  {opt.value === value && <Check className="ms-auto" />}
                </Button>
              </DrawerClose>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // десктоп
  return (
    <Select
      onValueChange={(value: string) => {
        return onChange(value);
      }}
      value={value}
    >
      <SelectTrigger className={cn("cursor-pointer", triggerCSS)}>
        <SelectValue>
          {renderTrigger ? renderTrigger(selected) : selected?.label ?? ""}
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        align="end"
        className={cn(
          "bg-secondary max-h-[26rem] overflow-y-scroll",
          contentCSS
        )}
      >
        {options.map((opt) => {
          if (opt.value === "none") {
            return (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="focus:bg-accent px-2.5 py-2 cursor-pointer"
                disabled={opt.disabled}
              >
                <span className="flex items-center gap-2">
                  {opt.icon}
                  {opt.label}
                </span>
              </SelectItem>
            );
          }

          return (
            <SelectItem
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              className="focus:bg-accent px-2.5 py-2 cursor-pointer"
            >
              {renderOption ? (
                renderOption(opt, opt.value === value)
              ) : (
                <span className="flex items-center gap-2 [&_svg:text-muted-foreground]">
                  {opt.icon}
                  {opt.label}
                </span>
              )}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
