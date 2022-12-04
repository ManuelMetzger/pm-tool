const path = require("path");
const express = require("express");
const colors = require("colors");
const cors = require("cors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const connectDB = require("./config/db");

const mode = process.env.NODE_ENV;
const port = process.env.NODE_ENV === "production" ? process.env.PORT : 5000;

const app = express();

// Serve built page if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static(path.resolve(__dirname, "..", "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

// Connect to DB
connectDB();

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(
  port,
  console.log(`Server running in ${mode} mode on port ${port}...`)
);
