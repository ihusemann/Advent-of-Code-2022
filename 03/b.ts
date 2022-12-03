import { readFileSync } from "fs";
import _ from "lodash";

const input = readFileSync("03/input.txt", "utf-8");
const lines = input.split("\n");

const charScore = (input: string) => {
	return (
		input.toLowerCase().charCodeAt(0) -
		96 + // position in alphabet
		(input === input.toLowerCase() ? 0 : 26) // adds 26 if the char is uppercase
	);
};

const groups = _(lines).chunk(3);

const sum = groups.reduce((sum, group) => {
	const first = group[0].split("");
	const second = group[1].split("");
	const third = group[2].split("");

	return sum + charScore(_.intersection(first, second, third)[0]);
}, 0);

console.log("Total:", sum);
