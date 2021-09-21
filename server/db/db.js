const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server-core');

const connectDB = async () => {
  const mongod = await MongoMemoryServer.create();
  mongoose.Promise = global.Promise;

  try {
    const uriStr = process.env.MONGO_URI ? process.env.MONGO_URI : mongod.getUri();
    const client = await mongoose.connect(uriStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGODB_NAME
    });
    console.log(`MongoDB connected ${client.connection.host}`);
    return client;
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
