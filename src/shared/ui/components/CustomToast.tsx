"use client";

import { cn } from "@/shared/utils/css";
import { toast as sonnerToast } from "sonner";
import { Button } from "../kit/button";

export function customToast(toast: Omit<ToastProps, "id">) {
  return sonnerToast.custom((id) => (
    <CustomToast
      id={id}
      icon={toast.icon}
      title={toast.title}
      description={toast.description}
      button={
        toast.button
          ? {
              label: toast.button.label,
              onClick: toast.button.onClick,
            }
          : undefined
      }
    />
  ));
}

function CustomToast(props: ToastProps) {
  const { title, description, button, id, icon } = props;

  return (
    <div
      className={cn(
        "flex items-center gap-4 bg-primary p-4 pr-8 rounded-md w-full md:w-sm text-primary-foreground",
        !!button && "md:w-md"
      )}
    >
      <div className="rounded-sm size-12 overflow-hidden shrink-0 grow-0">
        {icon ? (
          <img
            src={icon}
            className="bg-muted w-full h-full object-cover"
            alt="Image"
          />
        ) : (
          <div className="flex justify-center items-center bg-muted size-12">
            ✨
          </div>
        )}
      </div>
      <div className="flex flex-col w-[60%]">
        <p className="font-semibold text-sm md:text-base line-clamp-1">
          {title}
        </p>
        <p className="font-medium text-xs ms:text-sm line-clamp-1">
          {description}
        </p>
      </div>

      {button && (
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            if (button.onClick) button.onClick();
            sonnerToast.dismiss(id);
          }}
        >
          {button.label}
        </Button>
      )}
    </div>
  );
}

export interface ToastProps {
  id: string | number;
  title: string;
  description?: string;
  icon?: string;
  button?: {
    label?: string;
    onClick?: () => void;
  };
}
