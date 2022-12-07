import { readFileSync } from "fs";

const file = readFileSync("07/example.txt", "utf-8");

/**
 * this approach works for small inputs (like the example input),
 * but exceeds the maximum call stack size for the full input.
 *
 */

interface File {
	name: string;
	size: number;
	parentDir: string | null;
}

const files: File[] = [
	{
		name: "/",
		size: 0,
		parentDir: null,
	},
];

const lines = file.split("\n");
const stack: string[] = [];

lines.forEach((line) => {
	const [a, b, c] = line.split(" ");
	if (b === "cd") {
		if (c === "..") {
			stack.pop();
		} else {
			stack.push(c);
		}
	} else if (b === "ls") {
		// do nothing
	} else {
		files.push({
			name: b,
			size: a === "dir" ? 0 : +a,
			parentDir: stack.at(-1)!,
		});
	}
});

interface Node extends File {
	children: Node[];
}

// convert flat array of files & dirs to a tree
const generateTree = (files: File[]) => {
	const hashTable = Object.create(null);
	files.forEach(
		(file) =>
			(hashTable[file.name] = {
				...file,
				children: [],
			})
	);

	const tree: Node[] = [];
	files.forEach((file) => {
		if (file.parentDir)
			hashTable[file.parentDir].children.push(hashTable[file.name]);
		else tree.push(hashTable[file.name]);
	});

	return tree;
};

const tree = generateTree(files);

const dirSizes: number[] = [];

// recurse through the tree, aggregating the file sizes along the way
const bfs = (node: Node): number => {
	const queue: Node[] = [];
	let size = node.size;

	node.children.forEach((child) => {
		queue.push(child);
	});

	while (queue.length > 0) {
		const curr = queue.shift()!;
		size = size + bfs(curr);
	}
	if (node.size === 0) {
		// is a directory.  add the total size for all of its children.
		dirSizes.push(size);
	}

	return size;
};

bfs(tree[0]);
console.log(dirSizes);

console.log(
	"Sum of sizes:",
	dirSizes.filter((size) => size < 100000).reduce((sum, el) => sum + el, 0)
);
