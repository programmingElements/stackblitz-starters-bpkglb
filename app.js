const express = require("express");
const dotEnv = require("dotenv");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const ejs = require("ejs");

dotEnv.config()
const app = express();

const PORT = process.env.PORT || 6774;

app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}))

const users = [
  {
    id: "1",
    username: "mahesh",
    password: "mahesh",
    isAdmin: true
  },
  {
    id: "2",
    username: "suresh",
    password: "suresh",
    isAdmin: false
  }
]

// middleware
const verifyUser = (request, response, next) => {
  const userToken = request.headers.authorization
  if (userToken) {
    const token = userToken.split(" ")[1]
    jwt.verify(token, process.env.MYSECRET_KEY, (error, user) => {
      if (error) {
        return response.status(403).json({ err: "token is not valid" })
      }
      request.user = user
      next()
    })
  } else {
    return response.status(401).json({ err: "you are not authenticated" })
  }
}

app.get("/login", (request, response) => {
  return response.render("login")
})


app.post("/api/login", (request, response) => {
  const {username, password} = request.body;
  const user = users.find((person) => {
    return person.username === username && person.password === password
  })

  if (user) {
    const accessToken = jwt.sign({id: user.id, isAdmin: user.isAdmin}, process.env.MYSECRET_KEY, {
      expiresIn: '1h'
    })
    return response.json({
      username: user.username,
      isAdmin: user.isAdmin,
      accessToken
    })
  } else {
    return response.status(401).json({ message: "User Credentials Not Matched!" })
  }
})

app.delete('/api/users/:userId', verifyUser, (request, response) => {
  if (request.user.id === request.params.userId || request.user.isAdmin) {
    return response.status(200).json({ message: "user is deleted successfully" })
  } else {
    return response.status(401).json({ err: "you are not allowed to delete" })
  }
})

app.get("/mahesh", (request, response) => {
  response.render("mahesh")
})

app.get("/suresh", (request, response) => {
  response.render("suresh")
})

app.get("/api/login/:userId", (request, response) => {
  const userId = request.params.userId
  if (userId) {
    if (userId === "1") {
      response.redirect('/mahesh')
    } else if (userId === "2") {
      response.redirect('/suresh')
    }
  } else {
    response.status(403).json({err: "user not found"})
  }
})

app.post('/api/logout', (request, response) => {
  const userToken = request.headers.authorization
  console.log(userToken)
  if (userToken) {
    const token = userToken.split(" ")[1]
    if (token) {
      let allTokens = []
      const tokenIndex = allTokens.indexOf(token) 
      if (tokenIndex !== -1) {
        allTokens.splice(tokenIndex, 1)
        response.status(200).json({message: "Logout Successfully!"})
        return response.redirect('/')
      } else {
        return response.status(400).json({err: "you are not valid user"})
      }
    } else {
      return response.status(400).json({err: "token not found"})
    }
  } else {
    return response.status(400).json({err: "you are not authenticated"})
  }
})

app.get("/api/logout", (request, response) => {
  return response.redirect('/')
})

app.get('/', (request, response) => {
  return response.render('welcome')
})

app.listen(PORT, () => {
  console.log(`Server Started and Running at ${PORT}`);
})