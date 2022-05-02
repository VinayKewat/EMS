const Employee = require('../../model/employe');

// show list for reviewed by admin 
module.exports.showListToReview = (req,res) => {
    Employee.findById(req.user.id).populate('toReview').exec((err,a)=>{
        res.render('showListToReview',{employee:a});
    })
    
}