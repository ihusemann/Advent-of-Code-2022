import { readFileSync, readFile } from "fs";

const input = readFileSync("01/input.txt", "utf-8");
const line = input.split("\n");

let max = 0;
let curr = 0;

line.forEach((el) => {
	if (el === "") {
		max = Math.max(max, curr);
		curr = 0;
	} else {
		curr = curr + +el;
	}
});

console.log(max);
