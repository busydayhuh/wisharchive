import * as React from "react";

import { Button } from "@/shared/ui/kit/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select";
import { ChevronDown, Loader2 } from "lucide-react";
import { cn } from "../lib/css";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./kit/drawer";
import { useSidebar } from "./kit/sidebar";

type Option = {
  value: string;
  label: string;
  icon?: React.ReactNode;
};

type ResponsiveSelectProps = {
  value?: string;
  onChange: (value: string) => void;
  options: Option[];
  triggerText?: React.ReactNode;
  title?: string;
  renderOption?: (opt: Option, isSelected: boolean) => React.ReactNode;
  isLoading?: boolean;
  error?: string;
  className?: string;
};

export function ResponsiveSelect({
  value,
  onChange,
  options,
  triggerText,
  title = "Выбор",
  renderOption,
  isLoading = false,
  error,
  className,
}: ResponsiveSelectProps) {
  const { isMobile } = useSidebar();
  const selected = options.find((o) => o.value === value);

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
              "justify-between border border-ring/60 outline-1 outline-input w-full font-normal",
              className
            )}
          >
            {triggerText ? (
              <span className="flex justify-between items-center gap-2 w-full">
                {triggerText}
                <ChevronDown className="size-3" />
              </span>
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
            <DrawerTitle className="sr-only">{title}</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col">
            {options.map((opt) => (
              <DrawerClose asChild key={opt.value}>
                <Button
                  variant={opt.value === value ? "default" : "ghost"}
                  onClick={() => onChange(opt.value)}
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
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger className={cn("text-sm md:text-base", className)}>
        <SelectValue>
          {triggerText ? triggerText : selected?.label ?? ""}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-[14rem] overflow-y-scroll selection-menu">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {renderOption ? (
              renderOption(opt, opt.value === value)
            ) : (
              <span className="flex items-center gap-2">
                {opt.icon}
                {opt.label}
              </span>
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
