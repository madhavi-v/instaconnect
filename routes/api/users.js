const express = require('express');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express.Router();
const keys = require('../../config/keys');



//@route POSt api/users/register
//Register user 
//@access public
app.post('/register', (req,res) => {
    User.findOne({email : req.body.email})
    .then(user => {
        if(user) {
            return res.status(400).json({
                email : 'Email already exists'
            });
        } else {
            const newUser = new User({
                id : req.body.id,
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
            });
    //bcrypt hash
   // const saltRound = 10;
        bcrypt.genSalt(10, (err, salt) => {
            if(err) throw err; //Failed salt generation
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err; //Failed hash
            newUser.password = hash;
            newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        })
        })
        }
    })
});

//@route POSt api/users/login
//Register user 
//@access public
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
    .then(user => {
        if(!user){
            return res.json({
                email : 'Could not find email. Please register and login.'
            })
        
        } else {
            bcrypt.compare(password, user.password)
                .then(matched => {
                    
                    if(matched){
                        const payload = {
                            id: user.id,
                            name : user.name,
                            email : user.email
                        };
    
                        jwt.sign(payload, keys.secretOrKey, {expiresIn : 3600}, (err,token) => {
                            res.json({
                                success : true,
                                token : 'Bearer ' + token
                            });
                        })
                        
                    } else {
                        return res.json({
                            msg : 'Please enter correct password'
                        })
                    }
                })
        }
    })
})

module.exports = app;