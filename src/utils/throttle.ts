// src/utils/throttle.ts
export function throttle(fn: () => void, delay: number) {
  let last = 0;

  return () => {
    const now = performance.now();
    if (now - last >= delay) {
      last = now;
      fn();
    }
  };
}
