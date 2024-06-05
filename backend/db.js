const mongoose = require("mongoose");
const { MONGO_URI } = require('./config');
// const dbUri = process.env.MONGO_URI;

mongoose  
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected!");
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

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
})

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);


module.exports = {
    User,
    Account
}