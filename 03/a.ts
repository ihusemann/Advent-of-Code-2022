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

const sum = lines.reduce((sum, line) => {
	const len = line.length;

	const first = line.slice(0, Math.ceil(len / 2)).split("");
	const second = line.slice(Math.ceil(len / 2)).split("");

	const duplicate = _.intersection(first, second)[0];

	return sum + charScore(duplicate);
}, 0);

console.log("Total:", sum);
