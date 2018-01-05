require("dotenv").config();
var keys = require('./keys.js');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

/////////////////////////////////////////////////////////////////


var songSearch = new spotify(keys.spotify);
var myTweets = new twitter(keys.twitter);

console.log(process.env.twitter_consumer_key);
console.log(process.env.twitter_consumer_secret)

console.log(process.env.spotify_id);
console.log(process.env.spotify_secret);





// var myTweets = new twitter({
//     consumer_key: process.env.twitter.consumer_key,
//     consumer_secret: process.env.twitter.consumer_secret,
//     access_token_key: process.env.twitter.access_token_key,
//     access_token_secret: process.env.twitter.access_token_secret
// });

// console.log("consumer key : " + keys.twitter.consumer_key);
// console.log("consumer secret : " + keys.twitter.consumer_secret);

//////////////////////////////////////////////////////////////////

// var spotifyClient = new spotify({
//     id: keys.spotify.client_id,
//     secret: keys.spotify.client_secret
// })

// console.log("client id : " + keys.spotify.client_id);
// console.log("client secret : " + keys.spotify.client_secret);

/////////////////////////////////////////////////////////////////

var searchName = process.argv[2];
var item = '';

for (var i = 3; i < process.argv.length; i++) {
    if (process.argv[i].trim()) {
        // first trim all blank space before and after the process.argv[i], then replace ALL double quote with empty string,
        // and then, replace ALL single quote with empty string.
        process.argv[i].trim().replace(/"/g, "").replace(/'/g, '');
        item += process.argv[i].trim() + " ";
    }
}

////////////////////////////////////////////////////////////////////////////////////

// twitter npm

function getTwitter(searchName, item) {

    console.log("");
    console.log("retrieving your Twitter tweets for : " + searchName);


    var params = { screen_name: 'schowerman', count: 20 };


    myTweets.get('statuses/user_timeline', params, function(err, tweets) {

        if (!err) {

            var counter = 1;
            for (var i = tweets.length - 1; i >= 0; i--) {
                console.log(" ");
                console.log('Tweet #' + (counter) + ' Date Posted : ' + tweets[i].created_at)
                console.log('Text : ' + tweets[i].text);
                console.log(" ");
                console.log("-------------------------------------");
                counter++;
            }
        } else {
            console.log('error occured' + err);
            return;
        }

    });
}


////////////////////////////////////////////////////////////////////////////////////

// spotify npm



function getSpotify(searchName, item) {

    console.log("");
    console.log('retrieving your Spotify search for : ' + item);

    if (!item) {
        item = 'The Sign';
    }

    var parmas = { type: 'track', query: item, limit: 1 };


    songSearch.search(parmas, function(err, data) {

        if (err) {
            console.log('error occured ' + err);
            return;
        }
        // console.log(JSON.stringify(data,null,2));

        console.log("");
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("");
        console.log("Song: " + data.tracks.items[0].name);
        console.log("");
        console.log("Link: " + data.tracks.items[0].preview_url);
        console.log("");
        console.log("Album: " + data.tracks.items[0].album.name);

        // console.log(zooAnimals[4]);

    });
}


///////////////////////////////////////////////////////////////////////////////

//omdb movie search


// run a request to the OMDB API with the movie specified

function getMovie(searchName, item) {

    console.log("");
    console.log("retrieving your OMDB Movie search for : " + item);

    if (!item) {
        item = 'Mr. Nobody';
    }

    request("http://www.omdbapi.com/?t=" + item + "&y=&plot=short&apikey=trilogy", function(err, response, data) {

        // error check === 200 means good to proceed to next step
        if (!err && response.statusCode === 200) {} else {
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

    });
}


////////////////////////////////////////////////////////////////////////////////////////

// read and display random info from ramdom.txt

function getRandom(searchName, songThis) {

    fs.readFile("random.txt", 'utf8', function(err, data) {

        if (err) {
            console.log("There is an error");
        }
        var doWhatArr = [];
        doWhatArr = data.split(",");
        for (var i = 0; i < doWhatArr.length; i++) {
            doWhatArr[i] = doWhatArr[i].trim().replace(/"/g, "");
        }
        var j = 0;
        for (j; j < doWhatArr.length; j++) {

            if (doWhatArr[j] === 'spotify-this-song') {
                getSpotify(doWhatArr[j], doWhatArr[j + 1]);
            }
        }
    });
}

///////////////////////////////////////////////////////////////////////////

if (searchName) {
    if (searchName.toLowerCase().trim() === 'my-tweets') {
        getTwitter(searchName, item);

    } else if (searchName.toLowerCase().trim() === 'spotify-this-song') {
        getSpotify(searchName, item);

    } else if (searchName.toLowerCase().trim() === 'movie-this') {
        getMovie(searchName, item);

    } else if (searchName.toLowerCase().trim() === 'do-what-it-says') {
        getRandom(searchName, item);

    }
}