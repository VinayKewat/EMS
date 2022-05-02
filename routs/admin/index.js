// here making setup  of assighn 
// review
// make admin 
// logout


const { application } = require('express');
const express = require('express');
const router = express.Router();
const assignController = require('../../controller/admin/AssignController');

router.get('/assignForReview',assignController.assignForReview);
router.get('/logout',assignController.logout);
router.post('/assignForReview-form',assignController.assignForReviewForm);
router.post('/makeAdmin-form',assignController.makeAdmin_form)
router.get('/makeAdmin',assignController.makeAdmin);

router.use('/employeeManagement',require('./employeeManagement'));

// export the router 
module.exports = router;