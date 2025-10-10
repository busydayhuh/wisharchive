import * as React from "react";

import { Button } from "@/shared/ui/kit/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "../lib/css";
import { useIsMobile } from "../lib/react/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./kit/drawer";

type Option = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  colors?: string;
  disabled?: boolean;
  additional?: { isPrivate: boolean };
};

type ResponsiveSelectProps = {
  value?: string;
  onChange: (value: string, additional?: { isPrivate: boolean }) => void;
  options: Option[];
  triggerJSX?: React.ReactNode;
  title?: string;
  renderOption?: (opt: Option, isSelected: boolean) => React.ReactNode;
  isLoading?: boolean;
  error?: string;
  triggerCSS?: string;
  contentCSS?: string;
};

export function ResponsiveSelect({
  value,
  onChange,
  options,
  triggerJSX,
  title = "Выбор",
  renderOption,
  isLoading = false,
  error,
  triggerCSS,
  contentCSS,
}: ResponsiveSelectProps) {
  const isMobile = useIsMobile();
  const selected = options.find((o) => o.value === value);

  const optionsMap = Object.fromEntries(options.map((o) => [o.value, o]));

  if (error) {
    return (
      <div className="bg-red-50 p-2 rounded-lg text-red-500 text-sm">
        {error}
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
              "justify-between bg-secondary border-0 outline-0 w-full font-normal",
              triggerCSS
            )}
          >
            {triggerJSX ? (
              triggerJSX
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
                  variant={opt.value === value ? "default" : "ghost"}
                  disabled={opt.disabled}
                  onClick={() => {
                    return optionsMap[opt.value].additional
                      ? onChange(opt.value, opt.additional)
                      : onChange(opt.value);
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
        return optionsMap[value].additional
          ? onChange(value, optionsMap[value].additional)
          : onChange(value);
      }}
      value={value}
    >
      <SelectTrigger className={cn("shadow-none cursor-pointer", triggerCSS)}>
        <SelectValue>
          {triggerJSX ? triggerJSX : selected?.label ?? ""}
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        className={cn(
          "bg-secondary max-h-[26rem] overflow-y-scroll",
          contentCSS
        )}
      >
        {options.map((opt) => {
          if (opt.value === "none") {
            return (
              <React.Fragment key={opt.value}>
                <SelectItem
                  value={opt.value}
                  className="focus:bg-muted/50 py-1 cursor-pointer"
                  disabled={opt.disabled}
                >
                  <span className="flex items-center gap-2">
                    {opt.icon}
                    {opt.label}
                  </span>
                </SelectItem>

                <SelectSeparator />
              </React.Fragment>
            );
          }

          return (
            <SelectItem
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              className="focus:bg-muted/50 py-1 cursor-pointer"
            >
              {renderOption ? (
                renderOption(opt, opt.value === value)
              ) : (
                <span className="flex items-center gap-2 py-2 [&_svg:text-muted-foreground]">
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
