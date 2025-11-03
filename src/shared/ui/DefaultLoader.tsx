import { Loader2 } from "lucide-react";

export function DefaultLoader() {
  return (
    <div className="flex justify-center items-center w-full min-h-full">
      <Loader2 className="w-12 h-12 animate-spin" />
    </div>
  );
}

export default DefaultLoader;
