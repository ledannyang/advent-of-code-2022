import {readFile} from "../play";
import * as path from 'path';

const filePath = path.resolve(__dirname, 'input/input.txt');

// Input
// MMMSXXMASM
// MSAMXMSMSA
// AMXSXMAAMM
// MSAMASMSMX
// XMASAMXAMM
// XXAMMXXAMA
// SMSMSASXSS
// SAXAMASAAA
// MAMMMXMMMM
// MXMXAXMASX

let fileStr = readFile(filePath)
const input = fileStr.split("\n")
const word = "XMAS";
const wordLength = word.length;

function countOccurrences(grid: string[], word: string): number {
    const n = grid.length;
    const m = grid[0].length;
    let count = 0;

    // Directions to check: horizontal, vertical, and diagonal
    const directions = [
        { x: 0, y: 1 },   // Right (horizontal)
        { x: 0, y: -1 },  // Left (horizontal)
        { x: 1, y: 0 },   // Down (vertical)
        { x: -1, y: 0 },  // Up (vertical)
        { x: 1, y: 1 },   // Down-right (diagonal)
        { x: 1, y: -1 },  // Down-left (diagonal)
        { x: -1, y: 1 },  // Up-right (diagonal)
        { x: -1, y: -1 }, // Up-left (diagonal)
    ];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            for (const { x, y } of directions) {
                let found = true;
                for (let k = 0; k < wordLength; k++) {
                    const newX = i + k * x;
                    const newY = j + k * y;
                    if (newX < 0 || newY < 0 || newX >= n || newY >= m || grid[newX][newY] !== word[k]) {
                        found = false;
                        break;
                    }
                }

                if (found) {
                    count++;
                }
            }
        }
    }

    return count;
}

console.log("OUTPUT", countOccurrences(input, word));