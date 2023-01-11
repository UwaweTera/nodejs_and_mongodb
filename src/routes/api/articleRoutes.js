import  express  from "express";
import "../../middlewares/autho";
import passport from "passport";
import { checkingAdmin,checkingUser } from "../../middlewares/checkUser";
import {blogVal,updateVal,commVal} from "../../middlewares/articleMid";
import {addBlog,getBlogs,getBlogById,updateBlog,deleteBlog,addComm,allComm,getComm,delComment,like,getLike} from "../../controller/artController";
const router1 = express.Router();

//create swagger schemas
/** 
 * @swagger
* components: 
*       examples:
*           comment:
*               text: You can type any comment        
*       securitySchemes:
*           bearerAuth: 
*               type: http
*               scheme: bearer
*               bearerFormat: JWT
*       schemas:
*                      
*          Post:
*              required:
*                  - head
*                  - image
*                  - body
*              properties:
*                  id:
*                    type: string
*                    description: The auto generate id of the book
*                  head:
*                    type: string
*                    description: The header of article blog
*                  image:
*                    type: string
*                    description: The special image of article blog
*                  body:
*                    type: string
*                    description: The body of article blog
*                  comments:
*                    type: array
*                    description: The commnents relate to blog
*                  likes:
*                    type: array
*                    count:
*                       type: number
*                    Peaples: array
*                    description: The likes of article blog
*              example:
*                    head:  Benefits of study
*                    image: sample.jpg
*                    body: Some benefits gain as software developer      
*       parameters:
*           blogId:
*              name : id
*              in : path
*              description: Id for specific blogId
*              required: true
*              schema:
*                 type: string
*       responses: 
*           200:
*               description: Success
*               content:
*                   application/json:
*                       schema:
*                           type: array
*                       items: 
*                           $ref: '#components/schemas/Post'
*           400:
*               description: Bad request
*           401:
*               description: Authorization
*           404:
*               description: Not found
*           500:
*               description: Unexpected error.
*/


/**
 * @swagger
 * tags:
 *  name: Blogs
 *  description: The Blogs managing API
 */

/**
* @swagger
* /blogs:
*  get:
*   summary: Return all the blogs
*   tags: [Blogs]
*   responses:
*      200:
*           $ref: '#/components/responses/200' 
*/

//get all blogs
router1.get('/', getBlogs);

/**
 * @swagger
 * /blogs/{id}:
 *  get:
 *      summary: Getting blogs by id
 *      tags: [Blogs]
 *      parameters:
 *            - name : id
 *              in : path
 *              schema:
 *                  type: string
 *              description: Id of specific id
 *              required: true
 *      responses:
 *          200: 
 *              description: specified blog
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Post'
 *          404: 
 *              $ref: '#/components/responses/404'
 */
//get blogs by id
router1.get('/:id', getBlogById);

// adding articles
/**
 * @swagger
 * /blogs:
 *  post:
 *    summary: Adding new blog
 *    tags: [Blogs]
 *    security:
 *      - {}
 *      - bearerAuth: []
 *    requestBody:
 *        required: true
 *        content:
 *           application/json:
 *                 schema: 
 *                    $ref: '#/components/schemas/Post'
 *    responses:
 *        200:
 *          description: The Blog was successfull created
 *          content:
 *              application/json:
 *                 schema:
 *                     $ref: '#/components/schemas/Post' 
 *        400:
 *          $ref: '#/components/responses/400' 
 *        401:
 *          $ref: '#/components/responses/401' 
 *        500:
 *          description: Server error. Try again later      
 */


router1.post('/',passport.authenticate('jwt',{session: false}),checkingAdmin,blogVal, addBlog);


/**
 * @swagger
 * /blogs/{id}/update:
 *  patch:
 *      summary: updating blogs
 *      tags: [Blogs]
 *      security:
 *      - {}
 *      - bearerAuth: []
 *      parameters:
 *          - $ref: '#/components/parameters/blogId'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema: 
 *                      $ref: '#/components/schemas/Post'
 *      responses:
 *          200:
 *              description: Success update
 *              content:
 *                  application/json:
 *                      schema: 
 *                          $ref: '#/components/schemas/Post' 
 *          400:
 *              $ref: '#/components/responses/400'
 *          401:
 *            content:
 *               appication/json:
 *                   schema:
 *                       type: object
 *                       properties:
 *                           messages:
 *                               type: string
 *                               example: You are not authorized to access this system   
 *          404:
 *              description: not found  
 */
