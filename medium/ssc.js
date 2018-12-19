'use strict';

Math.randBetween = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

Math.genRandomRange = function (limit, number) {
    let range = [];
    for (let i = 0; i < number; i++) {
		range.push(Math.randBetween(1, limit));
	}
	return range;
};

Math.logBase = function (base, number) {
    return (Math.log(number) / Math.log(base)).round(12);
}

Number.prototype.round = function (places) {
    (Math.round(this * Math.pow(10, places)) / Math.pow(10, places));
    return this;
};

Number.prototype.radix = function (base) {
    if (this <= 0) return [0];
    let sum = this;
    let value = Math.floor(Math.logBase(base, this));
    let radix = [];
    do {
        let digit = Math.floor(sum / base ** value);
        radix.push(digit);
        sum -= digit * base ** value;
        value--;
    } while (value >= 0);
    return radix;
};

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

class Cube {

    constructor(cube) {
        this.cubes = [null, cube];
        this.size = cube.length;
        this.root = Math.round(this.size ** (1 / 3));
    }

    getCubes(subsize) { //generate the subcubes of a given size by combining the cubes one size smaller
        let arr = [];
        let sc = this.cubes[subsize - 1];
        let size = sc.length;
        let root = Math.round(size ** (1 / 3));
        let [a, b, c] = Cube.getTriplets(size - 1, root); //for any a x b x c subcubes
        for (let i = 0; i < size; i++) {
            let [x, y, z] = Cube.getTriplets(i, root); //filter out those cubes on the edge
            if (x > a - 1) continue;
            if (y > b - 1) continue;
            if (z > c - 1) continue;
            let indexes = Cube.getIndexes(i, root); //then each cube of the size - 1 can be combined with its neighbours
            let values = indexes.map(index => sc[index]);
            let max = Math.max(...values); //and the max taken to produce larger cubes
            arr.push(max);
        }
        this.cubes[subsize] = arr;
    }

    static evaluate(cube, limit) { //then of those larger cubes produced with the maxes, discard any that surpass the limit
        //return cube.filter(sc => sc <= limit).length //I THOUGHT IT WAS THE MAXIMUM HAS TO BE LOWER THAN THE SCC SIZE! TURNS OUT ITS EQUAL
        return cube.filter(sc => sc === limit).length;
    }

    static getIndexes(n, size) {
        return [
            n,
            n + 1,
            n + size,
            n + size + 1,
            n + size ** 2,
            n + size ** 2 + 1,
            n + size ** 2 + size ** 1,
            n + size ** 2 + size ** 1 + 1
        ].map(Math.round)
    }

    static getTriplets(n, base) {
        let radix = n.radix(base);
        if (radix.length > 3) console.error(n);
        while (radix.length !== 3) {
            radix.unshift(0);
        }
        return radix;
    }

    getSum() {
        let arr = [];
        for (let i = 1; i < this.root + 1; i++) {
            if (i > 1) this.getCubes(i);
            let valid = Cube.evaluate(this.cubes[i], i);
            arr.push(valid);
            //console.log(i, this.cubes[i], valid);
        }
        return arr;
    }

}

/*
process.stdin.emit('data', `3
3
1 1 1 1 1 3 1 1 3 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 2
3
1 1 1 1 1 1 1 1 2 1 1 1 1 3 1 2 2 1 1 1 1 1 1 1 1 1 1
3
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 1 1 1 3 1 1 1 3 1 2 2`)*/

console.log((new Cube(Math.genRandomRange(3, 3 ** 3))).getSum());

function main() {
    //const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine(), 10);

        const cube = readLine().split(' ').map(cubeTemp => parseInt(cubeTemp, 10));

        let values = new Cube(cube);
        let result = values.getSum();

        //ws.write(result.join(" ") + "\n");
        console.log(result.join(" ") + "\n");
    }

   //ws.end();
}

process.stdin.emit('end');