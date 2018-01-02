var keys = require('./keys.js');
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');


var myTweets = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});

var spotifyClient = new spotify({
    id: keys.spotifyKeys.client_id,
    secret: keys.spotifyKeys.client_secret
});

var searchName = process.argv[2];
var movieThis = process.argv[3];
var songThis = process.argv[3];


////////////////////////////////////////////////////////////////////////////////////


// twitter npm

function getTwitter(searchName) {

    if (searchName === 'my-tweets') {
        var params = { screen_name: 'schowerman', count: 20 };

    };

    myTweets.get('statuses/user_timeline', params, function(err, tweets) {


        if (!err) {

            for (var i = 0; i < tweets.length; i++) {
                console.log(" ");
                console.log('Tweet #' + (i + 1) + ' Date Posted : ' + tweets[i].created_at)
                console.log('Text : ' + tweets[i].text);
                console.log(" ");
                console.log("-------------------------------------");
            }
        } else {
            console.log('error occured' + err);
        }


    });
}


////////////////////////////////////////////////////////////////////////////////////

// spotify npm

getSpotify(searchName, songThis);

function getSpotify(searchName, songThis) {

    if (searchName === 'spotify-this-song') {
        if (!songThis) {
            songThis = 'The Sign';
        }

        var parmas = { type: 'track', query: songThis, limit: 5 };

        spotifyClient.search(parmas, function(err, data) {

            if (err) {
                console.log('error occured' + err);
                return;
            }

            for (var i = 0; i < data.tracks.items.length; i++) {
                console.log("Artist: " + data.artists[0].name);
                console.log("Song: " + data.name);
                console.log("Link: " + data.external_urls.spotify);
                console.log("Album: " + data.album[0].name);
            }


        });
    }
}


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


////////////////////////////////////////////////////////////////////////////////////////

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