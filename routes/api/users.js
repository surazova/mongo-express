const express = require('express');
const User = require('../../models/User');
const router = express.Router(); 

//router.get('/', (req, res) => res.json({message: "Welcome to User route"}))

router.get('/', (req,res) => {
  User.find() //going from an external location to get data, we want it to be asynchronous 
    .then((users => {
      res.json(users)
    }))
    .catch(err => console.log(err))  //these are promises 
})

//url /api/users/?name=sitora   (query)
//url /api/users/sitora?comment   (params)
router.get('/:name', (req, res) =>{
  const { name }= req.params.name //use destructuring {name, password, avatar} and then just {name}
  User.findOne({ name })  //set to object
  .then(user => {
    if(!user) {
      return res.status(404).json({message: `User: ${name} not found`})
    }
    res.json(user);  //correct response
    })
  .catch(err => res.status(500).json({message: err}));
})

router.post('/', (req,res) => {
  const {name, password, avatar} = req.body;
  const newUser = new User({
    name, 
    password, 
    avatar
  })
  //newUser.avatar = avatar 
  
  newUser.save()
})


module.exports = router;

