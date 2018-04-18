var stdin = process.openStdin();

var todos = [1, 2, 3];

var res = todos.reduce(function (p1, p2) { return p1 + p2; });
console.log(res);

var max = todos.reduce(function (p1, p2) { return p1 > p2 ? p1 : p2; })
console.log(max);

function uniform(arr) {
    if (arr.length == 0)
        return true;

    return arr.every(function (t) { t === arr[0] });
}

Array.prototype.myForEach = function(func) {
    for (var i = 0; i < this.length; i++) {
        func(this[i]);
    }
}

todos.myForEach(function (todo) {
    console.log(todo);
})


var dog = {
  name: "bud",
  breed: "dog"
};

dog.age = 10;

console.log(dog);
