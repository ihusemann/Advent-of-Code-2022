import { readFileSync } from "fs";
import _, { concat } from "lodash";

const file = readFileSync("09/input.txt", "utf-8");
const moves = file.split("\n");

const visited = new Set<string>();

let tPos = [0, 0];
let hPos = [0, 0];

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

	for (let i = 0; i < +count; i++) {
		hPos = movePos(direction as Direction, hPos);

		const [dx, dy] = calcDelta(hPos, tPos);
		tPos = [tPos[0] + dx, tPos[1] + dy];
		visited.add(tPos.join(","));
	}
});

console.log("Tail visited:", visited.size);
