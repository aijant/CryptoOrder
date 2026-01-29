import { groupByTick } from "./groupByTick";

test("groups levels by tick size", () => {
  const input = [
    { price: 100.01, volume: 1 },
    { price: 100.02, volume: 2 },
  ];

  expect(groupByTick(input, 0.1)).toEqual([{ price: 100.0, volume: 3 }]);
});
