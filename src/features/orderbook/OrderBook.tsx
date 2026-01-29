import { useEffect, useRef, useState } from 'react';
import { useOrderBook } from '@/hooks/useOrderBook';
import { Level } from './types';
import { OrderBookSideView } from "./OrderBookSide";
import OrderBookWorker from './orderbook.worker?worker';

export default function OrderBook() {
  const { bids, asks } = useOrderBook();
  const [tick, setTick] = useState(0.01);

  const workerRef = useRef<Worker | null>(null);

  const [grouped, setGrouped] = useState<{
    bids: Level[];
    asks: Level[];
  }>({
    bids: [],
    asks: [],
  });

  useEffect(() => {
    workerRef.current = new OrderBookWorker();

    workerRef.current.onmessage = (e: MessageEvent) => {
      setGrouped({
        bids: e.data.groupedBids,
        asks: e.data.groupedAsks,
      });
    };

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  useEffect(() => {
    workerRef.current?.postMessage({ bids, asks, tick });
  }, [bids, asks, tick]);

return (
  <div className="orderbook">
    <select value={tick} onChange={(e) => setTick(+e.target.value)}>
      <option value={0.01}>0.01</option>
      <option value={0.1}>0.1</option>
      <option value={1}>1.0</option>
    </select>

    <div className="grid">
      <OrderBookSideView side="bids" levels={grouped.bids} />
      <OrderBookSideView side="asks" levels={grouped.asks} />
    </div>
  </div>
);
}
