import { SWRConfig } from "swr";

const isProd = import.meta.env.PROD;
const prodSWR = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
  dedupingInterval: 10 * 60 * 1000, // 10 минут
  focusThrottleInterval: 0,
  errorRetryCount: 0,
  revalidateIfStale: false,
};
const devSWR = {
  ...prodSWR,
  dedupingInterval: 60 * 60 * 1000, // 1 час
  provider: () => new Map(),
};

export function SWRConfigProvider({ children }: { children: React.ReactNode }) {
  return <SWRConfig value={isProd ? prodSWR : devSWR}>{children}</SWRConfig>;
}
