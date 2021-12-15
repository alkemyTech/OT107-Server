const express = require('express');

const router = express.Router();

const authController = require('../controllers/users');

const authMiddleware = require('../middlewares/auth');
/**
 * @swagger
 * components:
 *  schemas:
 *      token:
 *        type: string
 *        description: JWT Token
 *      users:
 *        type: object
 *        required:
 *            -firstName
 *            -lastName
 *            -email
 *            -password
 *        properties:
 *          id:
 *            type: integer
 *            description: auto-generate id
 *          firstName:
 *            type: string
 *            description: The user first name
 *          lastName:
 *            type: string
 *            description: The user last name
 *          email:
 *            type: string
 *            description: The user email
 *          password:
 *            type: string
 *            description: The user encrypted password
 *        example:
 *          firstName: Carlos
 *          lastName: Alkemy
 *          email: carlosalkemy@alkemy.com.ar
 *          password: 123456789Ab!
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Login and Register endpoints DOCs
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *      summary: register a new user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/users'
 *      responses:
 *          '200':
 *              description: user registered successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          token:
 *                             $ref: '#components/schemas/token'
 *                          user:
 *                             $ref: '#components/schemas/users'
 *          '400':
 *              description: Not matching user
 *          '500':
 *              description: Internal Server Error
 */
router.post(
  '/register',
  authMiddleware.registerInputValidation,
  authController.create
);

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: login a user
 *      tags: [Auth]
 *      requestBody:
 *          description: email (required) and password (required - at least 8 characters, 1 upper case, numeric, and special character)
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        email:
 *                          type: string
 *                          description: The user email
 *                        password:
 *                          type: string
 *                          description: The user password
 *                      example:
 *                        email: carlosalkemy@alkemy.com.ar
 *                        password: 123456789Ab!
 *      responses:
 *          '200':
 *              description: user verified successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          token:
 *                             $ref: '#components/schemas/token'
 *          '400':
 *              description: Not matching user credentials
 *          '500':
 *              description: Internal Server Error
 */
router.post(
  '/login',
  authMiddleware.loginInputValidation,
  authController.login
);

/**
 * @swagger
 * /auth/me:
 *  get:
 *      summary: login a user
 *      security:
 *          - bearerAuth: []
 *      tags: [Auth]
 *      responses:
 *          '200':
 *              description: user information
 *              content:
 *                  application/json:
 *                      schema:
 *                        $ref: '#components/schemas/users'
 *          '403':
 *              description: Unauthorize, Invalid or expired token
 *          '500':
 *              description: Internal Server Error
 */
router.get('/me', authMiddleware.isAuth, authController.getById);

module.exports = router;
