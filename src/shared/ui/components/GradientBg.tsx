import type { ReactNode } from "react";

function GradientBg(props: { children: ReactNode }) {
  return <div className="w-lvw h-lvh bg-violet-400">{props.children}</div>;
}

export default GradientBg;
