// importing module 
const express = require('express');
const db = require('./config/mongoose');
const passport = require('passport');
const localStrategy = require('./config/pasport-local-strategy');
const session = require('express-session');
const layout = require('express-ejs-layouts');
const mongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customeMWare = require('./config/midelware');
const port = 8080;

const app = express();

app.use(express.static('./assets'));

// setting ejs 
app.set('views','views');
app.set('view engine','ejs');
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// makinf sesssion
app.use(express.urlencoded({extended:true}));
app.use(layout);
app.use(session({
    name:'empReviewSystem',
    secret:'pas',
    resave:false,
    saveUninitialized:false,
    store:mongoStore.create({
        mongoUrl:'mongodb://localhost/EmployeReviewSystemDev',
        autoRemove:'disabled'
    },(err)=>{console.log(`error connecting to mongoDb during session creation ${err}`)}),
    cookie:{
        maxAge: (1000*60*60)
    }
}));

// passport authencation
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//set the flash
app.use(flash());
app.use(customeMWare.setFlash);

app.use('/',require('./routs'));

// port listenning 
app.listen(port,(err)=>{
    if(err){
        console.log('❌ error starting the server');
    }
    console.log(`✅ server up and running on port ${port}`);
})