const mongoose = require('mongoose');
// When trying to save data to mongoDB, if uniqueValidator detect same data already exist
// uniqueValidator will return error
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// create the schema that will save at mongoDB
// Schema are description of data
const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    }
})

// apply mongoose-unique-validator plugin to userSchema
userSchema.plugin(uniqueValidator)

// create User collection to store data(describe by userSchema)
module.exports = mongoose.model('User', userSchema);