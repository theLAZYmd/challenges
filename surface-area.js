'use strict';

Array.prototype.flat = function (depth) { // this method implemented https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
    return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth - 1)) ? toFlatten.flat(depth - 1) : toFlatten);
    }, []);
}

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

// Complete the surfaceArea function below.
class Model {

    constructor(h, w, A) {
        this.height = h;
        this.width = w;
        this.grid = A;
        //console.log(h, w, A.map(arr => arr.join(" ")).join("\n"));
    }

    get sa() {
        if (this._sa) return this._sa;
        return this._sa = this.grid.map((row) => row.map(stack => stack * 4 + 2));
    }

    get neighbours() {
        if (this._neighbours) return this._neighbours;
        return this._neighbours = this.grid.map((row, i) => row.map((stack, j) => this.testNeighbours(i, j, stack)))
    }

    testNeighbours(i, j, height) { //either check all directions all just check down and right and add 2 each time
        let sum = 0;
        let neighbours = [
            //this.grid[i][j - 1] || 0,
            this.grid[i][j + 1] || 0,
            //this.grid[i - 1] ? this.grid[i - 1][j] : 0,
            this.grid[i + 1] ? this.grid[i + 1][j] : 0
        ];
        for (let k = 1; k < height + 1; k++) {
            for (let n of neighbours) {
                //if (n >= k) sum++;
                if (n >= k) sum += 2;
            }
        }
        //console.log(i, j, height, sum, neighbours);
        return sum;
    }

    getSurfaceArea() {
        //console.log(Model.sum(this.sa), Model.sum(this.neighbours));
        return Model.sum(this.sa) - Model.sum(this.neighbours);
    }

    static sum(array) {
        return array.flat(2).reduce((acc, curr) => acc += curr);
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const HW = readLine().split(' ');

    const H = parseInt(HW[0], 10);

    const W = parseInt(HW[1], 10);

    let A = Array(H);

    for (let i = 0; i < H; i++) {
        A[i] = readLine().split(' ').map(ATemp => parseInt(ATemp, 10));
    }

    let model = new Model(H, W, A);
    let result = model.getSurfaceArea();

    ws.write(result + "\n");

    ws.end();
}