import  express  from "express";
import {UserVald,adminVald} from "../../middlewares/autho";
import "../../middlewares/autho";
import { checkingAdmin,checkingUser } from "../../middlewares/checkUser";
import {UserRegistration, userLogin,register,signedIn,deleteUser}  from "../../controller/regController";
import passport from "passport";
const router3 = express.Router();

// Swagger documentation

/**
 * @swagger
 * components:
 *  schemas:
 *      Signup:
 *          type: object
 *          required:
 *              -name
 *              -email
 *              -password
 *          properties:
 *              name:
 *                  type: string
 *                  description: name of user
 *              email:
 *                  type: string
 *                  description: email of user
 *              password:
 *                  type: string
 *                  description: password of user
 *          example:
 *              name: admin
 *              email: admin@gmail.com
 *              password: admin3535
 *      Error:
 *        type: object
 *        properties:
 *          code:
 *            type: string
 *          message:
 *            type: string
 *        required:
 *          -code
 *          -message

 */


/**
 * @swagger
 * tags:
 *  name: Registration
 *  description: User registration and signup
 */

//User registration
router3.post('/signup',UserVald,UserRegistration)
//user login

/**
 * @swagger
 * /user/login:
 *  post:   
 *      summary: user and admin login
 *      tags: [Registration]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Signup'
 *      responses:
 *          200:
 *            description: ok
 *            content: 
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Signup'
 *          401:
 *            description: Unauthorize
 *            content:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *      
 * 
 */
router3.post('/login',passport.authenticate('local',{session: false}),userLogin)

//Admin registration 

/**
 * @swagger
 * /user/adminsignup:
 *  post:
 *      summary: admin registration
 *      tags: [Registration]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Signup'
 *      responses:
 *          200:
 *              description: Successfull signup
 *          400:
 *              description: Bad request now
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: '#/components/schemas/Error'
 * 
  */

router3.post('/adminsignup',adminVald,register);

//Get all admin registered
/**
 * @swagger
 * /user:
 *  get:
 *    summary: getting all user registed
 *    tags: [Registration]
 *    responses:
 *          200:
 *            description: ok
 *            content: 
 *              application/json:
 *                schema:
 *                  type: array
 *                items:
 *                  $ref: '#/components/schemas/Signup'
 *          401:
 *            description: Unauthorize
 */

router3.get('/',passport.authenticate('jwt',{session: false}),checkingAdmin,signedIn);

//delete users
router3.delete('/:id',passport.authenticate('jwt',{session: false}),checkingAdmin,deleteUser);
export default router3
