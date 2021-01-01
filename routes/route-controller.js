const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index-controller');
const userController = require('../controllers/user_controller');
const OutletController = require('../controllers/outlet-controller');
const staffController =  require('../controllers/staff_controller');
const distController = require('../controllers/distribute-control');
const fruitController = require('../controllers/fruit_controller');
const merchantController = require('../controllers/merchant_controller');

const jwt_helper = require('../config/jwt_helper');
const mongoose  = require('mongoose');
const UserModel = mongoose.model('User');
const fetch = require("node-fetch");

// router.post('/register' , userController.register);
router.post('/login', userController.login);
router.post('/create-user', userController.createUser);

router.get('/disable-user:id', jwt_helper.verifyJwtToken, userController.disableUser);
router.get('/activate-user:id', jwt_helper.verifyJwtToken, userController.activateUser);
router.get('/get-all-users', jwt_helper.verifyJwtToken, userController.getAllUsers);
router.get('/get-user-details', jwt_helper.verifyJwtToken, userController.getUserDetails);
router.post('/change-password', jwt_helper.verifyJwtToken, userController.resetPassword);





 function checkValidity(req, res, next){
     const userID = req._id;
     console.log(userID)
     UserModel.findById({_id: userID}, (err, user)=> {
         if(user){

             if(user.active){
                next();
             }else{
                 res.status(422).send({msg:"account is under suspenssion!"});
             }
         }else{
             res.status(412).send({msg:'token expire. please do logout/login'})
         }
     })
    
 }

module.exports = router;