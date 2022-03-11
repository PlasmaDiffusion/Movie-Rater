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
  "@cluster0-qjfez.mongodb.net/graphql_test?retryWrites=true&w=majority";
const connection = mongoose.connection;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, ()=>{
    console.log('now listening for requests on port 4000')
});