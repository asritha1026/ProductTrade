//require modules
const express = require('express');
const tradesRouting = require('./routes/tradesRouting');
const mainRouting = require('./routes/mainRouting');
const userRouting = require('./routes/userRouting');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose= require('mongoose')
const flash = require('connect-flash');
// create app
const app = express();

//configure app
let host = 'localhost';
let port = 3000;
app.set('view engine','ejs');
//setup routes
// app.get('/', (req,res)=>{
//     res.render('index',{});
// });
//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/Trades',{useUnifiedTopology: true,useNewUrlParser: true, useCreateIndex:true})
.then(() =>{
//start the server
app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
})
})
.catch(err =>console.log(err.message));
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefa",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://localhost:27017/Trades'}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());
app.use((req, res, next) => {
    //console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});
app.use(express.static('public'));

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use('/',mainRouting);
app.use('/trades',tradesRouting);
app.use('/users', userRouting);

//error handling code

app.use((req,res,next)=>{
    let err = new Error('The server cannot locate '+ req.url);
    err.status = 404;
    next(err);
});
    

app.use((err,req,res,next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error',{error:err});

});










