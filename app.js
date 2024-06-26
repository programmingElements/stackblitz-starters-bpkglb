require('dotenv').config()
const express = require('express');
const {MongoClient} = require("mongodb");

const app = express();

const port = 5000;

// console.log(process.env);

// MongoDB Connected With NodeJS Using [mongodb] library

MongoClient.connect(`${process.env.MONGODB_URI}`).then(() => {
  console.log("MongoDB Connected Successfully!")
})
.catch((error) => {
  console.log("MongoDB Connection Failed ", error)
})

// app.use((request, response, next) => {
//   if (10 < 20) {
//     next();
//   }
// });

const firstHandler = (request, response, next) => {
  if (10 < 20) {
    next();
  }
};

const secondHandler = (request, response, next) => {
  if (40 < 20) {
    next();
  } else {
    console.log('Sorry you are not allowed');
  }
};

const thirdHandler = (request, response, next) => {
  if (30 > 20) {
    next();
  }
};

app.get('/home', firstHandler, (request, response) => {
  response.send('Hello, I am Home Page');
});

app.get('/about', secondHandler, (request, response) => {
  response.send('This is about page');
});

app.get('/user/:121', thirdHandler, (request, response) => {
  response.send('You searched for 121');
});

app.listen(port, () => {
  console.log(`Server Start and Running Successfully on ${port}`);
});
