// importing passport 
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Employe = require('../model/employe');

// making email passport for login // local stretagy to validate the employe login
passport.use(new localStrategy({usernameField:'email',passReqToCallback:true},(req,email,password,done)=>{ 
   
    //find the userwith unique email exists
    Employe.findOne({email:email},(err,user)=>{ 
        console.log(req.url);

        // making error when emp is entring wrong
        if(err){
            console.log('error while loging in employee -----> Passport');
            return done(err);
        }

        // when entered pass is wrong 
        if(!user || user.password != password){
            console.log('wrong password employee ----> passport');
            req.flash('error','invalid username/Password or you are not admin');
            return done(null,false);
        }
        
        if(user && user.password == password){ //if user and password are both valid
            if(req.url === '/adminLogin-form'){ // check if the request is for Admin login
                if(user.isAdmin != true){ //if the request is for admin login and the user is not a admin
                    return done(null,false); // return callback with false
                }
            }
            console.log('login successfull of employeee -----> passport');
            return done(null,user);
        }
        req.flash('error','invalid username/Password or you are not admin');
        return done(null,false);
    })
}));

// the user id is stored in req.session.passport.user
passport.serializeUser((user,done)=>{ 
    done(null,user.id);
})

// the session id is retrived from cookie and the employee with the id is retrived from db
passport.deserializeUser((id,done)=>{ 
    Employe.findById(id,(err,employe)=>{
        if(err){
            done(err);
        }
        done(null,employe);
    })
})

// to check if the authenticated user is an admin
passport.isAdmin = (req,res,next)=>{ 
    if(req.isAuthenticated() && req.user.isAdmin === true){
        return next();
    }else if(req.isAuthenticated() && req.user.isAdmin != true){
        req.logout();
        return res.redirect('/adminLogin');
    }else{
        return res.redirect('/adminLogin');
    }
};

//to check if the authenticate user is an employee
passport.isEmploye = (req,res,next) =>{ 
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/employeeLogin');
};

// to set the locals.user property on res to be utilised by the EJS while serverside rendering
passport.setAuthenticatedUser = (req,res,next) => { 
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

// export passport for call from index
module.exports = passport;