//update blogs
router1.patch('/:id/update',passport.authenticate('jwt',{session: false}),checkingAdmin,updateVal, updateBlog);


/**
* @swagger
* /blogs/{id}:
*  delete:
*   summary: Delete one blog
*   tags: [Blogs]
*   security:
*      - {}
*      - bearerAuth: []
*   parameters:
*          - $ref: '#/components/parameters/blogId'
*   responses:
*      200:
*        description: Complite deleted
*      401:
*        description: Unauthorized
*        content:
*           appication/json:
*               schema:
*                   type: object
*                   properties:
*                       messages:
*                           type: string
*                           example: You are not authorized to access this system
*      404:
*        description: not found 
*/

//delete blogs
router1.delete('/:id',passport.authenticate('jwt',{session: false}),checkingAdmin,deleteBlog);


//add comments
// adding articles
/**
 * @swagger
 * /blogs/{id}/comment:
 *  post:
 *    summary: Add comment to blog
 *    tags: [Blogs]
 *    security:
 *      - {}
 *      - bearerAuth: []
 *    parameters:
 *      - $ref: '#/components/parameters/blogId'    
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Post'
 *              example:
 *                  text: this comment must be fielded
 *                  
 *    responses:
 *        200:
 *          $ref: '#/components/responses/200' 
 *        400:
 *          $ref: '#/components/responses/400' 
 *        401:
 *          $ref: '#/components/responses/401'     
 */


router1.post('/:id/comment',passport.authenticate('jwt',{session: false}),checkingUser,commVal,addComm)

/**
* @swagger
* /blogs/{id}/comments:
*  get:
*   summary: Return all the comment relate to one blog
*   tags: [Blogs]
*   parameters:
*       - $ref: '#/components/parameters/blogId'
*   responses:
*      200:
*           $ref: '#/components/responses/200' 
*      404:
*           $ref: '#/components/responses/404' 
*/
//read comment relate to post 
router1.get('/:id/comments',getComm)

/**
* @swagger
* /blogs/comments:
*  get:
*   summary: Return all the comments 
*   tags: [Blogs]
*   responses:
*      200:
*           $ref: '#/components/responses/200' 
*      500:
*           $ref: '#/components/responses/500' 
*/
//read all comments
router1.get('/comments',passport.authenticate('jwt',{session: false}),checkingAdmin, allComm)

/**
* @swagger
* /blogs/{id}/comments/{commId}:
*  delete:
*   summary: Delete comment
*   tags: [Blogs]
*   security:
*      - {}
*      - bearerAuth: []
*   parameters:
*          - name : id
*            in : path
*            description: Id for specific blogId
*            required: true
*            schema:
*               type: string
*          - name : commId
*            in : path
*            description: Id for comment
*            required: true
*            schema:
*               type: string
*   responses:
*      200:
*        description: Complite deleted comment
*      401:
*        description: Unauthorized
*        content:
*           appication/json:
*               schema:
*                   type: object
*                   properties:
*                       messages:
*                           type: string
*                           example: You are not authorized to access this system
*      404:
*        description: not found 
*/
//delete comment
router1.delete('/:id/comments/:commId',passport.authenticate('jwt',{session: false}),checkingAdmin,delComment)

/**
 * @swagger
 * /blogs/{id}/like:
 *  put:
 *    summary: Adding like and remove
 *    tags: [Blogs]
 *    security:
 *      - {}
 *      - bearerAuth: []
 *    parameters:
 *        - $ref: '#/components/parameters/blogId'
 *    responses:
 *        200:
 *          description: Liked and like removed
 *        401:
 *          $ref: '#/components/responses/401' 
 *        500:
 *          description: Server error. Try again later      
 */
// add like 
router1.put('/:id/like',passport.authenticate('jwt',{session: false}),checkingUser, like)

/**
 * @swagger
 * /blogs/{id}/likes:
 *  get:
 *    summary: get all like relate to blog
 *    tags: [Blogs]
 *    parameters:
 *        - $ref: '#/components/parameters/blogId'
 *    responses:
 *        200:
 *          description: total of all like on blog
 *        401:
 *          $ref: '#/components/responses/401' 
 *        500:
 *          description: Server error. Try again later      
 */
//get like related to post
router1.get('/:id/likes',getLike)

export default router1

