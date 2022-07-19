// importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
// require("dotenv").config();
// ===------------------------------------------

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors());
app.use(express.json());
// api routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/todo", require("./routes/todo.route"));

async function start() {
  try {
    // Connecting to MongoDB
    const db = await mongoose.connect(config.get("mongoUri"));

    if (db) console.log("connection to MongoDB is successful");
    // Start server
    app.listen(PORT, () =>
      console.log(`server listening on port http://localhost:${PORT}`)
    );
  } catch (error) {
    //   Catching error
    console.log(error);
    process.exit(1);
  }
}

// Starting Process
start();
