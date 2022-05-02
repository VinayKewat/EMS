// importing module and routing 

const express = require('express');
const router = express.Router();
const controller = require('../../controller/employee/reviewController');

// this is totally routing we route our things 
router.get('/form/:id',controller.homeView);

router.post('/fidback-form/:id',controller.review_form);

router.get('/myReviews',controller.myReview);

module.exports = router;