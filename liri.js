require("dotenv").config();
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

switch  {
    case 'my-tweets'
    value:
        
        break;
case 'spotify-this-song'

case 'movie-this'

case `do-what-it-says`
    default:
        break;
}

//OMDB movies---------------------------------------------------------
var movieName = process.argv[2];
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
console.log(queryUrl);
var request = require("request");

request(queryUrl, function (error, response, body) {

    if (!error && response.statusCode === 200) {
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
