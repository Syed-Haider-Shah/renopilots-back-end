const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://mongodbuser:haider1@renopilots.zbs1ksa.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("mongo connected");
  })
  .catch((error) => {
    console.log(error);
    console.log("Failed to Connect");
  });
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: false,
    length: 4,
  },
  state: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  choice: {
    type: String,
    required: true,
  },
});

const userCollection = mongoose.model("userCollection", userSchema);

const collection = {
  userCollection,
};

module.exports = collection;
