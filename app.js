const express = require("express");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
const { connectDB } = require("./src/db");
const {employeeRouter} = require("./src/routes/employee.routes");
const ejs = require("ejs");
const session = require("express-session");

dotEnv.config()
const app = express();

const PORT = process.env.PORT || 6774;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.json());

app.use(session({
  secret: "This is a secret",
  resave: false,
  saveUninitialized: true,
}))

// app.get("/grapes", (request, response) => {
//   response.render("samplepage")
// })

app.get('/login', (request, response) => {
  response.render("login")
})

app.get('/register', (request, response) => {
  response.render("register")
})

app.get('/dashboard', (request, response) => {
  response.render("welcome")
})

app.use('/employees', employeeRouter);

connectDB()
.then(() => {
  console.log("MongoDB Connected Successfully!")
})
.catch((error) => {
  console.log("MongoDB Connection Failed ", error)
})

app.listen(PORT, () => {
  console.log(`Server Started and Running at ${PORT}`);
})