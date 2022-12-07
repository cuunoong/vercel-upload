const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let database = mongoose.connection;

database.on("error", console.error.bind(console, "Database connection error"));
database.once("open", () => {
  console.log("Database connected");
});

module.exports = database;
