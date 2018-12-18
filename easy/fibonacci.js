var a = [1];
var i = 1;
var sum = 0;
while (i < 4000000) {
    i += a[a.length - 1];
    a.push(i);
    console.error(i);
}
for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
    var n = a_1[_i];
    sum += n;
    console.log(sum, n);
}
console.log(sum);
