export enum Fragility {
  NotFragile,
  Fragile,
  VeryFragile
}

export interface Delivery {
  from: number;
  to: number;
  weight: number;
  fragility: Fragility;
}
