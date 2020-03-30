const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const rank = require('./controllers/rank')
const image = require('./controllers/image')
const db = require('knex')({
  client: 'pg',
  connection: {
    connectionString: 'postgres://uongdzwsubysdx:fd5bacb65279aaa1ae57097a0bcbf82819dfe84fddd0c9395637df04bba324b3@ec2-54-197-48-79.compute-1.amazonaws.com:5432/d1k9m2eiorhi8n',
    ssl: true,
  }
})

const app = express();

//body parser allows us to read stuff from the body of requests
app.use(bodyParser.json())

//cors lets us 
app.use(cors());

//get request for root
app.get('/', (req, res)=> {
	res.send('it is working')
})

//post request for signin
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

//post request for register
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

//:id allows us to enter anything into our browser e.g. /profile/123
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

//gets the users rank from the users table
app.put('/rank', (req, res) => { rank.handleRank(req, res, db)})

//increments the entries count
app.put('/image', (req, res) => { image.handleImage(req, res, db) }) 
app.post('/imageurl', (req, res) => { image.handleAPICall(req, res) }) 


app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running on port ${process.env.PORT}`);
})

