import { useEffect, useState } from "react";

export function useAutoCarousel<T>(
  items: T[],
  intervalTime: number,
  transitionDuration: number
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setNextIndex((nextIndex + 1) % items.length);
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setIsTransitioning(false);
      }, transitionDuration);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [items.length, nextIndex, intervalTime, transitionDuration]);

  return {
    currentItem: items[currentIndex],
    nextItem: items[nextIndex],
    isTransitioning,
    currentIndex,
    nextIndex,
  };
}
