const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// create the schema that will save at mongoDB
// Schema are description of data
const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    coords:{
        lat:{
            type: Number
        },
        lng:{
            type: Number
        }
    }
})

// postSchema.plugin(uniqueValidator);

// create List collection to store data(describe by postSchema)
module.exports = mongoose.model('List', postSchema);