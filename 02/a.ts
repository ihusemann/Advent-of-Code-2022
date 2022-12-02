import { readFileSync } from "fs";

const input = readFileSync("02/input.txt", "utf-8");
const lines = input.split("\n");

const shapeScore = (shape: string) => {
	if (shape === "X") {
		// rock
		return 1;
	} else if (shape === "Y") {
		// paper
		return 2;
	} else {
		// scissors
		return 3;
	}
};

const roundOutcomeScore = (opp: string, me: string) => {
	if (
		(opp === "A" && me === "X") ||
		(opp === "B" && me === "Y") ||
		(opp === "C" && me === "Z")
	) {
		// draw
		return 3;
	} else if (
		(me === "X" && opp === "C") ||
		(me === "Y" && opp === "A") ||
		(me === "Z" && opp === "B")
	) {
		// i win
		return 6;
	} else {
		return 0;
	}
};

const score = lines.reduce((score, line) => {
	const [opponent, me] = line.split(" ");

	return score + shapeScore(me) + roundOutcomeScore(opponent, me);
}, 0);

console.log("My total score is", score);
