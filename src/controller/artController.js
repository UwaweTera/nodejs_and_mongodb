
import mongoose from "mongoose";
import 'dotenv/config';
import {Post, Comment, Like} from "../model/articleMod";
import session from 'express-session';
import { Signup } from "../model/registerMod";


//some global variable
const SecretKey = process.env.JWT_SECRET;
const userSecret = process.env.USER_SECRET;



//adding blog post
const addBlog =async (req,res)=>{
    try {
        const {head,image,body} = req.body;
        const insBlog = new Post({
            head,
            image,
            body
        })
        const blog = await insBlog.save();
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json('Server Error. try to add blog later')
    }
      
}




//get all blogs

const getBlogs = async(req, res)=>{
        try {
            let allBlogs = await Post.find().populate('comments')
            res.status(200).send(allBlogs);   
        } catch (error) {
            res.status(500).json('Server Error. try to add blog later')
        }
        
}

//Get blogs by id
const getBlogById = async(req, res)=>{
    try {
        const id = req.params.id;
        let allBlogs = await Post.findById(id).populate('comments');
        res.status(200).json(allBlogs);
    } catch{
        res.status(404).json('no blog found')
    }    
}

//Update blog
const updateBlog = async(req,res)=>{
    try{
        const id = req.params.id;
        const post = await Post.findOne({_id: id});
        if(req.body.head){
            post.head = req.body.head;
        }
        if(req.body.image){
            post.image = req.body.image;
        }
        if(req.body.body){
            post.body = req.body.body;
        }
        await post.save()
        res.status(200).send(post)
        
    }catch(error){
        console.log(error)
        res.status(404).json({error: "blog doesn't exit"});
    }
    
}
//Delete blog
const deleteBlog = async(req,res)=>{
    try{
        let id = req.params.id;
        await Post.deleteOne({_id: id});
        res.status(200).json({msg: 'blog deleted'});          
    }catch{
        res.status(404).json({error: "port doesn't exist"});
    }
}

//add comment to specified blog
const addComm = async(req,res)=>{

    try {
        const id = req.params.id;
        let user = await Signup.findOne({_id: req.user._id});
        const name = user.name;
        const email = user.email; 
        const text = req.body.text; 
        const comment = new Comment({
            name,
            email,
            text,
            blogId: id
        });
        await comment.save()
        const specifiedBlog = await Post.findById(id).populate('comments')
        specifiedBlog.comments.push(comment);
        specifiedBlog.save()
        res.status(200).json(comment)     
    } catch (error) {
        res.status(500);
        res.json('Server error')
    }
}
/* const addComm = async(req,res)=>{

    try {
        const id = req.params.id;
        const user_id = session.userId;
        if(user_id){
            const UserId = session.userId;
            let user = await UserReg.findById(UserId);
            res.send(user_id);
            const name = user.name;
            const email = user.email; 
            const text = req.body.text; 
            
            const specifiedBlog = await Post.findOne({_id: req.params.id})
            const comment = new Comment({
                name: req.body.name,
                email: req.body.email,
                text: req.body.text
            });
            specifiedBlog.comments.push(comment);
            await specifiedBlog.save();
            res.send(specifiedBlog)
        }
    } catch (error) {
        res.status(401);
        res.send('plese make login')
    }

} */

//read all comments
const allComm = async(req,res)=>{
        const result = await Comment.find();
        res.status(200).json(result)
}


//read comment to specified blog
const getComm = async(req,res)=>{
    try {
        const id = req.params.id;
        const allComment = await Post.findById(id).populate('comments');
        if(allComment.comments.length > 0){
            res.status(200).json(allComment.comments);
        }else{
            res.status(200).json('0 comment');
        }

    } catch (error) {

        res.status(404).json({error})
    }
   
}

//delete comment 
const delComment = async(req,res)=>{
    
    try {
        const id = req.params.id;
        const allComments = await Post.findById(id);
        
        //comment id 
        const commId = req.params.commId;
        const removeComm = allComments.comments.map(data => data._id.toString()).indexOf(commId);
        
        allComments.comments.splice(removeComm, 1);
        await allComments.save();
        res.status(200).json('comment deleted')
    } catch (error) {
        res.status(404).json({error: "comment not found"})
    }
}


//like post
const like = async(req,res)=>{
    try {
        const id = req.params.id;
        const blog = await Post.findById(id);
        const user = await Signup.findById({_id: req.user._id});
        const email = user.email;
        if(!blog.likes.Peaples.includes(email) == true){
            let count = blog.likes.count + 1;
            let peaple = blog.likes.Peaples;
            peaple.push(email);

            await Post.findOneAndUpdate(
                {_id: id},
                {likes: {count,Peaples: peaple}}
            );
                res.status(200).json('liked')
        }else{
            let count = blog.likes.count - 1;
            let peaple = blog.likes.Peaples.filter((eml)=> eml != email);

            await Post.findOneAndUpdate(
                {_id: id},
                {likes: {count,Peaples: peaple}}
            );
            
            res.status(200).json('like removed')
        }
    } catch (error) {
        res.status(404).json('not found')
    }
}

// get like related to blog
const getLike = async(req,res)=>{
    try {
        const id = req.params.id;
        let allLikes = await Post.findById(id);
        let getLikes = allLikes.likes;
        res.status(200).json(getLikes.count);
    } catch (error) {
        res.status(404).json('like not found')
    }
}
export {addBlog,getBlogs,getBlogById,updateBlog,deleteBlog,addComm,getComm,allComm,delComment,like,getLike}