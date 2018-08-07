const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');
//const bcrypt = require('bcryptjs');



const app = express();

//Body-parser middleware
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//Db config
const db = require('./config/keys').mongoURI;

//Connect to MongoDb
mongoose
.connect(db)
.then(() => console.log('MongoDb connected.'))
.catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

// Use routes
app.get('/', (req,res) => res.send('hello'));
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);

const port = 5000;
app.listen(port, ()=> console.log(`server is running on port ${port}`));