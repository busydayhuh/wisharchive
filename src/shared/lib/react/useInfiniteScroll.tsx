import { useEffect } from "react";

type UseInfiniteScrollOptions = {
  loadMore: () => void;
  disabled?: boolean;
  offset?: number; // отступ от низа страницы
};

export function useInfiniteScroll({
  loadMore,
  disabled = false,
  offset = 0,
}: UseInfiniteScrollOptions) {
  useEffect(() => {
    if (disabled) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.offsetHeight;

      if (windowHeight + scrollY >= fullHeight - offset) {
        console.log("скроллит");
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore, disabled, offset]);
}
