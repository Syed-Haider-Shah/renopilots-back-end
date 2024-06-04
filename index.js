const cors = require("cors");
const express = require("express");
const { userCollection } = require("./mongo/mongo.js");
const PORT = 8000; //set port in environmental variable
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//use postman for testing
app.get("/", (req, res) => {
  res.json("HEllo");
  console.log("works locally")
});

app.get("/account", (req, res) => {
  res.json("HEllo2");
});

app.post("/account", async (req, res) => {
  try {
    const email = req.body.cookieValue;
    const check = await userCollection.findOne({ email: email });
    res.json(check);
  } catch (e) {}
});

//posting stuff to database from signup
app.post("/signup", async (req, res) => {
  const formData = req.body.formData;
  const data = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
  };
  try {
    const check = await userCollection.findOne({ email: formData.email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      console.log("not exist");
      await userCollection.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
    console.log(e);
  }
});

//posting stuff to database from signup
app.post("/signupho", async (req, res) => {
  const formData = req.body.formData;
  const post = req.body.postcode;
  const choice = req.body.choice;
  const data = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    postcode: post,
    choice: choice,
  };
  try {
    const check = await userCollection.findOne({ email: formData.email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      console.log("not exist");
      await userCollection.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
    console.log(e);
  }
});

app.post("/signuppro", async (req, res) => {
  const formData = req.body.formData;
  const post = req.body.postcode;
  const choice = req.body.choice;
  const data = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    postcode: post,
    choice: choice,
  };
  try {
    const check = await userCollection.findOne({ email: formData.email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      console.log("not exist");
      await userCollection.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
    console.log(e);
  }
});

app.post("/signupcon", async (req, res) => {
  const formData = req.body.formData;
  const state = req.body.state;
  const country = req.body.country;
  const choice = req.body.choice;
  const data = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    state: state,
    country: country,
    choice: choice,
  };
  try {
    const check = await userCollection.findOne({ email: formData.email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      console.log("not exist");
      await userCollection.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
    console.log(e);
  }
});

app.post("/hello", async (req, res) => {
  try {
    const email = req.body.cookieValue;
    const check = await userCollection.findOne({ email: email });
    res.json(check.name);
  } catch (e) {
    console.log(e);
  }
});

//posting stuff to database from login
app.post("/login", async (req, res) => {
  const formData = req.body.formData;
  console.log(formData.password);
  try {
    const check1 = await userCollection.find({ email: formData.email });
    const check2 = await userCollection.find({
      $and: [{ email: formData.email }, { password: formData.password }],
    });

    if (!Object.keys(check1).length == 0) {
      if (!Object.keys(check2).length == 0) {
        res.json("loginPass");
        console.log("loginpass");
      } else {
        res.json("loginFail");
        console.log("loginfail");
      }
    } else {
      res.json("nouser");
      console.log("nogthing");
    }
  } catch (e) {
    res.json("fail");
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log("port connected");
});
