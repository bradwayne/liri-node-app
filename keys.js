console.log('keys are loaded');


exports.twitter = {
    consumer_key: process.env.twitter_consumer_key,
    consumer_secret: process.env.twitter_consumer_secret,
    access_token_key: process.env.twitter_access_token_key,
    access_token_secret: process.env.twitter_access_token_secret
}



exports.spotify = {
    id: process.env.spotify_id,
    secret: process.env.spotify_secret
}