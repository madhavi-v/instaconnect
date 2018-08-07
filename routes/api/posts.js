const Posts = require('../../models/Posts');
const express = require('express');
const passport = require('passport');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

const app = express.Router();

//@route GET /api/posts/
//User posts
//@access private

app.get('/', passport.authenticate('jwt', {session : false}),
(req,res) => {
    Posts.findOne({handle : req.profiles.handle})
    .then(posts => {
        if(posts) res.json(posts);
        else {
            res.status(404).json({
                error : 'Could not find any post for this handle'
            });
        }
    }).catch(err => {
        console.log(err);
    });
})

//@route POST /api/posts/
//User posts create
//@access private

app.post('/', passport.authenticate('jwt', {session : false}),
(req,res) => {
    Posts.findOne({handle : req.user.handle})
    .then(posts => {
        
        const newPost = new Posts({
            text : req.body.text,
            handle : req.user.handle
        });
        newPost.save().then(post => res.json(post));
    })
})

//@route POST /api/posts/comments
//User posts create
//@access private

app.post('/', passport.authenticate('jwt', {session : false}),
(req,res) => {
    Posts.findOne({handle : req.profiles.handle})
    .then(posts => {
        
        const newComment = {
            text : req.body.text,
            name : req.body.name
        };
        posts.comments.unshift(newComment);
        posts.save().then(posts => res.json(posts));
    }).catch(err => console.log(err));
})

//@route DELETE /api/posts/delete
//Delete a post
//@access private

app.delete('/delete', passport.authenticate('jwt', {session : false}),
(req,res) => {
    Posts.findByIdAndRemove({_id : req.params.id})
    .then(() => {
        res.json({ success : ture});
    });
})