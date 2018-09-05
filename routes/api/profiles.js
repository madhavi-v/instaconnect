const express = require('express');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

const passport = require('passport');
const mongoose = require('mongoose');

const appProf = express.Router();
//@route GET /api/profiles/
//User profile
//@access private

appProf.get('/', 
passport.authenticate('jwt', {session : false}),
(req,res) => {

Profile.findOne({user : req.user.id})
.then(profile => {
    console.log("profile is : " + profile);
    if(!profile){
        return res.status(404).json({
            profile : 'Profile does not exist for this user. Please create profile.'
        })
    }
    res.json(profile);
    })
  }
)

// @route GET /api/profiles/:handle
//@desc find profile by handle
//@access private

appProf.get('/:handle', passport.authenticate('jwt', {session : false}),
(req,res) => {
    Profile.findOne({handle : req.params.handle})
    .then(profile => {
        if(profile) res.json(profile);
        else res.json({
            err : "There is no profile with this handle"
        });
    });
} )

// @route GET /api/profiles/name/:name
//@desc find profile by name
//@access private

appProf.get('/name/:name', passport.authenticate('jwt', {session : false}),
(req,res) => {
    Profile.findOne({name : req.params.name})
    .then(profile => {
        if(profile) res.json(profile);
        else res.json({
            err : "There is no profile with this name"
        });
    });
} )


// @route POST /api/profiles
//@desc create or edit user
//@access private

appProf.post('/', passport.authenticate('jwt', {session : false}),
(req,res) =>{
   //Get form fields
   //console.log("In POST");
   const profileFields = {};
   profileFields.user = req.user.id;
   if(req.body.name) profileFields.name = req.body.name;
   if(req.body.handle) profileFields.handle = req.body.handle;
   if(req.body.interests) profileFields.interests = req.body.interests;
   if(req.body.location) profileFields.location = req.body.location; 
   if(req.body.image) profileFields.image = req.body.image;
   if(req.body.website) profileFields.website = req.body.website;

   Profile.findOne({ user: req.user.id })
    .then(profile => {
    if(profile) { 
         
         Profile.findOneAndUpdate(
             { user : req.user.id },
            {$set : profileFields},
            { new : true }
        ).then(profile => res.json(profile));
     } else {
         
         Profile.findOne({handle : profileFields.handle})
            .then(profile => {
                if(profile){
                        res.status(400).json({
                        handle : 'Handle already exists'
                    });
                }
                new Profile(profileFields)
                .save()
                .then(profile => res.json(profile));
            }).catch(err => console.log(err))
            
     }
    });
})

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
appProf.delete('/', passport.authenticate('jwt' , {session : false}), (req,res) => 
{
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({_id : req.user.id}).then(() =>
    res.json({success : true}));
    })
})

module.exports = appProf;