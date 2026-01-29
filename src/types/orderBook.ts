export interface OrderLevel {
  price: number;
  volume: number;
}

export interface OrderBookData {
  bids: OrderLevel[];
  asks: OrderLevel[];
}

export type OrderBookSide = "bids" | "asks";