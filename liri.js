require("dotenv").config();
//How do I send it to grab the keys from keys.js will below work?
var keys = require("./keys.js");
// //Import the Spotify and Twitter APIs
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
//access the keys from these
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
//use fs to read random.txt file
var fs = require("fs");

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
        default:
            console.log("Type my-tweets , spotify-this-song , movie-this , or do-what-it-says to get started!");

    }
};
// functions---------------------------------------------------------
function tweets() {
    var screenName = {
        screen_name: "liripen"
    };
    client.get("statuses/user_timeline", screenName, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                var date = tweets[i].created_at;
                console.log("@liripen: " + tweets[i].text + " Created at: " + date.substring(0, 19));
                console.log("+++++++++++++++++++++");
            }
        } else {
            console.log("There has been an error.");
        }
    });
}


function music() {
 var searchTrack = userInput;
    spotify.search({ type: 'track', query: searchTrack }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {
            
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Preview Here: " + data.tracks.items[0].preview_url);
        }
    });
};

function whatItSays() {
    
fs.readFile("random.txt", "utf8", function (error, data) {

    
    if (error) {
        return console.log(error);
    }
        console.log(data);
        music();
    //run music function? orreassign searchTrack to data once it is split?
    //need to reassign action variable so that it isn't user input but it is reading the file
    //reassign variable of action so that it reads to random.txt then call the
    // Then split it by commas (to make it more readable)
    // var dataArr = data.split(");

  // We will then re-display the content as an array for later use.
//   console.log(dataArr);
    //now i need to get it to run node liri.js spotify-this-song dataArr
    //how to do this
});
}



function movie() {
    if (userInput === undefined) {
        userInput = "Mr.Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);
    var request = require("request");
    //make an if statement to check if userInput is undefined. do this first then go to next section
    // var movieName;
    request(queryUrl, function (error, response, body) {
       if (!error && response.statusCode === 200){
            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("The movie was released in: " + JSON.parse(body).Year);
            console.log("The movie's language is: " + JSON.parse(body).Language);
            console.log("The movie stars: " + JSON.parse(body).Actors);
            console.log("The movie was produced in: " + JSON.parse(body).Country);
            console.log("This is the movie's plot: " + JSON.parse(body).Plot);
            console.log("The movie's Rotten Tomatoes score is: " + JSON.parse(body).Metascore);
            console.log("The movie's imdb rating is: " + JSON.parse(body).imdbRating);
        }
    })
}
startLiri();