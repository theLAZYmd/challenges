/*'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}*/

Array.prototype.flat = function (depth) {
    return this.reduce(function (flat, toFlatten) {
        return flat.concat((Array.isArray(toFlatten) && (depth - 1)) ? toFlatten.flat(depth - 1) : toFlatten);
    }, []);
}

Array.prototype.clone = function () {
    return this.slice(0);
};

class LoggerConstructor {

    constructor() {
        this.output = "";
    }

    async log() {
        for (let r of arguments) try {
            if (typeof r === "string") throw this.output += r + "\n";
            if (typeof r === "number") throw this.output += r + "\n";
            if (Array.isArray(r)) throw this.output += "[" + r.join(", ") + "]\n";
            if (typeof r === "object") throw this.output += JSON.stringify(r, null, 4) + "\n";
            if (typeof r === "function") throw this.output += r.toString() + "\n";
        } catch (e) {
            //do nothing
        }
    }

    async log2() {
        for (let r of arguments) {
            if (typeof r === "string") return this.f(r);
            if (typeof r === "number") return this.f(r);
            if (Array.isArray(r)) return this.f("[" + r.join(", ") + "]");
            if (typeof r === "object") return this.f(JSON.stringify(r, null, 4));
            if (typeof r === "function") return this.f(r.toString());
        }
    }

    async f(r) {
        return console.log(r);
    }

    async end() {
        console.log(this.output);
    }
}

const Logger = new LoggerConstructor();
const magicsquares = [
    [
        [8, 3, 4],
        [1, 5, 9],
        [6, 7, 2]
    ],
    [
        [4, 9, 2],
        [3, 5, 7],
        [8, 1, 6]
    ]
];

const mappers = [
    a => a,
    a => a.reverse(),
    a => a.map(arr => arr.reverse()),
    a => a.map(arr => arr.reverse()).reverse()
]
/*
let i = 0;
const magicarrays = [];
for (let ma of magicsquares) {
    for (let f of mappers) {
        Logger.log(f, f(ma.clone()));
        Logger.log(f(ma.clone()));
        magicarrays[i] = f(ma.clone());
        i++;
    }
}*/
let magicarrays = [
    [[8, 3, 4], [1, 5, 9], [6, 7, 2]],
    [[6, 7, 2], [1, 5, 9], [8, 3, 4]],
    [[4, 3, 8], [9, 5, 1], [2, 7, 6]],
    [[2, 7, 6], [9, 5, 1], [4, 3, 8]],
    [[4, 9, 2], [3, 5, 7], [8, 1, 6]],
    [[8, 1, 6], [3, 5, 7], [4, 9, 2]],
    [[2, 9, 4], [7, 5, 3], [6, 1, 8]],
    [[6, 1, 8], [7, 5, 3], [2, 9, 4]]
];

Logger.log(formingMagicSquare([
    [7, 2, 9],
    [6, 6, 2],
    [5, 1, 2]
]));
Logger.end();

function formingMagicSquare(s) {
    let possibilities = [];
    for (let ma of magicarrays) {
        let sum = getSum(ma, s);
        possibilities.push(sum);
        Logger.log(s.flat(), ma.flat(), sum);
    };
    return Math.min(...possibilities);
}

function getSum(sq, ma) {
    let sum = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            sum += Math.abs(sq[i][j] - ma[i][j]);
        }
    }
    return sum;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let s = Array(3);

    for (let i = 0; i < 3; i++) {
        s[i] = readLine().split(' ').map(sTemp => parseInt(sTemp, 10));
    }

    const result = formingMagicSquare(s);

    ws.write(result + '\n');

    ws.end();
}