function average(scores) {
    var sum = scores.reduceRight(function (a, b) {
       return a + b;
    });

    return Math.round(sum / scores.length);
}

var scores = [ 90, 98, 89, 100, 100, 86, 94];
var avg = average(scores);
console.log(avg);