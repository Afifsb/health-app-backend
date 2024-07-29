const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

const Collection = require("./mongo");

app.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await Collection.findOne({ email });
    if (existingUser) {
      return res.json("exist");
    }

    const newUser = new Collection({
      fullName,
      email,
      password,
    });

    await newUser.save();
    res.json("Register successfully");
  } catch (error) {
    console.error("Registration error:", error);
    res.json("fail");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Collection.findOne({ email });

    if (!user) {
      return res.json("notexist");
    }

    if (user.password !== password) {
      return res.json("fail");
    }

    res.json("success");
  } catch (error) {
    console.error("Login error:", error);
    res.json("fail");
  }
});

const PORT = process.env.PORT || 8000;

mongoose
  .connect("mongodb://localhost:27017/health-monitoring-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server connected on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });