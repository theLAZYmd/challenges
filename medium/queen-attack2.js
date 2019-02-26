// https://www.hackerrank.com/challenges/queens-attack-2/problem

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

// Complete the queensAttack function below.

class queensAttack {

    constructor(n, k, r_q, c_q) {
        this.size = n;
        this.obstacles = k;
        this.row = r_q;
        this.column = c_q;
    }

    run(obstacles) {
        for (let [row, column] of obstacles) {
            let direction = this.direction(row, column);
            if (direction !== null) this[direction] = [row, column];
        }
        return this.finalCount();
    }
    
    direction(row, column) {
        if (row === this.row) {
            if (column < this.column) return "w";
            else return "e";
        }
        if (column === this.column) {
            if (row < this.row) return "s";
            else return "n";
        }
        if (this.row - row === this.column - column) {
            if (this.row - row > 0) return "sW";
            else return "nE";
        }
        if (this.row - row === column - this.column) {
            if (this.row - row > 0) return "sE";
            else return "nW";
        }
        return null;
    }

    get w() {
        if (this._w) return this._w;
        return 0;
    }

    set w([row, column]) {
        if (column <= this.w) return;
        this._w = column;
    }
    
    get n() {
        if (this._n) return this._n;
        return this.size + 1;
    }

    set n([row, column]) {
        if (row >= this.n) return;
        this._n = row;
    }
    
    get e() {
        if (this._e) return this._e;
        return this.size + 1;
    }

    set e([row, column]) {
        if (column >= this.e) return;
        this._e = column;
    }
    
    get s() {
        if (this._s) return this._s;
        return 0;
    }

    set s([row, column]) {
        if (row <= this.s) return;
        this._s = row;
    }

    get nW() {
        if (this._nW) return this._nW;
        return this.column - Math.min(this.size - this.row, this.column - 0 - 1) - 1;
    }

    set nW([row, column]) {
        if (column <= this.nW) return;
        this._nW = column;
    }
    
    get nE() {
        if (this._nE) return this._nE;
        return this.row + Math.min(this.size - this.row, this.size - this.column) + 1;
    }

    set nE([row, column]) {
        if (row >= this.nE) return;
        this._nE = row;
    }
    
    get sE() {
        if (this._sE) return this._sE;
        return this.column + Math.min(this.row - 0 - 1, this.size - this.column) + 1;
    }

    set sE([row, column]) {
        if (column >= this.sE) return;
        this._sE = column;
    }
    
    get sW() {
        if (this._sW) return this._sW;
        return this.row - Math.min(this.row - 0 - 1, this.column - 0 - 1) - 1;
    }

    set sW([row, column]) {
        if (row <= this.sW) return;
        this._sW = row;
    }

    finalCount() {
        let pairs = [
            ["n", "s"],
            ["e", "w"],
            ["nE", "sW"],
            ["sE", "nW"]
        ]
        let sum = 0;
        for (let [first, second] of pairs) {
            sum += this[first] - this[second] - 2;
        }
        return sum;
    }

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const r_qC_q = readLine().split(' ');

    const r_q = parseInt(r_qC_q[0], 10);

    const c_q = parseInt(r_qC_q[1], 10);

    let obstacles = Array(k);

    for (let i = 0; i < k; i++) {
        obstacles[i] = readLine().split(' ').map(obstaclesTemp => parseInt(obstaclesTemp, 10));
    }

    let qA = new queensAttack(n, k, r_q, c_q);
    let result = qA.run(obstacles);
    console.log(result);
    ws.write(result + "\n");

    ws.end();
}
