import { useEffect, useRef } from 'react';
import { Level } from './types';


export function DepthCanvas({
bids,
asks
}: {
bids: Level[];
asks: Level[];
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const max = Math.max(
      ...bids.map((b) => b.amount),
      ...asks.map((a) => a.amount),
      1,
    );

    bids.forEach((b, i) => {
      ctx.fillStyle = "rgba(0,255,0,0.2)";
      ctx.fillRect(0, i * 20, ((b.amount / max) * canvas.width) / 2, 18);
    });

    asks.forEach((a, i) => {
      ctx.fillStyle = "rgba(255,0,0,0.2)";
      ctx.fillRect(
        canvas.width / 2,
        i * 20,
        ((a.amount / max) * canvas.width) / 2,
        18,
      );
    });
  }, [bids, asks]);

  return <canvas ref={ref} width={600} height={300} className="canvas" />;
}