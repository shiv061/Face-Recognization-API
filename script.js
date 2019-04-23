const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    user : 'postgres',
    password : 'pesit123',
    database : 'smartbrain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> { res.send(db.users) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.post('/signin', signin.handleSignin(db, bcrypt))

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})


app.listen(process.env.PORT);