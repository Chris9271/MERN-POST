// used to validate is invalid or not
// const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const HttpError = require('../util/httpError');
const UserSchema = require('../models/user');

exports.addUser = async(req, res, next) => {
// Extracts the validation errors from a request and makes them available in a Result object.
    // const validateResult = validationResult(req);
// An object that holds the current state of validation errors in a request and allows access to it in a variety of ways.
// if userInput have some error
    // if(!validateResult.isEmpty()){
// if there is an error occur, will show the error location, param, and value
    //     return res.json({errors: errors.array()})
    // }
    const {username, email, password} = req.body;
    let userExist;
    let hashPassword;
    let newUser;
    try{
        userExist = await UserSchema.findOne({email});
        if(userExist){
            res.redirect('/sign');
            return next(new HttpError(422, "This email address already exist."))
        }
        // help to store password safely
        // encrypt data with specific saltRound to generate hash data
        hashPassword = await bcrypt.hash(password, 12)
        newUser = new UserSchema({
            username,
            email,
            password: hashPassword
        })
        await newUser.save();
    }catch(err){
        console.log(err)
        return next(new HttpError(500, "Sorry, something went wrong..."))
    }
    res.json(newUser)
}

exports.userLogin = async(req, res, next) => {
    const {email, password} = req.body;
    let findUser;
    let matchPassword;
    try{
        findUser = await UserSchema.findOne({email});
        if(!findUser){
            return next(new HttpError(500, "Can't find match user"))
        }
        console.log(findUser)
        matchPassword = await bcrypt.compare(password, findUser.password)
        if(!matchPassword){
            res.redirect('/login');
            return next(new HttpError(500, "Password is incorrect, please try again."))
        }
    }catch(err){
        console.log(err)
        return next(new HttpError(500, "Login failed, please try again..."))
    }
    res.json(findUser);
}
