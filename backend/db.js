const mongoose = require("mongoose");

const dbUri = process.env.MONGO_URI;

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useNewUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected to PORT");
  })
  .catch((error) => {
    console.log("Some error: ", error);
  });


const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
}) 

const User = mongoose.model("User", userSchema);

module.exports = {
    User
}