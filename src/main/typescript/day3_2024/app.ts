import {readFile} from "../play";
import * as path from 'path';

const filePath = path.resolve(__dirname, 'input/input.txt');

// Input
//xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
let fileStr = readFile(filePath)

function findMuls(input: string): [number, number][] {
    const regex = /mul\((\d+),(\d+)\)/g;
    const matches = input.match(regex);

    if (!matches) return [];

    return matches.map((match) => {
        const [x, y, _] = match.match(/\d+/g) || [];
        return [parseInt(x, 10), parseInt(y, 10)] as [number, number];
    });
}

let result = findMuls(fileStr)
    .map(([a, b]) => a * b)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);


console.log("Output:", result);


