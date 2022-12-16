import { readFileSync } from "fs";
import _ from "lodash";

const file = readFileSync("10/input.txt", "utf-8");

const lines = file.split("\n");

let X = 1;
const cycles: { [key: number]: number } = {};
let cycle = 0;

lines.forEach((line) => {
	const [instruction, value] = line.split(" ");

	if (instruction === "noop") {
		cycle += 1;
		cycles[cycle] = X;
	} else {
		for (let i = 0; i < 2; i++) {
			cycle += 1;
			cycles[cycle] = X;
		}
		X += +value;
	}
});

const screen: string[] = [];

for (let i = 0; i < 240; i++) {
	if (i % 40 >= cycles[i + 1] - 1 && i % 40 <= cycles[i + 1] + 1) {
		screen.push("#");
	} else {
		screen.push(".");
	}
}

_.chunk(screen, 40).forEach((line) => {
	console.log(line.join(""));
});
