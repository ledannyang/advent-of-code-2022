import {readFile} from "../play";
import * as path from 'path';

const filePath = path.resolve(__dirname, 'input/input.txt');

// Input
// 7 6 4 2 1
// 1 2 7 8 9
// 9 7 6 2 1
// 1 3 2 4 5
// 8 6 4 4 1
// 1 3 6 7 9
let fileStr = readFile(filePath)
let normalisedFile: number [][] = fileStr.split("\n")
    .map(str => str.split(" "))
    .map(str => str.map(s => parseInt(s, 10)))

let result = normalisedFile.filter(row => isSafe(row)).length
console.log(result)

function isSafe(reports: number[]): boolean {
    if (reports.length < 2) return true; // base case

    const isAscending = reports[1] > reports[0];

    for (let i = 0; i < reports.length - 1; i++) {
        const diff = Math.abs(reports[i] - reports[i + 1]);

        if (diff < 1 || diff > 3) {
            return false;
        }

        if (isAscending && reports[i] >= reports[i + 1]) {
            return false;
        } else if (!isAscending && reports[i] <= reports[i + 1]) {
            return false;
        }
    }

    return true;
}