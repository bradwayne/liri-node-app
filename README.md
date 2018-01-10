
This project is a Language Interpretation and Recognition Interface.

This node interface will accept the following commands.

1) node liri.js my-tweets
   This will display the last 20 tweets that is connected to the key. At the moment the key is linked to my dummy twitter account.

2) node liri.js spotify-this-song "song to search here"
   After you input your song search, node will display the following information
       a) Artist - the artist or band
       b) Song - the song you just searched
       c) Link - an html link to the song or snippet of song
       d) Album - the album the this song can be found on

3) node liri.js movie-this "movie to search here"
   After you input your movie search, node will display the following information
       a) Title - the title or name of the movie you just searched
       b) Rated - the rating of the movie (G, PG, PG-13, R... hopefully you will not be needing the 'X' rating but it will be available)
       c) Year Released - the year the movie was released into theaters
       d) IMDB Rating - the imdb rating system
       e) Rotten Tomatoes - the rotten tomatoes rating system
       f) Country Produced - the country or countries the film was produced in
       g) Language - the language or languages the film was released in
       h) Plot - a brief description of the plot for the movie
       i) Actors - a list of the main actors and actresses that starred in the movie

4) node liri.js do-what-it-says
   This will read the data from the random.txt file and run the command. At the moment the command is set to 'spotify-this-song', and the song has already been predetermined.
