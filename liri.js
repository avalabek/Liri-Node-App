require("dotenv").config();
//How do I send it to grab the keys from keys.js will below work?
var keys = require ("./keys.js");
// //Import the Spotify and Twitter APIs
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
//access the keys from these
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log("Type my-tweets , spotify-this-song , movie-this , or do-what-it-says to get started!");

var action = process.argv[2];
var userInput = process.argv[3];

//what to do if user types in more than two indicies
for (var i = 4; i < process.argv.length; i++) {
    userInput += "+" + process.argv[i];
}
function startLiri() {
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
};
// functions---------------------------------------------------------
function tweets() {}

function music() {
    // var songName = process.argv[3];
    
    spotify.search({ type: "track", query: "All the Small Things" }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }

        console.log(data);
    });
}

function whatItSays() {}
//OMDB movies---------------------------------------------------------
 
function movie() {
    //maybe needs to be process.argv[3] ? or userInput variable? do I need a separate 
    // variable here, or just use userInput? how to distinguish from other inputs for
    // twitter spotify etc? Is this a case for let? so let userInput in each function?
    // var movieName = process.argv[3];
    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);
    var request = require("request");

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("The movie was released in: " + JSON.parse(body).Year);
            console.log("The movie's language is: " + JSON.parse(body).Language);
            console.log("The movie stars: " + JSON.parse(body).Actors);
            console.log("The movie was produced in: " + JSON.parse(body).Country);
            console.log("This is the movie's plot: " + JSON.parse(body).Plot);
            console.log("The movie's Rotten Tomatoes score is: " + JSON.parse(body).Metascore);
            console.log("The movie's imdb rating is: " + JSON.parse(body).imdbRating);
            // console.log(JSON.parse(body));//this one gives you all of the object so you can more easily find the part you want
        }else {
            if (movieName === undefined) {
                movieName = "Mr.Nobody"
                console.log("The movie's title is: " + JSON.parse(body).Title);
                console.log("The movie was released in: " + JSON.parse(body).Year);
                console.log("The movie's language is: " + JSON.parse(body).Language);
                console.log("The movie stars: " + JSON.parse(body).Actors);
                console.log("The movie was produced in: " + JSON.parse(body).Country);
                console.log("This is the movie's plot: " + JSON.parse(body).Plot);
                console.log("The movie's Rotten Tomatoes score is: " + JSON.parse(body).Metascore);
                console.log("The movie's imdb rating is: " + JSON.parse(body).imdbRating);

            }
        }
    });
}
startLiri();