import { SWRConfig } from "swr";

const isProd = import.meta.env.PROD;

const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
  dedupingInterval: 10 * 60 * 1000,
  revalidateOnMount: false,
  errorRetryCount: 0,
  revalidateIfStale: false,
};

const devConfig = {
  ...swrConfig,
  provider: () => new Map(),
  dedupingInterval: 60 * 60 * 1000,
};

export function SWRConfigProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig value={isProd ? swrConfig : devConfig}>{children}</SWRConfig>
  );
}
