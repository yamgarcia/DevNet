const mongoose = require("mongoose"); //used to connect
const config = require("config"); //lets you define a set of default parameters
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    //most cases of using 'async await' wrap in a try catch block
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }); // since it returns a promise it needs an await
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Failed to connect: " + err.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
