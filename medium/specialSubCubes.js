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

function generateTriplet(n, size) {
    let x = Math.floor(n / (size ** 2));
    let rx = n - (x * (size ** 2));
    let y = Math.floor(rx / (size ** 1));
    let ry = rx - (y * (size ** 1));
    let z = Math.floor(ry / (size ** 0)); //the number floored is itself
    return [x, y, z]
}

function generateIndex([x, y, z], size) {
    return (size ** 2) * x + (size ** 1) * y + (size ** 0) * z;
}

function generateSubCubes(subsize, size, cube) { //(size - subsize + 1)^3 possible subcubes
    let array = [];
    for (let x = 0; x < size - subsize + 1; x++) { //for every possible of combination up of x, y, and z
        for (let y = 0; y < size - subsize + 1; y++) {
            for (let z = 0; z < size - subsize + 1; z++) {
                let a = [];
                for (let _x = 0; _x < subsize; _x++) { //for every limit of x, y, and z
                    for (let _y = 0; _y < subsize; _y++) {
                        for (let _z = 0; _z < subsize; _z++) {
                            a.push(generateIndex([x + _x, y + _y, z + _z], size));
                        }
                    }
                }
                array.push(a.map(index => cube[index]));
            }
        }
    }
    return array;
}

function specialSubCubes(cube) {
    let array = [];
    let size = Math.cbrt(cube.length);
    for (let i = 1; i < size + 1; i++) {
        let allCubes = generateSubCubes(i, size, cube);
        if (i === 2) console.log(allCubes);
        let specialCubes = allCubes.filter(a => Math.max(...a) < i + 1);
        if (i === 2) console.log(specialCubes);
        array.push(specialCubes.length);
    }
    return array;
}

console.log(specialSubCubes([1, 2, 3, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 3, 1, 2, 1, 2, 3, 2, 2, 3, 3, 3, 1]))

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine(), 10);

        const cube = readLine().split(' ').map(cubeTemp => parseInt(cubeTemp, 10));

        let result = specialSubCubes(cube);

        ws.write(result.join(" ") + "\n");
    }

    ws.end();
}

