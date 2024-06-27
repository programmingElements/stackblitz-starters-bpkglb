const express = require("express");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
const { connectDB } = require("./src/db");
const {employeeRouter} = require("./src/routes/employee.routes");
const ejs = require("ejs");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { User } = require("./src/models/user.models");
const bcrypt = require('bcryptjs');

dotEnv.config()
const app = express();

const PORT = process.env.PORT || 6774;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.get("/grapes", (request, response) => {
//   response.render("samplepage")
// })

const checkAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next()
  } else {
    res.redirect('/signup')
  }
}


app.use('/employees', employeeRouter);

connectDB()
.then(() => {
  console.log("MongoDB Connected Successfully!")
})
.catch((error) => {
  console.log("MongoDB Connection Failed ", error)
})

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "mysession"
})

app.use(session({
  secret: "This is a secret",
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.get('/login', (request, response) => {
  response.render("login")
})

app.get('/signup', (request, response) => {
  response.render("register")
})

app.get('/dashboard', checkAuth, (request, response) => {
  response.render("welcome")
})

app.post('/register',async (request, response) => {
  const {username, email, password} = request.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return response.redirect("/signup")
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = new User({username, email, password: hashedPassword});
    request.session.person = newUser.username

    await newUser.save();
    response.redirect('/login');
  } catch (error) {
    console.log("Error : ", error);
    response.redirect('/signup');
  }
})

app.post('/user-login', async (request, response) => {
  try {
    const {email, password} = request.body;
    const user = await User.findOne({email});
    if (!user) {
      return response.redirect('/signup')
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      return response.redirect('/signup')
    }
    request.session.isAuthenticated = true
    return response.redirect('/dashboard')
  } catch (error) {
    console.log("Error : ", error);
    response.redirect('/login');
  }
})

app.post('/logout', (request, response) => {
  request.session.destroy((err) => {
    if (err) {
      throw err;
    }
    response.redirect('/signup')
  })
})


app.listen(PORT, () => {
  console.log(`Server Started and Running at ${PORT}`);
})