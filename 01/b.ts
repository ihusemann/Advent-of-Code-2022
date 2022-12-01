import { readFileSync, readFile } from "fs";

const input = readFileSync("01/input.txt", "utf-8");
const line = input.split("\n");

const totals: number[] = [];
let curr = 0;

line.forEach((el) => {
	if (el === "") {
		totals.push(curr);
		curr = 0;
	} else {
		curr = curr + +el;
	}
});

// any remaining in curr
totals.push(curr);

const top3 = totals.sort((a, b) => b - a).slice(0, 3);

const sum = top3.reduce((sum, el) => sum + el, 0);

console.log(sum);
