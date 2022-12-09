import { readFileSync } from "fs";
import _, { concat } from "lodash";

const file = readFileSync("09/input.txt", "utf-8");
const moves = file.split("\n");

const visited = new Set<string>();
const knots = Array(10).fill([0, 0]);

type Position = number[];
type Direction = "U" | "L" | "R" | "D";

const movePos = (dir: Direction, [x, y]: Position) => {
	switch (dir) {
		case "U":
			return [x, y + 1];

		case "L":
			return [x - 1, y];

		case "R":
			return [x + 1, y];

		case "D":
			return [x, y - 1];
	}
};

// if the prior knot is any further than 1 diagonal, calculate
// the move for the current knot
const calcDelta = ([hx, hy]: Position, [tx, ty]: Position) => {
	const dist = Math.pow(hx - tx, 2) + Math.pow(hy - ty, 2);

	if (dist > 2) {
		const delta = [
			(hx - tx) / Math.abs(hx - tx) || 0,
			(hy - ty) / Math.abs(hy - ty) || 0,
		];

		return delta;
	}
	return [0, 0];
};

moves.forEach((move) => {
	const [direction, count] = move.split(" ");

	// move head (knots[0])
	// loop through knots[1-tail] & update as needed

	for (let i = 0; i < +count; i++) {
		knots[0] = movePos(direction as Direction, knots[0]);

		for (let j = 1; j < knots.length; j++) {
			const [dx, dy] = calcDelta(knots[j - 1], knots[j]);
			knots[j] = [knots[j][0] + dx, knots[j][1] + dy];
		}

		visited.add(knots.at(-1).join(","));
	}
});

console.log("Tail visited:", visited.size);
