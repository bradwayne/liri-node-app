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

myTweets.get('statuses/user_timeline', options, function(err, data) {

    for (var i = 0; i < data.length; i++) {

        console.log(" ");
        console.log('Date Posted : ' + data[i].created_at)
        console.log('Message : ' + data[i].text);
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
request("http://www.omdbapi.com/?t=" + movieThis + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

    // error check === 200 means good to proceed to next step
    if (!error && response.statusCode === 200) {

   	// if no errors console.log retreived data
        console.log("");
        console.log("");
        console.log("Title of the movie: " + JSON.parse(body).Title);
        console.log("Year the movie came out: " + JSON.parse(body).Year);
        console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).RottenTomatoes);
        console.log("Country where the movie was produced: " + JSON.parse(body).Country);
        console.log("Language of the movie: " + JSON.parse(body).Language);
        console.log("Plot of the movie: " + JSON.parse(body).Plot);
        console.log("Actors in the movie: " + JSON.parse(body).Actors);
        console.log("");
        console.log("");
    }

});