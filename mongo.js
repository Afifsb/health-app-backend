const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/health-monitoring-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log("Failed to connect to MongoDB");
  });

const newSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Collection = mongoose.model("collection", newSchema);

module.exports = Collection;