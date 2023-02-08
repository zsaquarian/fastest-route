import { Fragility, type Delivery } from "./delivery";

export interface Truck {
  speed: number;
  capacity: number;
}

export const bestTruck = (trucks: Truck[], delivery: Delivery, distance: number): { time: number, bestTruck: number } => {
  const score = Array(trucks.length).fill(0);

  trucks = trucks.filter((val) => delivery.weight < val.capacity);

  if (delivery.fragility === Fragility.VeryFragile || delivery.fragility === Fragility.Fragile) {
    trucks.forEach((val, i) => {
      score[i] += 100 - val.speed;
    })
  } else {
    trucks.forEach((val, i) => {
      score[i] += val.speed;
    })
  }

  const bestTruck = score.indexOf(Math.max(...score));
  return { bestTruck, time: distance / trucks[bestTruck].speed };
}
