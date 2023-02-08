export interface Node {
	x: number;
	y: number;
  name: string;
}

export interface Connection {
  node1: number;
  node2: number;
  distance: number;
}
