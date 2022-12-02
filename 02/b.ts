import { readFileSync } from "fs";

const input = readFileSync("02/input.txt", "utf-8");
const lines = input.split("\n");

type TOutcome = {
	[key: string]: {
		[key: string]: number;
	};
};

const outcomeResults: TOutcome = {
	X: {
		// lose
		A: 3 + 0, // shape score + round score
		B: 1 + 0,
		C: 2 + 0,
	},
	Y: {
		// draw
		A: 1 + 3,
		B: 2 + 3,
		C: 3 + 3,
	},
	Z: {
		// win
		A: 2 + 6,
		B: 3 + 6,
		C: 1 + 6,
	},
};

/**
 * X: lose +0
 * Y: draw +3
 * Z: win +6
 */

const score = lines.reduce((score, line) => {
	const [opponent, outcome] = line.split(" ");

	return score + outcomeResults[outcome][opponent];
}, 0);

console.log("Round score: ", score);
