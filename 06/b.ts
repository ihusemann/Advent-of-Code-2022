import { readFileSync } from "fs";

const input = readFileSync("06/input.txt", "utf-8").split("");

const prev: string[] = [];

input.every((c, idx) => {
	if (prev.length < 14) {
		prev.push(c);
	} else {
		const set = new Set(prev);
		if (set.size == prev.length) {
			console.log("Start-of-message index:", idx);
			return false; // breaks out of .every() loop
		} else {
			prev.push(c);
			prev.shift();
		}
	}
	return true;
});
