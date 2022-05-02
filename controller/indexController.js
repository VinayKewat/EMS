const { localsName } = require('ejs');
const Employee = require('../model/employe');

// creating flash setuo when it connect succsessfully
module.exports.employeeLogIn = (req,res) =>{
    if(req.isAuthenticated()){
        req.flash('success','Successfully LogIn');
        return res.redirect('/employee/showListToReview');
    }
    return res.render('employeLogin');
}

// making authencation for sighn up
module.exports.employeeSignUp = (req,res) => {
    if(req.isAuthenticated()){
        return res.redirect('/employee/showListToReview');
    }
    return res.render('employeSignUp');
}

// admin login 
module.exports.adminLogin = (req,res) => {
    if(req.isAuthenticated()){
        return res.redirect('/employee/showListToReview');
    }
    return res.render('adminLogin');
}

//making name email passwaord by admin  with alertoption  
module.exports.createEmployee = (req,res) => {
    console.log(req.body);
    Employee.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        isAdmin:false
    },(err)=>{
        if(err){
            console.log('email alredy exists');
            req.flash('error','Employee with same Email alredy exists');
            return res.redirect('back');
        }
        req.flash('success','Successfully created new Employee');
        return res.redirect('back');
    })
}