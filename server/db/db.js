const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.Promise = global.Promise;
  try {
    const client = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGODB_NAME
    });
    console.log(`MongoDB connected ${client.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
