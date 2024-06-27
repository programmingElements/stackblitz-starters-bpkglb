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