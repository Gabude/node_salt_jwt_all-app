const express = require('express');
const mongoose = require('mongoose');
//const session = require('express-session');

const authRoutes = require('./routes/authRoutes')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = '';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);
//app.use(session({session: 'my secret', resave: false, saveUninitialized: false}))