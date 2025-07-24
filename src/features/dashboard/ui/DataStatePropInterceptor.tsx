import { Slot } from "@radix-ui/react-slot";
import type { ComponentProps, ElementType } from "react";
import { forwardRef } from "react";

const DataStatePropInterceptor = forwardRef<
  HTMLElement,
  ComponentProps<ElementType>
>((props, ref) => {
  const { "data-state": dataState, children, ...rest } = props;
  if (dataState) {
    return (
      <span data-state={dataState}>
        <Slot {...rest} ref={ref}>
          {children}
        </Slot>
      </span>
    );
  }
  return (
    <Slot {...rest} ref={ref}>
      {children}
    </Slot>
  );
});

export default DataStatePropInterceptor;
