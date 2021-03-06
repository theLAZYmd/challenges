//https://www.hackerrank.com/challenges/determining-dna-health/problem

'use strict';
const LAZYac = require('../LAZYac');

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

Array.zip = function (arr1, arr2) {
    return arr1.map((element, i) => [element, arr2[i]]);
};

String.prototype.occurrences = function (subString, allowOverlapping = false) { //occurrences of a substring
	if (subString.length === 0) return this.length + 1;
	let n = -1;
	let position = -1;
	let step = allowOverlapping ? 1 : subString.length;
	do {
        n++;
        position += step;
        position = this.indexOf(subString, position);
	} while (position >= 0);
	return n;
};

class DNA {

    constructor(genes, health) {
        this.genes = genes;
        this.health = health;
        this.trie = new LAZYac(this.genes, {
            "allowDuplicates": false
        });
    }

    run(start, finish, d) {
        let results = this.trie.search(d, false);
        return this.count(start, finish, results);

    }

    count(start, finish, results) {
        let value = 0;
        for (let r of results) {
            for (let i = start; i <= finish; i++) {
                if (this.genes[i] === r) {
                    value += this.health[i];
                }
            }
        }
        return value;
    }

}

function readLine() {
    return inputString[currentLine++];
}

function main() {
    //const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const n = parseInt(readLine(), 10);
    const genes = readLine().split(' ');
    const health = readLine().split(' ').map(healthTemp => parseInt(healthTemp, 10));
    const s = parseInt(readLine(), 10);
    let dna = new DNA(genes, health);
    let max = 0;
    let min = Infinity;
    for (let sItr = 0; sItr < s; sItr++) {
        let [first, last, d] = readLine().split(' ');
        let value = dna.run(parseInt(first, 10), parseInt(last, 10), d);
        if (value > max) max = value;
        else if (min === 0) continue;
        else if (value < min) min = value;
    }
    console.log(min + " " + max);
    //ws.write(min + " " + max);
    //ws.end();

}

process.stdin.emit('data', fs.readFileSync("../data/dna.txt"));

process.stdin.emit('end');