const { application } = require('express');
const express = require('express');
const router = express.Router();
const controller = require('../../controller/employee/showListToReviewController');

// defining home 
router.get('/',(req,res)=>{
    res.send(req.user)
})

// show list review 
router.get('/showListToReview',controller.showListToReview);

// logout 
router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/employeeLogin');
})

// review 
router.use('/review',require('./review'));

// exporting this router 
module.exports = router;