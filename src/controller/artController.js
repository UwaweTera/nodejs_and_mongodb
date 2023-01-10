
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import 'dotenv/config';
import {Post, Comment, Like} from "../model/articleMod.js";
import UserReg from "../model/registerMod.js";
import session from 'express-session';


//some global variable
const SecretKey = process.env.JWT_SECRET;
const userSecret = process.env.USER_SECRET;

//adding blog post
const addBlog =async (req,res)=>{
    jwt.verify(req.token, SecretKey ,async(err, authoData)=>{
        if(err){
            res.send('login before add blog');
        }else{
            const insBlog = new Post({
                head: req.body.header,
                image: req.body.img,
                body: req.body.content,
                comment: [],
                likeCount: 0
           })
           await insBlog.save().then((result)=>{
            res.json({
                message: "blog created"
            })
           }).catch((error)=>{ res.send({message: 'fail to save blog'}); console.log(error)})
        }
    })
   
}

//get all blogs

const getBlogs = async(req, res)=>{
    await Post.find().populate(["comments", "likes"])
        .then((result)=>{
            if(result){
                res.send(result)
            }else{
                res.json({
                    message: "no blog there"
                })
            }
            
        })
        .catch((error)=>{ console.log(error)})
}

//Get blogs by id
const getBlogById = async(req, res)=>{
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message : "no blog by that id"})
    await Post.findById(id)
        .then((result)=>{res.send(result)})
        .catch((error)=>{ console.log(error)})
}

//Update blog
const updateBlog = (req,res)=>{
    try{
        jwt.verify(req.token, SecretKey ,async(err, authoData)=>{
            if(err){
                res.send('login before update blog');
            }else{
                const id = req.params.id;
                if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message : "no blog by that id"})
                const post = await Post.findOne({_id: id});
        
                if(req.body.header){
                    post.head = req.body.header;
                }
                if(req.body.img){
                    post.image = req.body.img;
                }
                if(req.body.content){
                    post.body = req.body.content;
                }
                await post.save()
                res.send(post)
            }
        })
        
    }catch{
        res.status(404).json({error: "blog doesn't exit"});
    }
    
}
//Delete blog
const deleteBlog = (req,res)=>{
    try{
        jwt.verify(req.token, SecretKey, async(err,authoData)=>{
            if(err){
                res.send('Login before delete blog')
            }else{
                await Post.deleteOne({_id: req.params.id});
                res.status(200).json({msg: 'blog deleted'});
            }
        })        
    }catch{
        res.status(404).json({error: "port doesn't exist"});
    }
}

//add comment to specified blog
const addComm = async(req,res)=>{
    jwt.verify(req.token, userSecret, async(err,authoData)=>{
        if(err){
            res.send('Login as user first')
        }else{
            const id = req.params.id;
            if(session.userId){
                const UserId = session.userId;
                const user = await UserReg.findById(UserId);
                const name = user.name; 
                const email = user.email; 
                const text = req.body.text; 
                const comment = new Comment({
                    name,
                    email,
                    text,
                    blogId: id
                });
                await comment.save();
                const specifiedBlog = await Post.findById(id).populate('comments')
                specifiedBlog.comments.push(comment);
                specifiedBlog.save().then((result)=>{
                    res.json({messages: result})
                }).catch((err)=>{
                    res.send(err)
                })
            }else{
                res.send('plese make login')
            }
            
        }
    }) 

}
//read all comments
const allComm = (req,res)=>{
    jwt.verify(req.token, SecretKey, async(err,authoData)=>{
        if(err){
            res.send('Login before read all comments')
        }else{
            await Comment.find()
            .then((result)=>{
                if(result){
                    res.status(200).json(result)
                }
            }).catch((err)=>{
                res.status(404).json({error: "not found"})
            })
        }
    })
    
}

//read comment to specified blog
const getComm = async(req,res)=>{
    const id = req.params.id;
    
    await Post.findById(id).populate('comments')
        .then((result)=>{
            if(result){
                res.status(200).json(result.comments)
            }
        }).catch((err)=>{
            res.status(404).json({error: "not found"})
        })
}

//delete comment 
const delComment =(req,res)=>{
    
    try {
        jwt.verify(req.token, SecretKey, async(err,authoData)=>{
            if(err){
                res.send('Login before delete comment')
            }else{
                const id = req.params.id;
                await Comment.deleteOne({_id: id});
                res.status(200).json({message: "comment deleted"})
            }
        })
       
    } catch(error){
        res.status(404).json({error: "That id doesn't exist"});
    }
}


//like post
const like = async(req,res)=>{
    jwt.verify(req.token, userSecret, async(err,authoData)=>{
        if(err){
            console.log(err);
            res.send('Sorry Your request not approved try again later')
        }else{
            const user_id = session.userId;
            if(user_id){
                const blog_id = req.params.id;
                const user = await UserReg.findById(user_id);
                

                const addLike = new Like({
                    userId: user_id,
                    blogId: blog_id
                })

                await addLike.save();
                const post = await Post.findById(blog_id).populate('likes');
                
                if(
                     !post.likes.filter((like)=> like.userId.toString() === user_id).length > 0
                ){
                    post.likes.unshift(addLike);
                    post.save().then((result)=>{
                        res.send('like added')
                    }).catch((err)=>{
                        console.log(err);
                    })
                }else{
                    const removeIndex = post.likes.map(like => like.userId.toString()).indexOf(user_id);
                    post.likes.splice(removeIndex,1);
                    post.save().then((result)=>{
                        res.send('like removed')
                    }).catch((err)=>{
                        console.log(err);
                    })
                }

                
            }else{
                res.send('Login again')
            }
            
            
             
        }
    })

}

// get like related to blog
const getLike =async(req,res)=>{
    const id = req.params.id;
    
    await Post.findById(id).populate(['likes'])
        .then((result)=>{
            let getLikes = result.likes;
            let count = 0;
            getLikes.forEach((data)=>{
                count++;
            })
            res.json(count)
        }).catch((err)=>{
            res.status(404).json({error: "not found"})
        })
}

export {addBlog,getBlogs,getBlogById,updateBlog,deleteBlog,addComm,getComm,allComm,delComment,like,getLike}