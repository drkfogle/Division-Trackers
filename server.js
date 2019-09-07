const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

// Load Env
dotenv.config({ path: "./config.env" });

const app = express();

//Dev Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// profile routes
app.use("/api/v1/profile", require("./routes/profile"));

//Handle production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(__dirname + "/public/"));

  //Handles SPA

  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App listening in ${process.env.NODE_ENV} on port ${port}`);
});
