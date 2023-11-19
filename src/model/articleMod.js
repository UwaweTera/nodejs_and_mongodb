import { number } from "joi";
import mongoose from "mongoose";

const Schema =  mongoose.Schema;

const blogSchema = new Schema({
    head: {
        type: String,
        required: true
    },
    image: {
        public_id:{
            type: String,
            required:true
        },
        url:{
            type: String,
            required:true
        }
    },
    body: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }],
    likes: {
        count: {
            type: Number,
            default: 0
        },
        Peaples: []
    },

    userPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Signup'
    },
    date: {
        type: String
    }

});

const Post = mongoose.model("Post",blogSchema);


//create comment schema
const commetSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    date: {
        type: String
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }  
});
const Comment = mongoose.model("Comment", commetSchema);




//add like
const likeSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'UserReg'
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    }
  
},{timestamp: true});

const Like = mongoose.model("Like", likeSchema);

export {Post, Comment, Like};