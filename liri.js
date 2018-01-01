var fs = require('fs');

// twiiterKeys linked to keys.js file
var keys = require('./keys.js');

// npm install twiiter
var twitter = require('twitter');

// var myTweets = new twitter(keys.twitterKeys);

// npm install spotify
var spotify = require('spotify');

// node spotift api package
var nodeSpotifyApi = require('node-spotify-api');

// omdb api install request
var request = require('request');

var searchName = process.argv[2];
var movieThis = process.argv[3];
var songThis = process.argv[4];
var action = process.argv[5];



////////////////////////////////////////////////////////////////////////////////////


// twitter npm

function getTwitter(searchName) {

    if (searchName === 'my-tweets') {
        var myTweets = new twitter(keys.twitterKeys);
        var accountName = 'schowerman';
        var params = { screen_name: accountName };

        myTweets.get('statuses/user_timeline', params, function(err, tweets) {


            if (!err) {

                for (var i = 0; i < 20; i++) {
                    console.log(" ");
                    console.log('Tweet #' + (i + 1) + ', Date Posted: ' + tweets[i].created_at)
                    console.log('Text: ' + tweets[i].text);
                    console.log(" ");
                    console.log("-------------------------------------");
                }
            } else {
                console.log('error occured' + err);
            }


        });
    }

}

// var myTweets = new twitter({
//     consumer_key: 'sHbKrQVfMvD99RKE6m5InwhjV',
//     consumer_secret: 'fJRxDIwl1Q4bN8FyVcec91FpaS0Znkti82SkxlRaNI9mQ4I6vV',
//     access_token_key: '946135263625056258-WspOK4qTmZAgY3ZN7CKQNrM9FfkPaV7',
//     access_token_secret: 'dE7ulrmBpo5DsuQkdPNPsSX1Aa49ItW6EvuDNDe4CACSM'
// });




////////////////////////////////////////////////////////////////////////////////////

// spotify npm

getSpotify(searchName, songThis);

function upperCase (string){
    //Capitalize first letter of each part of song name
    return string.toUpperCase();
}
function titleCase(string){
    var firstLetter = /(^|\s)[a-z]/g;
    return string.replace(firstLetter, upperCase);
}


function getSpotify(searchName, songThis) {

    if (searchName === 'spotify-this-song') {
        if (songThis === '') {
            songThis = 'The Sign';
        }

        spotify.search({ type: 'track', query: songThis }, function(err, data) {

            if (err) {
                console.log('error occured' + err);
                return;
            }

            var spotSearch = data.tracks.items[0];
         

            for (var i = 0; i < 20; i++) {
                if (data.tracks.items[i].name == songThis) {
                }
            }

        if (foundSearch.length > 0) {
            console.log("Artist: " + spotSearch.artists[0].name);
            console.log("Song: " + spotSearch.name);
            console.log("Link: " + spotSearch.external_urls.spotify);
            console.log("Album: " + spotSearch.album[0].name);
        }
        else if (foundSearch.length == 0){
            console.log("Spofity could not locate your search!");
        }


            spotify = require('node-spotify-api');

            spotify = new spotify({
                id: '118dd869e80747f187cd15bb1ac9c4b5',
                secret: 'ce8946fa66c045ba9b4352c87eac116d'

            });

        });

    }
}




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
            console.log("Year Released : " + JSON.parse(data).Year);
            console.log("IMDB Rating : " + JSON.parse(data).imdbRating);
            console.log("Rotten Tomatoes Rating : " + JSON.parse(data).tomatoRating);
            console.log("Country Produced : " + JSON.parse(data).Country);
            console.log("Language : " + JSON.parse(data).Language);
            console.log("Plot : " + JSON.parse(data).Plot);
            console.log("Actors : " + JSON.parse(data).Actors);
            console.log("");
            console.log("");

        });

    }

}