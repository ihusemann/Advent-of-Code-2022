import { readFileSync } from "fs";

const file = readFileSync("12/input.txt", "utf-8");

const map = file.split("").filter((el) => el !== "\n");
const row = file.split("\n")[0].length;

// up, right, down, left
const findNeighbors = (idx: number): number[] => {
	const up = idx < row ? undefined : idx - row;
	const right = (idx + 1) % row === 0 ? undefined : idx + 1;
	const down = idx >= map.length - row ? undefined : idx + row;
	const left = idx % row === 0 ? undefined : idx - 1;

	return [up, right, down, left].filter((el) => el !== undefined) as number[];
};

const canClimb = (currIdx: number, nextIdx: number) => {
	if (map[currIdx] === "E") return true;

	if (map[currIdx] === "S") {
		return map[nextIdx].charCodeAt(0) - "a".charCodeAt(0) <= 1;
	}

	if (map[nextIdx] === "E") {
		return "z".charCodeAt(0) - map[currIdx].charCodeAt(0) <= 1;
	}
	return map[nextIdx].charCodeAt(0) - map[currIdx].charCodeAt(0) <= 1;
};

const visited: boolean[] = Array(map.length).fill(false);
const distanceFromRoot: number[] = Array(map.length).fill(Infinity);

const lengthToGoal = (rootIdx: number) => {
	const queue: number[] = [];

	distanceFromRoot[rootIdx] = 0;
	queue.push(rootIdx);

	while (queue.length) {
		const idx = queue.shift()!;

		if (!visited[idx]) {
			if (map[idx] == "E") {
				console.log("Done", distanceFromRoot[idx]);
				return distanceFromRoot[idx];
			}

			visited[idx] = true;
			const neighbors = findNeighbors(idx);
			const currDistance = distanceFromRoot[idx];

			neighbors.forEach((neighborIdx) => {
				if (!visited[neighborIdx] && canClimb(idx, neighborIdx)) {
					distanceFromRoot[neighborIdx] = currDistance + 1;
					queue.push(neighborIdx);
				}
			});
		}
	}
};

const rootIdx = map.findIndex((el) => el === "S");

lengthToGoal(rootIdx);
