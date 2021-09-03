const PostSchema = require('../models/post');
const HttpError = require('../util/httpError');
const getGeolocate = require('../util/location');

exports.getAllPosts = async(req, res, next) => {
    let resultData;
    try{
        // find all documents
        resultData = await PostSchema.find({})
    }catch(err){
        console.log(err)
        return next(new HttpError(500, "There's no post in database!"))
    }
    // return all docs in json format
    res.json(resultData)
}

exports.addNewPost = async(req, res, next) => {
    const {title, location, imageUrl, description} = req.body;

    let coordinates;
    try{
        coordinates = await getGeolocate(location);
    }catch(err){
        return next(new HttpError(500, "Location is invalid!"))
    }
    
    try{
        const newPost = new PostSchema({
            title,
            location,
            imageUrl,
            description,
            coords: coordinates
        })
        await newPost.save() // save to MongoDB database (like push new post to exist post arr)
        res.json(newPost);
    }catch(err){
        console.log(err);
        return next(new HttpError(500, "Add New Post Failed!"))
    }
}

exports.deletePost = async(req, res, next) => {
    const {id} = req.body;
    let deletePost;
    try{
        deletePost = await PostSchema.findByIdAndDelete(id);
    }catch(err){
        console.log(err);
        return next(new HttpError(500, "Delete post failed!"))
    }
    res.json(deletePost);
}

exports.editPost = async(req, res, next) => {
    const {id, title, location, imageUrl, description} = req.body;

    let editCoords;
    try{
        editCoords = await getGeolocate(location);
    }catch(err){
        console.log(err)
        return next(new HttpError(500, "Location is invalid!"))
    }

    let updatePost = {
        title,
        location,
        imageUrl,
        description,
        coords: editCoords
    }

    let updateSpecifyPost;
    try{
        updateSpecifyPost = await PostSchema.findByIdAndUpdate(id, updatePost);
    }catch(err){
        return next(new HttpError(500, "Update Post failed!"))
    }
    res.json(updateSpecifyPost);
}