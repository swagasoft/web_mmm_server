const mongoose = require('mongoose');
const UserModel = mongoose.model('User');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const fetch = require("node-fetch");
const lodash = require("lodash");
var moment = require('moment');
const expenseAccountModel = mongoose.model('account');
const expenseListModel = mongoose.model('expense_list');
const creditModel = mongoose.model('credit');
const expenseTwoModel = mongoose.model('expense_two');



// login controller
const login = (req, res, done)=> {
    let phone = req.body.number;
    let password = req.body.password;
    UserModel.findOne({phone:phone},(errr, user)=> {
      //  unknown user
      if(!user){
        res.status(404).send({message: 'User not exist.'});
      }else{
    let AppUser = user.phone;
    let databasePassword = user.password;
    let decrypePass = cryptr.decrypt(databasePassword);
    
        if(decrypePass === password){
          token = user.generateJwt(user);
          // send user role to client...
          res.json({"token":token ,  doc: lodash.pick(user, ['role','user_id', 'balance','email','username'])});
    
        }else{
          res.status(401).send({message: ' Invalid User Credentials.'});
        }
    }
    });
    }

    const createUser = (request , response)=> {
      console.log(request.body);
      if(request.body.role){

    var  user = new UserModel();
      user.phone = request.body.phone;
      user.username = request.body.username.toLowerCase();
      user.role = request.body.role;
      let crypePassword = cryptr.encrypt(request.body.password);
      user.password = crypePassword;
      user.save().then((newuser, err)=> {
        if(!err){
          response.status(200).send({message: 'operation successful...'});
        }else{
          response.status(500).send({message : 'Error in user information'});
        }

      }).catch((err)=> {
        console.log(err);
        if(err.errors.username){
          response.status(422).send({message: 'Username has been taken!'});
        }else if(err.errors.phone){
          response.status(499).send({message: 'Phone number has been used or has error!'});
        }else if(err.errors.role){
          response.status(499).send({message: ' Role not  submitted!'});
        }else{
          response.status(501).send({message: 'eror in user information'});
        }
      });
    }else{
      response.status(499).send({message: ' Role not  submitted!'});
    }
    }

    const getAllUsers = (req, res)=> {
      UserModel.find({}, (err, users)=> {
        res.status(200).send({users:users})
      });
    }

    const disableUser = async (req, res)=> {
      const userID = req.params.id;
      await UserModel.findByIdAndUpdate({_id: userID}, ({$set:{active: false}}));
     
      res.status(200).send({msg:'account is now disabled'});
    }
     const activateUser = async (req, res)=> {
      const userID = req.params.id;
      await UserModel.findByIdAndUpdate({_id: userID}, ({$set:{active: true}}));
      console.log(userID);

      res.status(200).send({msg:'account is now active!'});
    }

  
  


  

    
  

    // const thisMonthExpense = async (req, res)=> {
    //   console.log('THIS MONT EXENSE ')
    //   expenseListModel.find({$and:[{qMonth : req.body.month}
    //       ,{qYear: req.body.year}]}).sort({created_at: -1}).limit(70).then((record)=> {
    //       if(record.length == 0){
    //           res.status(404).send({msg:'no record for selected Month!'});
    //       }else{
    //           res.status(200).send({record:record});
    //       }
    //   }).catch((err)=> {
    //     console.log(err);
    //     res.status(444).send({msg:'invalid format'});
    //   })
    // }

 
   

  


 

    // const searcExpense = async(req, res)=> {
    //   const search = req.body.search;
    //   await expenseListModel.find({$and:[{"information": {$regex: search, $options:"i"}}
    //   ,{qMonth:req.body.month},{qYear:req.body.year}]} ,(err, expenses)=> {
    //      if(expenses.length == 0) {
    //          res.status(404).send({msg:'no record found!'})
    //      }else{
    //        res.status(200).send({expenses:expenses});
    //      }
    //    });
  
    // }

    const getUserDetails = async (req, res)=> {
     await UserModel.findById({_id:req._id}).then((user)=> {
        if(user){
          res.status(200).send({user: user});
        }else{
          res.status(404).send({msg:'user not found!'});
        }
      });
    }

    const resetPassword = async (req, res)=> {
      let crypePassword = cryptr.encrypt(req.body.values.password);
      UserModel.findById({_id:req._id}).then((user)=> {
        if(user){
          user.password = crypePassword;
          user.save().then(()=> {
            res.status(200).send({msg: 'PASSWORD HAS BEEN CHANGED!'})
          });
        }else{
          res.status(422).send({msg:'error while trying to change password!'})
        }
      });
     
    }

 






module.exports = {activateUser, login, createUser, getAllUsers,
   disableUser, getUserDetails, resetPassword}