import  express  from "express";
import "../../middlewares/autho";
import passport from "passport";
import { checkingAdmin,checkingUser } from "../../middlewares/checkUser";
import {blogVal,updateVal,commVal} from "../../middlewares/articleMid";
import {addBlog,getBlogs,getBlogById,updateBlog,deleteBlog,addComm,allComm,getComm,delComment,like,getLike} from "../../controller/artController";
const router1 = express.Router();

//get all blogs
router1.get('/', getBlogs);
//get blogs by id
router1.get('/:id', getBlogById);
// adding articles
router1.post('/',passport.authenticate('jwt',{session: false}),checkingAdmin,blogVal, addBlog);
//update blogs
router1.patch('/:id/update',passport.authenticate('jwt',{session: false}),checkingAdmin,updateVal, updateBlog);
//delete blogs
router1.delete('/:id',passport.authenticate('jwt',{session: false}),checkingAdmin,deleteBlog);


//add comments
router1.post('/:id/comment',passport.authenticate('jwt',{session: false}),checkingUser,commVal,addComm)
//read comment relate to post 
router1.get('/:id/comments',getComm)
//read all comments
router1.get('/comments',passport.authenticate('jwt',{session: false}),checkingAdmin, allComm)
//delete comment
router1.delete('/:id/comments/:commId',passport.authenticate('jwt',{session: false}),checkingAdmin,delComment)


// add like 
router1.put('/:id/like',passport.authenticate('jwt',{session: false}),checkingUser, like)
//get like related to post
router1.get('/:id/likes',getLike)

export default router1

