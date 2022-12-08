import { readFileSync } from "fs";
import _ from "lodash";

const file = readFileSync("08/input.txt", "utf-8");

const trees = file.split("\n").map((line) => line.split("").map(Number));

const rowLength = trees.length;

// count starts with outer trees (perimeter - corners)
let count = 4 * rowLength - 4;

for (let i = 1; i < rowLength - 1; i++) {
	for (let j = 1; j < rowLength - 1; j++) {
		// generate array representing the trees in all cardinal directions
		const height = trees[i][j];
		const left = trees[i].slice(0, j);
		const right = trees[i].slice(j + 1);
		const up = trees.slice(0, i).map((row) => row[j]);
		const down = trees.slice(i + 1).map((row) => row[j]);

		if (
			height > Math.max(...left) ||
			height > Math.max(...right) ||
			height > Math.max(...up) ||
			height > Math.max(...down)
		) {
			count += 1;
		}
	}
}

console.log("Number of trees:", count);
