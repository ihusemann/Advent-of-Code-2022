import { readFileSync } from "fs";
import _ from "lodash";

const input = readFileSync("04/input.txt", "utf-8");
const lines = input.split("\n");

const count = lines.reduce((sum, line) => {
  const [a, b] = line.split(",");
  const [a1, a2] = a.split("-");
  const [b1, b2] = b.split("-");

  const arrA = _.range(+a1, +a2 + 1);
  const arrB = _.range(+b1, +b2 + 1)

  if (_.intersection(arrA, arrB).length > 0) {
    return sum + 1
  }

  return sum;
}, 0);

console.log(count);
