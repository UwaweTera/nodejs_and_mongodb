import  express  from "express";
import "../../middlewares/autho";
import passport from "passport";
import contVal from "../../middlewares/messageMid";
import RequireAuth from "../../utils/forRoutes";
import { ContactContr,messages,deleteMsg} from "../../controller/mesController";
import { checkingAdmin } from "../../middlewares/checkUser";
const router2 = express.Router();


// Swagger documentation

/**
 * @swagger
 * components:
 *  responses: 
 *           200:
 *               description: Success
 *           400:
 *               description: Bad request
 *           401:
 *               description: Authorization
 *           404:
 *               description: Not found
 *           500:
 *               description: Unexpected error.
 *  schemas:
 *      Contact:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - message
 *          properties:
 *              name:
 *                  type: string
 *                  description: name of user
 *              email:
 *                  type: string
 *                  description: email of user
 *              message:
 *                  type: string
 *                  description: password of user
 *          example:
 *              name: Some
 *              email: some@gmail.com
 *              message: How to reach on you
 *  parameters:
 *           messageId:
 *              name : id
 *              in : path
 *              description: Id for message
 *              required: true
 *              schema:
 *                 type: string
 */


/**
 * @swagger
 * tags:
 *  name: Messages
 *  description: all messages
 */


/**
 * @swagger
 * /messages:
 *  post:
 *      summary: send message
 *      tags: [Messages]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Contact'
 *      responses:
 *          200:
 *              description: message sent
 *          400:
 *              $ref: '#/components/responses/400'
 * 
  */

// adding message
router2.post('/',contVal,ContactContr);

/**
 * @swagger
 * /messages:
 *  get:
 *    summary: getting all messages
 *    tags: [Messages]
 *    security:
 *      - {}
 *      - bearerAuth: []
 *    responses:
 *          200:
 *            description: ok
 *            content: 
 *              application/json:
 *                schema:
 *                  type: array
 *                items:
 *                  $ref: '#/components/schemas/Contact'
 *          401:
 *            description: Unauthorize
 */

//get all messages
router2.get("/",RequireAuth,checkingAdmin, messages)

/**
* @swagger
* /messages/{id}:
*  delete:
*   summary: Delete one message
*   tags: [Messages]
*   security:
*      - {}
*      - bearerAuth: []
*   parameters:
*          - $ref: '#/components/parameters/messageId'
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

//delete message
router2.delete("/:id",passport.authenticate('jwt',{session: false}),checkingAdmin, deleteMsg)

export default router2