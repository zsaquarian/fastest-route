<script lang="ts">
	import P5, { type Sketch } from 'p5-svelte';
  import type { Connection, Node } from './node';

	export let nodes: Node[];
	export let connections: Connection[];
  export let selectedPath: number[];

  let width: number, height: number;
  let w: number;

	const sketch: Sketch = (p5) => {
		p5.setup = () => {
			p5.createCanvas(width * 3 / 4, width * 3 / 4 * 9 / 16);
      w = p5.width / 16;
		};

		p5.draw = () => {
			p5.background(3, 0, 28);

      connections.forEach(({ node1, node2, distance }) => {
        const x1 = nodes[node1].x * w;
        const y1 = nodes[node1].y * w;
        const x2 = nodes[node2].x * w;
        const y2 = nodes[node2].y * w;

        if (Math.abs(selectedPath.indexOf(node1) - selectedPath.indexOf(node2)) === 1) {
          p5.stroke(91, 143, 185);
        } else {
          p5.stroke(48, 30, 103);
        }
 
        p5.line(x1, y1, x2, y2);
        p5.stroke(3, 0, 28);
        p5.fill(182, 234, 218);
        p5.text(distance, (x1 + x2) / 2, (y1 + y2) / 2);
      });

			nodes.forEach(({ x, y, name }, i) => {
        p5.stroke(182, 234, 218);
        p5.fill(91, 143, 185);
        p5.strokeWeight(5);
				p5.circle(x * w, y * w, w / 2);
        p5.stroke(3, 0, 28);
        p5.fill(182, 234, 218);
        p5.text(name, x * w, y * w);
			});
		};
	};
</script>

<svelte:window bind:innerWidth={width} />

<P5 {sketch} />
