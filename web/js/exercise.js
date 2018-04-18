var movies = [
    { name: "Damn Berlin", watched: true, rating: 4 },
    { name: "Start Wars", watched: true, rating: 5 },
    { name: "Phantom Thread", watched: false, rating: 3.5 }
];

movies.forEach(function (movie) {
    console.log("You " + (movie.watched ? " have " : " have not ")
        + "watched \"" + movie.name + "\" - " + movie.rating + " starts");
})

var object = {
  name: "Joe",

  add: function(x, y) {
    return x + y;
  },
  print: function() {
      console.log(this.name);
  },
};

console.log(object.add(1, 2));