import { Level } from "./types";

export function groupByTick(levels: Level[], tick: number): Level[] {
  const map = new Map<number, number>();

  for (const l of levels) {
    const price = Math.floor(l.price / tick) * tick;
    map.set(price, (map.get(price) ?? 0) + l.amount);
  }

  return Array.from(map.entries())
    .map(([price, amount]) => ({ price, amount }))
    .sort((a, b) => b.price - a.price);
}
