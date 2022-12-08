import { readFileSync } from "fs";
import _ from "lodash";

const file = readFileSync("08/input.txt", "utf-8");

const trees = file.split("\n").map((line) => line.split("").map(Number));

const rowLength = trees.length;

let maxScenicScore = 0;

for (let i = 1; i < rowLength - 1; i++) {
	for (let j = 1; j < rowLength - 1; j++) {
		// generate array representing the trees in all cardinal directions
		const height = trees[i][j];

		const left = trees[i].slice(0, j).reverse();
		const right = trees[i].slice(j + 1);
		const up = trees
			.slice(0, i)
			.map((row) => row[j])
			.reverse();
		const down = trees.slice(i + 1).map((row) => row[j]);

		// if count is 0, no taller trees were found, so all the trees in that direction are visible
		const leftCount = _(left).findIndex((h) => h >= height) + 1;
		const visibleLeft = leftCount ? leftCount : left.length;

		const rightCount = _(right).findIndex((h) => h >= height) + 1;
		const visibleRight = rightCount ? rightCount : right.length;

		const upCount = _(up).findIndex((h) => h >= height) + 1;
		const visibleUp = upCount ? upCount : up.length;

		const downCount = _(down).findIndex((h) => h >= height) + 1;
		const visibleDown = downCount ? downCount : down.length;

		maxScenicScore = Math.max(
			maxScenicScore,
			visibleLeft * visibleRight * visibleUp * visibleDown
		);
	}
}

console.log("Maximum scenic score:", maxScenicScore);
