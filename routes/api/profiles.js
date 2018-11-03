const express = require('express');
const Profile = require('../../models/Profile');
const router = express.Router();


//All Profiles
router.get('/', (req,res) => {
    Profile.find()
        .then((profiles => {
      res.json(profiles)
    }))
    .catch(err => console.log(err))  //these are promises 
})

//One Profile
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


//Add new Profile
router.post('/', (req,res) => {
  const {firstName, lastName, age} = req.body;
  const newProfile = new Profile({
    firstName, 
    lastName, 
    age
  })

  newProfile.save()  //asynchronous method
    .then(profile => res.status(201).json(profile))  //when you save, you get the id of the new user, and the date 
    .catch(err => {
      res.status(500)
        .json({
          status: "error", 
          message: err
        });
    })
})

//Update Profile
router.put('/:firstName', (req, res) => {
    const { firstName } = req.params;
    const { lastName, aboutMe, email, age } = req.body;
    
    Profile.findOne({ firstName })
        .then(profile => {
            if(profile) {
                Profile.findOneAndUpdate(
                    {firstName}, 
                    {$set: {lastName, aboutMe, age}}, 
                    {new : true}
                    ).then(updatedProfile => res.json(updatedProfile))
            }
        })
    
})

//Delete Profile
router.delete('/:firstName', (req,res) => {
const firstName = req.params.firstName //use destructuring {name, password, avatar} and then just {name}
  Profile.findOne({ firstName })  //set to object
  .then(profile => {
    if(!profile) {
      return res.status(404).json({message: `User: ${firstName} not found`})
    }
    profile.remove()
      .then(() => res.status(404).json({message:` user ${firstName} successfully deleted`}))
      .catch(err => res.status(500).json(err));
})
});

module.exports = router;

