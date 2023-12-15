const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const path = require('path'); 

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


const users = [
  { id: 1, username: 'demoUser', password: 'password123' }
];


passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log('LocalStrategy called');
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      console.log('Authentication successful');
      return done(null, user);
    } else {
      console.log('Authentication failed');
      return done(null, false, { message: 'Incorrect username or password' });
    }
  }
));

passport.serializeUser((user, done) => {
  console.log('Serializing user');
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  console.log('Deserializing user');
  done(null, user);
});


app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); 
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }),
  (req, res) => {
    console.log('POST /login callback');
    
    res.redirect('/');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  console.log('User logged out');
  res.redirect('/');
});

app.get('/profile',
  (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log('User is authenticated');
      return next();
    }
    console.log('User is not authenticated, redirecting to /login');
    res.redirect('/login');
  },
  (req, res) => {
    console.log('Accessing profile page');
    res.send(`Profile Page - Welcome, ${req.user.username}!`);
  }
);



app.listen(3000);
