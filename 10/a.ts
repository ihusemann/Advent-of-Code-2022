import { readFileSync } from "fs";

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

const mainCycles = [20, 60, 100, 140, 180, 220];

console.log(
	"Signal strength sum:",
	mainCycles.reduce((sum, cycle) => {
		return sum + cycles[cycle] * cycle;
	}, 0)
);
