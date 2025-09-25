import "@/shared/assets/custom.css";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/css";

function ExpandableText({
  text,
  lines = 5,
  className,
}: {
  text: string;
  lines?: number;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && containerRef.current) {
      const fullHeight = contentRef.current.scrollHeight;
      const lineHeight = parseFloat(
        getComputedStyle(contentRef.current).lineHeight
      );
      const maxHeight = lineHeight * lines;

      setShowButton(fullHeight > maxHeight);

      if (!expanded) {
        containerRef.current.style.height = `${
          fullHeight > maxHeight ? maxHeight : fullHeight
        }px`;
      } else {
        containerRef.current.style.height = `${fullHeight}px`;
      }
    }
  }, [expanded, text, lines]);

  const toggle = () => {
    if (!containerRef.current || !contentRef.current) return;

    const fullHeight = contentRef.current.scrollHeight;
    const lineHeight = parseFloat(
      getComputedStyle(contentRef.current).lineHeight
    );
    const maxHeight = lineHeight * lines;

    containerRef.current.style.height = expanded
      ? `${maxHeight}px`
      : `${fullHeight}px`;

    setExpanded(!expanded);
  };

  return (
    <div className="space-y-1">
      <div
        ref={containerRef}
        className="overflow-hidden transition-[height] duration-300 ease-in-out"
      >
        <div
          ref={contentRef}
          className={cn(
            "text-sm",
            !expanded && showButton && "text-mask",
            className
          )}
        >
          {text}
        </div>
      </div>

      {showButton && (
        <button
          type="button"
          onClick={toggle}
          className="font-medium text-muted-foreground text-sm cursor-pointer"
          aria-label={expanded ? "свернуть описание" : "показать больше"}
        >
          {expanded ? "- скрыть" : "+ показать больше"}
        </button>
      )}
    </div>
  );
}

export default ExpandableText;
