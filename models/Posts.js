const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create a schema

const PostsSchema = new Schema({
    handle : {
        type: String,
        ref: 'users'
    },
    text : {
        type : String,
        required : true
    },
    image :{
        type : String,
        required : false
    },
    description : {
        type : String,
        required : false
    },
    comments : [{
        text : {
            type : String,
            required : false,
        },
        name : {
            type : String,
            
        },
        date : {
            type : Date,
            default : Date.now
        }
    }]
});

module.exports = Posts = mongoose.model('post' , PostsSchema);