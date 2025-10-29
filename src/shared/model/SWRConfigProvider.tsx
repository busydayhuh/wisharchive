import { SWRConfig } from "swr";

export function SWRConfigProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        dedupingInterval: 60 * 60 * 1000, // 1 час — не рефетчит, если данные уже есть
        focusThrottleInterval: 0,
        errorRetryCount: 0,
        revalidateIfStale: false,

        provider: () => new Map(), // изоляция от hot reload
      }}
    >
      {children}
    </SWRConfig>
  );
}
