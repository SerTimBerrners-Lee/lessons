const { MongoClient } = require("mongodb");
const connectionString ='mongodb+srv://davidperov:1q2w3e4r5t0987654321@cluster0.tzri0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  connectToServer: new Promise((resolve, reject) => {
    client.connect((err, db) => {
      if(err || !db) return reject(err)
      dbConnection = db.db('cluster')
      return resolve('Success connection mongodb')
    })
  }),

  getCollection: function (nameCollection) {
    return dbConnection.collection(nameCollection);
  },
};