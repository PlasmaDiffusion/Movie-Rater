const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
require('dotenv').config();

const cors = require("cors");

const app = express();
app.use(cors());

const uri =
  "mongodb+srv://admin:" +
  process.env.PASSWORD +
  "@cluster0-qjfez.mongodb.net/" +
  process.env.DATABASE +
  "?retryWrites=true&w=majority";
const connection = mongoose.connection;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(process.env.PORT || 4000, ()=>{
    console.log(`now listening for requests on port ${process.env.PORT || 4000}`)
});