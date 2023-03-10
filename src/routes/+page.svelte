<script lang="ts">
	import Graph from '../lib/components/Graph.svelte';
	import type { Node, Connection } from '../lib/components/node';
	import { type Delivery, Fragility } from '../lib/delivery';
	import { dijkstra } from '../lib/dijkstra';
	import { bestTruck, type Truck } from '../lib/truck';

	const nodes: Node[] = [
		{ x: 7, y: 5, name: 'Hoodi' },
		{ x: 8, y: 1, name: 'KR Puram' },
		{ x: 1, y: 2, name: 'Brookefield' },
		{ x: 5, y: 3, name: 'Indiranagar' },
		{ x: 4, y: 5, name: 'MG Road' },
		{ x: 5, y: 1, name: 'Koramangala' }
	];

  const connections: Connection[] = [
    { node1: 2, node2: 3, distance: 100 },
    { node1: 3, node2: 1, distance: 70 },
    { node1: 3, node2: 0, distance: 60 },
    { node1: 0, node2: 5, distance: 30 },
    { node1: 1, node2: 5, distance: 15 },
    { node1: 0, node2: 1, distance: 30 },
    { node1: 3, node2: 4, distance: 50 },
  ];

  const trucks: Truck[] = [
    { capacity: 50, speed: 75 },
    { capacity: 25, speed: 20 },
    { capacity: 100, speed: 100 },
  ];

  let newFrom: string;
  let newTo: string;
  let newWeight: number;
  let newFragility: Fragility;

  let deliveries: Delivery[] = [];

  const paths: number[][] = [];
  const distances: number[] = [];
  const bestTrucks = [];

  let selectedPath: number[] = [];
</script>

<style>
  .in {
    @apply bg-gray-100 p-2 rounded-md mx-2;
  }
</style>

<div class="flex m-2">
  <div class="flex flex-col">
    <h2 class="text-center text-2xl">Add new route</h2>
    <form class="flex justify-start mb-2" on:submit|preventDefault={() => {
      let fromLocation = nodes.findIndex((val) => val.name === newFrom);
      let toLocation = nodes.findIndex((val) => val.name === newTo);

      deliveries = [...deliveries, {
        from: fromLocation,
        to: toLocation,
        fragility: newFragility,
        weight: newWeight
      }];

      newFrom = '';
      newTo = '';
      newWeight = 0;

      const dijkstraResult = dijkstra(nodes, connections, fromLocation, toLocation)

      paths.push(dijkstraResult.path);
      distances.push(dijkstraResult.distance);

      bestTrucks.push(bestTruck(trucks, deliveries[deliveries.length - 1], distances[distances.length - 1]));
    }}>
      <input class="in" placeholder="From" type="text" bind:value={newFrom}>
      <input class="in" placeholder="To" type="text" bind:value={newTo}>
      <input class="in" placeholder="Weight" type="number" bind:value={newWeight}>
      <select class="in" bind:value={newFragility}>
        <option value={Fragility.NotFragile}>Not Fragile</option>
        <option value={Fragility.Fragile}>Fragile</option>
        <option value={Fragility.VeryFragile}>Very Fragile</option>
      </select>
      <button type="submit" class="ml-auto rounded-md p-2 bg-green-600 text-white">Add</button>
    </form>
    <Graph {nodes} {connections} {selectedPath} />
  </div>
  <div class="border-transparent border-l-gray-500 rounded-md border-4 border-solid ml-4 flex flex-col w-full">
    <h2 class="text-center text-2xl">Daily route list</h2>
    <ul>
      {#each deliveries as { from, to, fragility, weight }, i}
        <li class="bg-gray-200 m-2 rounded-md p-2" on:click={() => {
          selectedPath = paths[i];
        }}>
          <p>From: {nodes[from].name}</p>
          <p>To: {nodes[to].name}</p>
          <p>Weight: {weight} kg</p>
          <p>Fragility: {Fragility[fragility]}</p>
          <p>Distance: {distances[i]} km</p>
          <p>Truck: {bestTrucks[i].bestTruck + 1}</p>
          <p>Time: {bestTrucks[i].time} h</p>
        </li>
      {/each}
    </ul>
    <div class="mt-auto">
      <h2 class="text-center text-2xl">Knowledge base</h2>
      <table class="w-full">
        <thead><td>Number</td><td>Speed</td><td>Capacity</td></thead>
        {#each trucks as { speed, capacity }, i} 
          <tr class:bg-gray-200={i % 2 === 0} class:bg-gray-100={i % 2 === 1}>
            <td>{i + 1}</td> 
            <td>{speed}</td>
            <td>{capacity}</td>
          </tr>
        {/each}
      </table>
    </div>
  </div>
</div>
