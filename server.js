require('dotenv').config(); // used to load enviroment variable from .env file by using process.env
const express = require('express'); // create express app
const mongoose = require('mongoose'); // an Object Data Modeling (ODM) library for MongoDB and Node.js
const cors = require('cors') // allow cross domain http request
const postRouter = require('./routes/post-route');
const userRouter = require('./routes/user-route');
const HttpError = require('./util/httpError'); // custom error handler
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
// const csrf = require('csurf');
const PORT = process.env.PORT || 5000;
// const store = new MongoDBStore({
//     uri: process.env.MONGODB_URL,
//     collection: 'session'
// })
// const csrfProtection = csrf();
const app = express(); // create express app

// telling express to parse the body as JSON on every request
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({
//     secret: 'auth',
//     resave: false,
//     saveUninitialized: false,
//     store: store
//     // cookie:{
//     //     path: '/',
//     //     maxAge: 1000 * 60 * 3
//     // }
// }))

// app.use(csrfProtection);

// app.use((req, res, next) => {
//     console.log(req.session)
//     res.locals.csrfToken = req.csrfToken();
//     next()
// })

// run router middleware on homepage path
app.use(postRouter);
app.use(userRouter);

// catch wrong route and throw error
app.use((req, res, next) => {
    throw new HttpError(404, "Can't find specify route")
})

// error handling middleware
app.use((err, req, res, next) => {
    if(res.headersSent){
        return next(err)
    }
    return res.status(err.statusCode || 500).json({message: err.message || "An unknown error occur"})
})

mongoose.connect(process.env.MONGODB_URL, {
    //useNewUrlParser - must set true, 設置時需有端口 ex: localhost":5000" 
    //useUnifiedTopology - choose connect the MongoDB driver's new connection management engine
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        app.listen(PORT);
        console.log('PORT is connected!');
    })
    .catch(err => console.log(err));