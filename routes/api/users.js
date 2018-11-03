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
  const  name = req.params.name //use destructuring {name, password, avatar} and then just {name}
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
  
  newUser.save()  //asynchronous method
    .then(user => res.status(201).json(user))  //when you save, you get the id of the new user, and the date 
    .catch(err => {
      res.status(500)
        .json({
          status: "error", 
          message: err
        });
    })
})

router.delete('/:name', (req,res) => {
  // TODO: Procted route, make sure the user is the one deleting, not just anyone 


const name = req.params.name //use destructuring {name, password, avatar} and then just {name}
  User.findOne({ name })  //set to object
  .then(user => {
    if(!user) {
      return res.status(404).json({message: `User: ${name} not found`})
    }
    user.remove()
      .then(() => res.status(404).json({message:` user ${name} successfully deleted`}))
      .catch(err => res.status(500).json(err));
})

});



// router.put('/:name', (req, res) => { //a put works similerly to a post, you still need parameters. 
//   const name = req.params.name
//   User.findOne({name})
//   .then(user => {
//     if(!user) {
//       return res.status(409).json({message: `user ${name} already exists`})
//     } else {  //do I need an else? 
//   if(user => {
//   const {name, password, avatar} = req.body;
//   const newUser = new User({
//     name, 
//     password,
//     avatar
  
//   }
//   )
//     newUser.save()  //asynchronous method
//     .then(user => res.status(201).json(user))  //when you save, you get the id of the new user, and the date 
//     .catch(err => {
//       res.status(500)
//         .json({
//           status: "error", 
//           message: err
//         });
//     })
// })

//   //   User.findOneAndUpdate({name})
//   //     .then(() => res.status(204).json({message: `user ${name} successfully updated`}))
//   //     .catch(() => res.status(500).json(err));
  
//   // })
router.put('/:name', (req, res) => {
    const { name } = req.params;
    const { password, avatar } = req.body;
    
    User.findOne({ name })
        .then(user => {
            if(user) {
                User.findOneAndUpdate(
                    {name}, 
                    {$set: {password, avatar}}, 
                    {new : true}
                    ).then(updatedUser => res.json(updatedUser))
            }
        })
    
})

module.exports = router;
