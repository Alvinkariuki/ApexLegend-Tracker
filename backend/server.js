const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load ENV file
dotenv.config({ path: "./config.env" });

const app = express();

// Dev logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//  Handle Production
if (process.env.NODE_ENV === "production") {
  //  Set static folder

  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

// Profile routes
app.use("/api/v1/profile", require("./routes/profile"));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`App Is running on server ${port} `));
