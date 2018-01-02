var fs = require("fs");

// twiiterKeys linked to keys.js file
var keys = require("./keys.js");

// npm install twiiter
var twitter = require('twitter');

var client = new twitter(keys.twitterKeys);

// npm install spotify
var spotify = require('spotify');

// node spotift api package
var nodeSpotifyApi = require('node-spotify-api');

// omdb api install request
var request = require('request');

var movieThis = process.argv[2];


// function doNext(uC, aN){
//     switch(uC){
//     case 'my-tweets':
//         fetchTwitter();
//     break;

//     case "spotify-this-song":
//         fetchSpotify(aN);
//     break;

//     case "movie-this":
//         fetchOMDB(aN);
//     break;

//     case "do-what-it-says":
//         fetchRandom();
//     break;

//     default:
//     break;
//     }
// }



////////////////////////////////////////////////////////////////////////////////////


// twitter npm

var myTweets = new twitter
({
    consumer_key: 'sHbKrQVfMvD99RKE6m5InwhjV',
    consumer_secret: 'fJRxDIwl1Q4bN8FyVcec91FpaS0Znkti82SkxlRaNI9mQ4I6vV',
    access_token_key: '946135263625056258-WspOK4qTmZAgY3ZN7CKQNrM9FfkPaV7',
    access_token_secret: 'dE7ulrmBpo5DsuQkdPNPsSX1Aa49ItW6EvuDNDe4CACSM'
});


var options = {
    count: 20
};

myTweets.get('statuses/user_timeline', options, function(err, tweets) {

    for (var i = 0; i < tweets.length; i++) {

        console.log(" ");
        console.log('Tweet #' + (i + 1) + ' Date Posted : ' +  tweets[i].created_at)
        console.log('Text : ' + tweets[i].text);
        console.log(" ");
        console.log("-------------------------------------");
    }

})


////////////////////////////////////////////////////////////////////////////////////

// spotify npm

// search.function({ type: 'artist OR album OR track', query: 'My search query', limit: 2 }, callback);


spotify = require('node-spotify-api');

spotify = new spotify({
  id: '118dd869e80747f187cd15bb1ac9c4b5',
  secret: 'ce8946fa66c045ba9b4352c87eac116d'
});

// Artist(s) ---- key - 
// The song's name ---- key - name
// A preview link of the song from Spotify
// The album that the song is from ---- https://api.spotify.com/v1/albums/{id}



///////////////////////////////////////////////////////////////////////////////


//omdb movie search

// run a request to the OMDB API with the movie specified
getOMDB(searchName, movieThis);


function getOMDB(searchName, movieThis) {

    if (searchName === 'movie-this') {
        if (movieThis === '') {
            movieThis = 'Mr. Nobody';
        }

        request("http://www.omdbapi.com/?t=" + movieThis + "&y=&plot=short&apikey=trilogy", function(err, response, data) {

            // error check === 200 means good to proceed to next step
            if (!err && response.statusCode === 200) {
                console.log("retrieving movie data");
            } else {
                console.log('error occured' + err);
                return;
            }

            // if no errors console.log retreived data
            console.log("");
            console.log("");
            console.log("Title : " + JSON.parse(data).Title);
            console.log("");
            console.log("Year Released : " + JSON.parse(data).Year);
            console.log("");
            console.log("IMDB Rating : " + JSON.parse(data).imdbRating);
            console.log("");
            console.log("Rotten Tomatoes Rating : " + JSON.parse(data).tomatoRating);
            console.log("");
            console.log("Country Produced : " + JSON.parse(data).Country);
            console.log("");
            console.log("Language : " + JSON.parse(data).Language);
            console.log("");
            console.log("Plot : " + JSON.parse(data).Plot);
            console.log("");
            console.log("Actors : " + JSON.parse(data).Actors);
            console.log("");
            console.log("");

        });
    }
}

getRandom(searchName);


function getRandom(searchName) {

    if (searchName === 'do-what-it-says') {

        fs.readFile("random.txt", 'utf8', function(err, data) {

            if (err) {
                console.log("There is an error");
            } else {
                doWhatResults = data.split(",");
                getRandom(doWhatResults[0], doWhatResults[1]);
                console.log(doWhatResults);
            }
        });
    }
}