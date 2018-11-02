const express = require('express');
const Profile = require('../../models/Profile');
const router = express.Router();

router.get('/', (req,res) => {
    Profile.find()
        .then((profiles => {
      res.json(profiles)
    }))
    .catch(err => console.log(err))  //these are promises 
})

router.get('/:firstName', (req, res) =>{
  const  firstName = req.params.firstName //use destructuring {name, password, avatar} and then just {name}
  Profile.findOne({ firstName })  //set to object
  .then(profile => {
    if(!profile) {
      return res.status(404).json({message: `User: ${firstName} not found`})
    }
    res.json(profile);  //correct response
    })
  .catch(err => res.status(500).json({message: err}));
})




module.exports = router;
