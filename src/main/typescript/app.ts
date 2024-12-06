import * as fs from "fs";

class AdventOfCode {
    // Read from the file
    static readFromFile(): string[] {
        try {
            const filePath = "src/main/typescript/input/input.txt";
            const fileContent = fs.readFileSync(filePath, "utf-8");
            return fileContent.split("\n").filter(line => line.trim() !== ""); // Split into lines and filter empty ones
            console.log("File content:", fileContent);
        } catch (err) {
            console.error("Error reading file:", err.message);
        }
    }

    // Normalize the file content into two lists of numbers
    static normaliseFile(strList: string[]): [number[], number[]] {
        const tuples = strList.map(str => {
            const [a, b] = str.replace(/\s{3}/g, ",").split(",").map(Number); // Replace 3 spaces with a comma and split
            return [a, b];
        });

        const l1 = tuples.map(tuple => tuple[0]);
        const l2 = tuples.map(tuple => tuple[1]);

        return [l1, l2];
    }

    // Calculate the distance
    static calculateDistance(l1: number[], l2: number[]): number {
        const orderedL1 = [...l1].sort((a, b) => a - b); // Sort ascending
        const orderedL2 = [...l2].sort((a, b) => a - b);

        return orderedL1.reduce((sum, a, i) => {
            const b = orderedL2[i];
            return sum + Math.abs(a - b); // Sum of absolute differences
        }, 0);
    }

    // Solve the problem
    static solve(): number {
        const inputLines = this.readFromFile();
        const [l1, l2] = this.normaliseFile(inputLines);

        return this.calculateDistance(l1, l2);
    }
}

// Example usage:
console.log(AdventOfCode.solve());
