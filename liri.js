require("dotenv").config();
//How do I send it to grab the keys from keys.js will below work?
var keys = (src="/keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
//could I make the below into one user selects instead of types?
console.log("Type my-tweets , spotify-this-song , movie-this , or do-what-it-says to get started!");

var action = process.argv[2];
var userInput = process.argv[3];

//what to do if user types in more than two indicies
for (var i = 4; i < process.argv.length; i++) {
    userInput += '+' + process.argv[i];
}

switch (action) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        music();
        break;

    case "movie-this":
        movie();
        break;

    case "do-what-it-says":
        whatItSays();
        break;
}

// functions---------------------------------------------------------
function tweets() {
}
function music() {
}

function whatItSays() {
}
//OMDB movies---------------------------------------------------------
function movie(){
//maybe needs to be argv3 ?
var movieName = process.argv[2];
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
console.log(queryUrl);
var request = require("request");

request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log("The movie's title is: " + JSON.parse(body).Title);
        console.log("The movie was released in: " + JSON.parse(body).Year);
        console.log("The movie's language is: " + JSON.parse(body).Language);
        console.log("The movie stars: " + JSON.parse(body).Actors);
        console.log("The movie was made in: " + JSON.parse(body).Country);
        console.log("The movie's plot: " + JSON.parse(body).Plot);
        console.log("The movie's Rotten Tomatoes score is: " + JSON.parse(body).Metascore);
        console.log("The movie's imdb rating is: " + JSON.parse(body).imdbRating);
        // console.log(JSON.parse(body));//this one gives you all of the object so you can more easily find the part you want
    }
});
}
