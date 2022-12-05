import { readFileSync } from "fs";

const generateStacks = (lines: string[], numCols: number) => {
	const stacks: string[][] = [];

	for (let i = 0; i < numCols; i++) {
		stacks.push([]);
	}

	lines.forEach((line) => {
		for (let i = 0; i < numCols; i++) {
			const char = line[i * 4 + 1];
			if (char !== " ") {
				stacks[i].push(char);
			}
		}
	});

	return stacks;
};

const rearrangeStacks = (moves: string[], stacks: string[][]) => {
	moves.forEach((move) => {
		const temp = move.split(" ");

		const count = +temp[1];
		const fromStack = +temp[3] - 1;
		const toStack = +temp[5] - 1;

		for (let i = 0; i < count; i++) {
			const char = stacks[fromStack].pop();
			if (char) {
				stacks[toStack].push(char);
			}
		}
	});
};

const input = readFileSync("05/example.txt", "utf-8");
const [stacksInput, movesInput] = input.split("\n\n");

// reverse input and remove column label line
const lines = stacksInput.split("\n").reverse().slice(1);
const numCols = Math.ceil(stacksInput.split("\n")[0].length / 4);

const stacks = generateStacks(lines, numCols);

const moves = movesInput.split("\n");
rearrangeStacks(moves, stacks);

console.log(stacks);

// get chars at the top of each stack
let output = "";
for (let i = 0; i < numCols; i++) {
	output += stacks[i].pop();
}

console.log("Top crates:", output);
