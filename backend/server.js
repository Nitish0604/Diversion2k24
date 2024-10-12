const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT || 5000; // Use a default port if PORT is not specified in the environment
const { dbconnect } = require("./config/database");

const childcare = require("./routes/childcare");


// Connect to the database
dbconnect();

// Middleware to parse incoming JSON requests

app.use(
  cors("*")
)
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For URL-encoded payloads


// Mount the childcare route
app.use("/api/PlusCare/Home", childcare);

// Start the server
app.listen(PORT, () => {
  console.log(`Server started successfully on port ${PORT}`);
});


app.use('/', (req, res) => {
  res.send("Hello World");
});
