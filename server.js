const express = require('express'); 
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
//keys
const db = require('./config/keys').mongoURI; 

mongoose  
    .connect(db)
    .then(() => console.log("mongoDB connected"))
    .catch(err =>console.log(err))

const app = express();


app.use(bodyParser.urlencoded({extended: false})) 
app.use(bodyParser.json()) 

//router 
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');

app.use('/api/users', users);
app.use('/api/profiles', profiles);

app.get('/', (req, res) => res.send(`<h1>Hello</h1>`))



//Port
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`App listening on port ${port}`))



  