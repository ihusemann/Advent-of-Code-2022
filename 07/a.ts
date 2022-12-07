import { readFileSync } from "fs";

const file = readFileSync("07/input.txt", "utf-8");

const lines = file.split("\n");

const stack: string[] = [];
const sizes: { [key: string]: number } = {};

lines.forEach((line) => {
	const [a, b, c] = line.split(" ");
	if (b === "cd") {
		if (c === "..") {
			stack.pop();
		} else {
			stack.push(c);

			// add full filepath of current file or directory to sizes
			const path = stack.join("-");
			sizes[path] = 0;
		}
	} else if (b === "ls") {
		// do nothing
	} else {
		const size = a === "dir" ? 0 : +a;

		const dirPaths: string[] = [];

		// add the size of the current file to every parent directory
		stack.forEach((dir) => {
			dirPaths.push(dir);
			const path = dirPaths.join("-");
			sizes[path] += size;
		});
	}
});

const directorySizes = Object.values(sizes);

console.log(
	"Part 1:",
	directorySizes
		.filter((size) => size < 100000)
		.reduce((sum, el) => sum + el, 0)
);

const spaceUsed = Math.max(...directorySizes);
const spaceUnused = 70000000 - spaceUsed;
const spaceNeeded = 30000000 - spaceUnused;

console.log(
	"Part 2:",
	directorySizes.filter((size) => size > spaceNeeded).sort((a, b) => a - b)[0]
);
