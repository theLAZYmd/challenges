'use strict';

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

Array.prototype.range = function() {
    return [Math.min(...this), Math.max(...this)];
};

String.prototype.toLex = function(inverse = false, startAtOne = false) {
    if (!/[a-z]/.test(this)) throw "Cannot find lex of non-alphanumeric characters";
    return this.toLowerCase()
        .split("")
        .map((char) => {
            let ascii = char.charCodeAt(0)
            let number = Number(ascii);
            let output = number - 97;
            if (inverse) output = 25 - output;
            if (startAtOne) output++;
            return output;
        })
};

Array.prototype.fromLex = function (inverse = false, startAtOne = false) {
    let arr = startAtOne ? this.map(n => n - 1) : this;
    return String.fromCharCode(...arr
        .map((char) => {
            if (startAtOne) char--;
            if (inverse) char = 25 - char;
            let number = char + 97;
            let string = number.toString();
            return string;
        }))
};

Array.prototype.swap = function (i, j) { //swaps two elements in an array
	let tmp = this[i];
	this[i] = this[j];
	this[j] = tmp;
	return this;
};

Number.prototype.toDigits = function() {
    return this.toSplit().split("").map(n => Number(n));
}

Number.prototype.getLargestCombination = function () {
    return this.toDigits().getLargestCombination();
}

Array.prototype.getLargestCombination = function () {
    let i, j;
    for (i = this.length - 1; i > 0; i--) { //start from the right and find the first digit that has a digit smaller than it
        if (this[i] > this[i - 1]) break;
    }
    if (i === 0) return this;
    i--;
    for (j = this.length - 1; j > i; j--) { //start from the right and find the first digit larger than the digit to be swapped
        if (this[j] > this[i]) break;
    }
    let swapped = this.slice(0).swap(i, j); //swap those digits
    j++;
    let arr1 = swapped.slice(0, i + 1);
    let arr2 = swapped.slice(i + 1).sort((a, b) => a - b);
    console.log(arr1, arr2);
    return arr1.concat(...arr2); //and sort all those digits following the swapped digit
}

function getSumFromLex(lex) {
    return lex.reduce((acc, curr) => acc += curr);
}

// Complete the biggerIsGreater function below.
function biggerIsGreater(w) {
    let array = w.toLex();/*
    for (let i = 1; i < array.length; i++) {
        if (array[i] > array[i - 1]) return "no answer";
    }*/
    let sorted = array.getLargestCombination();
    let string = sorted.fromLex();
    if (array === sorted) return "no answer";
    return string;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const w = readLine();

        let result = biggerIsGreater(w);

        ws.write(result + "\n");
    }

    ws.end();
}
