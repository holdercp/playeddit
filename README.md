# playeddit

## Getting Started Locally
Ensure you have MongoDB installed on your system or have a hosted option, like Mongo Atlas. Instructions can be found [here](https://docs.mongodb.com/manual/tutorial/getting-started/).

You will also need to create a Spotify app to get your client id and secret. [Instructions here](https://developer.spotify.com/documentation/web-api/quick-start/)


Do the same for reddit. [Instructions](https://github.com/reddit-archive/reddit/wiki/OAuth2)

- Create a `.env` file in the root of the project. Copy the contents of `env.dist` and set your variables particular to your environment.
- Run `npm install`
- `cd client` and set you `.env` file there using the same method as above.
- Run `npm install` here as well
- `cd` back to the root and run `npm run dev`. This will start the Express server (localhost:5000) and the client server (localhost:3000).