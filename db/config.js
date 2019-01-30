const mongoose = require('mongoose');

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${
    process.env.DB_PASSWORD
  }@playeddit-shard-00-00-l3xne.mongodb.net:27017,playeddit-shard-00-01-l3xne.mongodb.net:27017,playeddit-shard-00-02-l3xne.mongodb.net:27017/${
    process.env.DB_NAME
  }?ssl=true&replicaSet=playeddit-shard-0&authSource=admin&retryWrites=true`,
  { useNewUrlParser: true },
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connection success!');
});
