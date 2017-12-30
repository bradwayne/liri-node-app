// twiiterKeys linked to keys.js file
var twitterKeys = require("./keys.js");


// npm install twiiter
var twitter = require('twitter');

// npm install spotify
var spotify = require('spotify');

// node spotift api package
var nodeSpotifyApi = require('node-spotify-api');

// omdb api install request
var request = require('request');



var movieThis = process.argv[2];
// var spotifyThisSong = process.argv[4];
// var doWhatItSays = process.argv[5];        for fs see syncAppend.js in-class work


////////////////////////////////////////////////////////////////////////////////////


// twitter npm

var myTweets = new twitter({
    consumer_key: 'sHbKrQVfMvD99RKE6m5InwhjV',
    consumer_secret: 'fJRxDIwl1Q4bN8FyVcec91FpaS0Znkti82SkxlRaNI9mQ4I6vV',
    access_token_key: '946135263625056258-WspOK4qTmZAgY3ZN7CKQNrM9FfkPaV7',
    access_token_secret: 'dE7ulrmBpo5DsuQkdPNPsSX1Aa49ItW6EvuDNDe4CACSM'
});


var options = {
    count: 3
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

// search:function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);


// spotify = require('node-spotify-api');

// spotify = new spotify({
//   id: '118dd869e80747f187cd15bb1ac9c4b5',
//   secret: 'ce8946fa66c045ba9b4352c87eac116d'
// });

//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }

// console.log(data); 



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