import  express  from "express";
import {Post, Comment, Like} from "../model/articleMod";
import Contact from "../model/messageMod";
import {verifyTokens , verifyUserTokens} from "../middlewares/autho";
import {blogVal,updateVal,commVal/* ,contVal, signupVald,UserVald */} from "../middlewares/articleMid";
import {addBlog,getBlogs,getBlogById,updateBlog,deleteBlog,addComm,allComm,getComm,delComment,like,getLike} from "../controller/artController";
import {UserRegistration, userLogin}  from "../controller/regController";
const router = express.Router();

//get all blogs
router.get("/blogs", getBlogs);
//get blogs by id
router.get("/blogs/:id", getBlogById);
// adding articles
router.post('/blogs',verifyTokens,blogVal, addBlog);
//update blogs
router.patch('/blogs/:id/update',verifyTokens,updateVal, updateBlog);
//delete blogs
router.delete('/blogs/:id/delete',verifyTokens,deleteBlog);


//add comments
router.post('/blogs/:id/comment',verifyUserTokens,commVal,addComm)
//read all comments
router.get('/comments',verifyTokens, allComm)
//read comment relate to post =
router.get('/blogs/:id/comments', getComm)
//delete comment
router.delete('/comments/:id/delete',verifyTokens,delComment)

// add like 

router.put('/blogs/:id/like',verifyUserTokens, like)
//get like related to post
router.get('/blogs/:id/likes',getLike)

export default router

