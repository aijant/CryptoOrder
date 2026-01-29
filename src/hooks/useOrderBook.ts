import { useEffect, useRef, useState } from "react";
import { BinaryDecoder } from "@/utils/BinaryDecoder";
import { Level } from "@/features/orderbook/types";

const WS_URL = "wss://stream.binance.com:9443/ws/btcusdt@depth";

export function useOrderBook() {
  const decoderRef = useRef(new BinaryDecoder());

  const wsRef = useRef<WebSocket | null>(null);
  const isMountedRef = useRef(false);

  const bufferRef = useRef<{ bids: Level[]; asks: Level[] }>({
    bids: [],
    asks: [],
  });

  const lastSeqRef = useRef<number | null>(null);

  const [snapshot, setSnapshot] = useState(bufferRef.current);
  const [drift, setDrift] = useState(false);

  useEffect(() => {
    if (isMountedRef.current) return;
    isMountedRef.current = true;

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onmessage = (e) => {
      const decoded = decoderRef.current.decode(JSON.parse(e.data));

      if (
        lastSeqRef.current !== null &&
        decoded.sequence !== lastSeqRef.current + 1
      ) {
        setDrift(true);
      }

      lastSeqRef.current = decoded.sequence;

      bufferRef.current = {
        bids: decoded.bids,
        asks: decoded.asks,
      };
    };

    const interval = setInterval(() => {
      setSnapshot(bufferRef.current);
    }, 100);

    return () => {
      clearInterval(interval);

      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }

      wsRef.current = null;
      isMountedRef.current = false;
    };
  }, []);

  return {
    bids: snapshot.bids,
    asks: snapshot.asks,
    drift,
  };
}
