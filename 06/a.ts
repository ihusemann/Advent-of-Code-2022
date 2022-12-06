import { readFileSync } from "fs";

const input = readFileSync("06/input.txt", "utf-8").split("");

const lastFour: string[] = [];

input.every((c, idx) => {
	if (lastFour.length < 4) {
		lastFour.push(c);
	} else {
		const set = new Set(lastFour);
		if (set.size == lastFour.length) {
			console.log("Start-of-packet index:", idx);
			return false; // breaks out of .every() loop
		} else {
			lastFour.push(c);
			lastFour.shift();
		}
	}
	return true;
});
