const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create a schema

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
    name : {
        type : String,
        required : true,
        lowercase : true
    },
   handle : {
        type : String,
        required : true,
        lowercase : true
   },
   image : {
       type : String,
       required : false
   },
   interests : {
        type : String,
        required : false
   },
   location :{
        type : String,
        required : false
   },
   website : {
        type : String,
        required : false
   }  
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);