import { groupByTick } from "./groupByTick";
import { Level } from "./types";

self.onmessage = (e: MessageEvent) => {
  const { bids, asks, tick } = e.data as {
    bids: Level[];
    asks: Level[];
    tick: number;
  };

  const groupedBids = groupByTick(bids, tick).slice(0, 15);
  const groupedAsks = groupByTick(asks, tick).slice(0, 15);

  self.postMessage({ groupedBids, groupedAsks });
};
