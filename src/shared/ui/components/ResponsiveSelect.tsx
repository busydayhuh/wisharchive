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
import { useMemo } from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { cn } from "../../utils/css";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../kit/drawer";

export type Option = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  colors?: string;
  disabled?: boolean;
};

type ResponsiveSelectProps = {
  selectedValue?: string;
  onSelect: (value: string, additional?: { isPrivate: boolean }) => void;
  options: Option[];
  renderSelected?: (selected?: Option) => React.ReactNode;
  title?: string;
  renderOption?: (opt: Option, isSelected: boolean) => React.ReactNode;
  isLoading?: boolean;
  error?: Error;
  triggerClassName?: string;
  contentClassName?: string;
};

export function ResponsiveSelect({
  selectedValue,
  onSelect,
  options,
  renderSelected,
  renderOption,
  title = "Выбор",
  isLoading = false,
  error,
  triggerClassName,
  contentClassName,
}: ResponsiveSelectProps) {
  const isMobile = useIsMobile();

  const selectedOption = useMemo(
    () =>
      options.find((o) => o.value === selectedValue) ??
      options.find((o) => o.value === "none"),
    [options, selectedValue]
  );

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
        Загрузка…
      </Button>
    );
  }

  const renderOptionContent = (opt: Option) =>
    renderOption ? (
      renderOption(opt, opt.value === selectedValue)
    ) : (
      <span className="flex items-center gap-2">
        {opt.icon}
        {opt.label}
      </span>
    );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-between bg-secondary border-0 outline-0 w-fit font-normal",
              triggerClassName
            )}
          >
            {renderSelected ? (
              renderSelected(selectedOption)
            ) : (
              <span className="flex items-center gap-2 w-full">
                {selectedOption?.label ?? ""}
                <ChevronDown className="ms-auto size-3" />
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
                  variant={opt.value === selectedValue ? "secondary" : "ghost"}
                  disabled={opt.disabled}
                  onClick={() => onSelect(opt.value)}
                  className="justify-start py-6 font-normal"
                >
                  {renderOptionContent(opt)}
                  {opt.value === selectedValue && <Check className="ms-auto" />}
                </Button>
              </DrawerClose>
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Select onValueChange={onSelect} value={selectedValue}>
      <SelectTrigger className={cn("cursor-pointer", triggerClassName)}>
        <SelectValue>
          {renderSelected
            ? renderSelected(selectedOption)
            : selectedOption?.label ?? ""}
        </SelectValue>
      </SelectTrigger>
      <SelectContent
        align="center"
        className={cn(
          "bg-secondary max-h-[26rem] overflow-y-scroll",
          contentClassName
        )}
      >
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            disabled={opt.disabled}
            className="focus:bg-accent px-2.5 py-2 cursor-pointer"
          >
            {renderOptionContent(opt)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
