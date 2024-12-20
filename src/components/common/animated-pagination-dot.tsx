import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type AnimatedPaginationDotProps = {
  dotCount: number;
  activeIndex: number;
  className?: string;
};

export default function AnimatedPaginationDot({ dotCount, activeIndex, className }: AnimatedPaginationDotProps) {
  const gap = 6;
  const dotSize = 8;
  const containerWidth = dotCount >= 5 ? 5 * dotSize + 4 * gap : dotCount * dotSize + (dotCount - 1) * gap;

  const [translateX, setTranslateX] = useState(0);
  const dotCountIndex = dotCount - 1;

  useEffect(() => {
    if (dotCountIndex <= 0) {
      return;
    }
    let translateValue;
    if (activeIndex > 2 && activeIndex < dotCountIndex - 1) {
      translateValue = (activeIndex - 2) * (dotSize + gap);
    }
    if (activeIndex <= 2) {
      translateValue = 0;
    }
    if (typeof translateValue !== "undefined") {
      setTranslateX(-translateValue);
    }
  }, [activeIndex, dotCountIndex, containerWidth]);

  if (dotCount <= 1) {
    return null;
  }
  const isActive = (index: number, activeIndex: number) => index === activeIndex;

  const isNeighbor = (index: number, activeIndex: number, dotCount: number) => {
    const distance = Math.abs(index - activeIndex);
    if (activeIndex === 0 || activeIndex === dotCount - 1) return distance <= 4;
    if (activeIndex === 1 || activeIndex === dotCount - 2) return distance <= 3;
    return distance <= 2;
  };

  const isVisible = (index: number, activeIndex: number, dotCount: number) => {
    return isActive(index, activeIndex) || isNeighbor(index, activeIndex, dotCount);
  };

  const isRecentNeighbor = (index: number, activeIndex: number, dotCount: number) => {
    const distance = Math.abs(index - activeIndex);
    return activeIndex === 0 || activeIndex === dotCount - 1 ? distance <= 2 : distance <= 1;
  };

  const should4thItemShrink = (index: number, activeIndex: number, dotCount: number) => {
    return (
      (activeIndex <= 2 || activeIndex >= dotCount - 3) &&
      ((index === 4 && activeIndex < 3) || (index === dotCount - 5 && activeIndex > 3))
    );
  };

  return (
    <div className={cn("overflow-hidden", className)} style={{ width: `${containerWidth}px` }}>
      <div
        className="flex shrink-0 items-center transition-transform duration-300"
        style={{ gap: `${gap}px`, transform: `translateX(${translateX}px)` }}
      >
        {Array.from({ length: dotCount }).map((_, index) => {
          const active = isActive(index, activeIndex);
          const visible = isVisible(index, activeIndex, dotCount);
          const recentNeighbor = isRecentNeighbor(index, activeIndex, dotCount);
          const shrink = should4thItemShrink(index, activeIndex, dotCount);
          return (
            <div
              key={index}
              style={{
                width: `${dotSize}px`,
                height: `${dotSize}px`,
              }}
              className="flex shrink-0 items-center justify-center"
            >
              <div
                className={cn("rounded-sm shrink-0 transition-all duration-300 size-[6px] opacity-60 bg-white", {
                  "size-2": active || recentNeighbor,
                  "size-1": shrink,
                  "opacity-100": active,
                  "opacity-0": !visible,
                  "scale-0": !visible,
                  "scale-100": visible,
                })}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
