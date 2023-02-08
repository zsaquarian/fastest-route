import type { Node, Connection } from './components/node'

export const dijkstra = (nodes: Node[], connections: Connection[], start: number, end: number): { path: number[], distance: number } => {
  const distance = Array(nodes.length).fill(Infinity);
  const previous = Array(nodes.length);
  const unvisited = [...Array(nodes.length).keys()];

  distance[start] = 0;

  while (unvisited.length > 0) {
    const unvisitedDistance = unvisited.map((val) => distance[val]);
    const u = unvisited[unvisitedDistance.indexOf(Math.min(...unvisitedDistance))];
    console.log(unvisitedDistance, u);

    unvisited.splice(unvisited.indexOf(u), 1);

    const uConnections = connections.filter((val) => val.node1 === u || val.node2 === u);
    // console.log(u, uConnections);
    uConnections.forEach(val => {
      const otherNode = val.node1 === u ? val.node2 : val.node1;
      if (!unvisited.includes(otherNode)) return;

      const alt = distance[u] + val.distance;
      console.log(u, otherNode, alt);

      if (alt < distance[otherNode]) {
        distance[otherNode] = alt;
        previous[otherNode] = u;
      }
    });

    console.log(distance, previous, unvisited);
  }

  const S = [];

  let u = end;

  while (u !== undefined) {
    S.unshift(u);
    u = previous[u];
  }

  return { path: S, distance: distance[end] };
}
