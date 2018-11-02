const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema ({
    // user: {
    // type: Schema.types.ObjectId,
    // ref: "users",
    // },
    firstName: {
        type: String, 
        require: true,
        unique: true,
    },
    lastName: {
        type: String, 
        require: true, 
    },
    aboutMe: {
        type: String,
    },
    age: {
        type: Number, 
        require: true, 
    }, 
    email: {
        type: String, 
    }
})


module.exports = Profile = mongoose.model("profiles", ProfileSchema);  

