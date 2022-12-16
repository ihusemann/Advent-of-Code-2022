import _ from "lodash";

interface Monkey {
	startingItems: number[];
	operation: (old: number) => number;
	test: (val: number) => boolean;
	ifTrue: (val: number) => void;
	ifFalse: (val: number) => void;
}

const monkeyStack: number[][] = [];

const lcd = 5 * 11 * 2 * 13 * 7 * 3 * 17 * 19;
const monkeys: Monkey[] = [
	{
		// monkey 0
		startingItems: [65, 78],
		operation: (old) => old * 3,
		test: (val) => val % 5 === 0,
		ifTrue: (val) => {
			monkeyStack[2].push(val);
		},
		ifFalse: (val) => {
			monkeyStack[3].push(val);
		},
	},
	{
		// monkey 1
		startingItems: [54, 78, 86, 79, 73, 64, 85, 88],
		operation: (old) => old + 8,
		test: (val) => val % 11 === 0,
		ifTrue: (val) => {
			monkeyStack[4].push(val);
		},
		ifFalse: (val) => {
			monkeyStack[7].push(val);
		},
	},
	{
		// monkey 2
		startingItems: [69, 97, 77, 88, 87],
		operation: (old) => old + 2,
		test: (val) => val % 2 === 0,
		ifTrue: (val) => {
			monkeyStack[5].push(val);
		},
		ifFalse: (val) => {
			monkeyStack[3].push(val);
		},
	},
	{
		// monkey 3
		startingItems: [99],
		operation: (old) => old + 4,
		test: (val) => val % 13 === 0,
		ifTrue: (val) => {
			monkeyStack[1].push(val);
		},
		ifFalse: (val) => {
			monkeyStack[5].push(val);
		},
	},
	{
		// monkey 4
		startingItems: [60, 57, 52],
		operation: (old) => old * 19,
		test: (val) => val % 7 === 0,
		ifTrue: (val) => {
			monkeyStack[7].push(val);
		},
		ifFalse: (val) => {
			monkeyStack[6].push(val);
		},
	},
	{
		// monkey 5
		startingItems: [91, 82, 85, 73, 84, 53],
		operation: (old) => old + 5,
		test: (val) => val % 3 === 0,
		ifTrue: (val) => {
			monkeyStack[4].push(val);
		},
		ifFalse: (val) => {
			monkeyStack[1].push(val);
		},
	},
	{
		// monkey 6
		startingItems: [88, 74, 68, 56],
		operation: (old) => old * old,
		test: (val) => val % 17 === 0,
		ifTrue: (val) => {
			monkeyStack[0].push(val);
		},
		ifFalse: (val) => {
			monkeyStack[2].push(val);
		},
	},
	{
		// monkey 7
		startingItems: [54, 82, 72, 71, 53, 99, 67],
		operation: (old) => old + 1,
		test: (val) => val % 19 === 0,
		ifTrue: (val) => {
			monkeyStack[6].push(val);
		},
		ifFalse: (val) => {
			monkeyStack[0].push(val);
		},
	},
];

monkeys.forEach((monkey, idx) => {
	monkeyStack[idx] = monkey.startingItems;
});

const inspectionCount: number[] = Array(monkeys.length).fill(0);

const rounds = 10000;

for (let i = 0; i < rounds; i++) {
	monkeys.forEach((monkey, idx) => {
		while (monkeyStack[idx].length) {
			inspectionCount[idx] += 1;
			const item = monkey.operation(monkeyStack[idx].shift()!);
			const val = item > lcd ? item % lcd : item;
			if (monkey.test(val)) {
				monkey.ifTrue(Math.floor(val));
			} else {
				monkey.ifFalse(val);
			}
		}
	});
}

console.log(monkeyStack);
const top2 = inspectionCount.sort((a, b) => b - a).slice(0, 2);
console.log(top2[0] * top2[1]);
