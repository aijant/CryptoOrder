interface Level {
  price: number;
  amount: number;
}

export class OrderBookBuffer {
  bids = new Map<number, number>();
  asks = new Map<number, number>();
  lastSequence = 0;

  apply(data: { bids: Level[]; asks: Level[]; sequence: number }) {
    data.bids.forEach(({ price, amount }) => {
      amount === 0 ? this.bids.delete(price) : this.bids.set(price, amount);
    });

    data.asks.forEach(({ price, amount }) => {
      amount === 0 ? this.asks.delete(price) : this.asks.set(price, amount);
    });

    this.lastSequence = data.sequence;
  }
}
