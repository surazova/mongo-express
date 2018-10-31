const express = require('express'); //framework
const bodyParser = require('body-parser'); //middleware
const mongoose = require('mongoose');
//keys
const db = require('./config/keys').mongoURI; //grabbing the mongo key 

mongoose  //connect to the db in a synchronous way
    .connect(db)
    .then(() => console.log("mongoDB connected"))
    .catch(err =>console.log(err))

const app = express();

//use body-parser
app.use(bodyParser.urlencoded({extended: false})) 
app.use(bodyParser.json()) //parser urlencoded, not the extended, and then return the data in json format 

//adding router 
const users = require('./routes/api/users');

app.use('/api/users', users);

app.get('/', (req, res) => res.send(`<h1>Hello</h1>`))



//Port
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`App listening on port ${port}`))



