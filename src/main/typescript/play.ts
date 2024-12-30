import * as fs from 'fs';

export function readFile(path: string): string {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            return;
        }
    });

    try {
        return fs.readFileSync(path, 'utf8');
    } catch (err) {
        return "";
    }
}




