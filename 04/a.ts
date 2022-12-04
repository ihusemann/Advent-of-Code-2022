import { readFileSync } from "fs";

const input = readFileSync("04/input.txt", "utf-8");
const lines = input.split("\n");

const count = lines.reduce((sum, line) => {
  const [a, b] = line.split(",");
  const [a1, a2] = a.split("-");
  const [b1, b2] = b.split("-");

  if (+a1 >= +b1 && +a2 <= +b2) {
    return sum + 1;
  }

  if (+b1 >= +a1 && +b2 <= +a2) {
    return sum + 1;
  }
  
  return sum;
}, 0);

console.log(count);
