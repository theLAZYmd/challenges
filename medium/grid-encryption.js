// https://www.hackerrank.com/challenges/encryption/problem
//completed in 20 minutes

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

Array.prototype.rotate = function () {
    return Object.keys(this[0]).map(column => this.map(row => row[column]));
};

// Complete the encryption function below.
class Encryption {

    constructor(raw) {
        this.raw = raw;
        this.string = this.raw.replace(/\s+/g, "");
    }

    get dimensions () {
        let row, col;
        let root = this.string.length ** 0.5;
        let min = Math.floor(root);
        let max = Math.ceil(root);
        if (root > (min * max) ** 0.5) [row, col] = [max, max];
        else [row, col] = [min, max];
        return [row, col];
    }

    get table () {
        let arr = [];
        let [row, col] = this.dimensions;
        for (let i = 0; i < row; i++) {
            arr.push(this.string.slice(i * col, (i + 1) * col).split(""));
        }
        return arr;
    }

    get rotated () {
        return this.table.rotate();
    }

    get encrypted () {
        return this.rotated.map(row => row.join("")).join(" ");
    }

    get () {
        return this.encrypted;
    }

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let grid = new Encryption(s);

    let result = grid.get();

    ws.write(result + "\n");

    ws.end();
}
