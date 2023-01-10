import mongoose from "mongoose";

const Schema =  mongoose.Schema;

const blogSchema = new Schema({
    head: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Like'
    }]

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
    text:{
        type: String,
        required: true
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