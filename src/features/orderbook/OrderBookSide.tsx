import { Level, OrderBookSide } from "./types";

export function OrderBookSideView({
  side,
  levels,
}: {
  side: OrderBookSide;
  levels: Level[];
}) {
  const max = Math.max(...levels.map((l) => l.amount), 1);

  return (
    <div className="side">
      <h1>{side}</h1>
      {levels.map((l) => (
        <div key={l.price} className="row">
          <div
            className={`bar ${side}`}
            style={{ width: `${(l.amount / max) * 100}%` }}
          />
          <span>{l.price.toFixed(2)}</span>
          <span>{l.amount.toFixed(4)}</span>
        </div>
      ))}
    </div>
  );
}
