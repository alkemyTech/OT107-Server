const express = require('express');

const router = express.Router();
const membersController = require('../controllers/members');
const authMiddleware = require('../middlewares/auth');
const validationMiddleware = require('../middlewares/members');

//schema
/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  schemas:
 *      members:
 *          type: object
 *          require:
 *              -name
 *              -facebookUrl
 *              -instagramUrl
 *              -linkedinUrl
 *              -image
 *              -description
 *          properties:
 *              id:
 *                  type: integer
 *                  description: auto-generate id
 *              name:
 *                  type: string
 *                  description: member name
 *              facebookUrl:
 *                  type: string
 *                  description: member social network
 *              instagramUrl:
 *                  type: string
 *                  description: member social network
 *              linkedinUrl:
 *                  type: string
 *                  description: member social network
 *              image:
 *                  type: string
 *                  description: member image
 *              description:
 *                  type: string
 *                  description: member description
 *          example:
 *              id: 1
 *              name: member 1
 *              facebookUrl: https://www.facebook.com/juanpablo.choter
 *              instagramUrl: https://www.instagram.com/juanpablochoter/
 *              linkedinUrl: https://www.linkedin.com/in/juanpablochoternasty
 *              image: https://i1.sndcdn.com/artworks-000218066450-drfbyj-t500x500.jpg
 *              description: Apoyo diferentes jornadas enfocadas al aprovechamiento del tiempo libre
 */

//swagger tag
/**
 * @swagger
 * tags:
 *  name: Members
 *  description: Members endpoints DOCs
 */

//swagger rutas
/**
 * @swagger
 * /members:
 *  get:
 *      summary: return members list, Admin Token required
 *      security:
 *          - bearerAuth: []
 *      tags: [Members]
 *      parameters:
 *          - name: page
 *            in: query
 *            schema:
 *                type: integer
 *            description: pagination page query
 *      responses:
 *          '200':
 *              description: list of members
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#components/schemas/members'
 *          '401':
 *              description: Unauthorize, Invalid or expired token
 *          '500':
 *              description: Error Internal Server Error
 */

router.get('/', authMiddleware.isAdmin, membersController.getAll);

/**
 * @swagger
 * /members:
 *  post:
 *      summary: update a member by id, Admin Token required
 *      security:
 *          - bearerAuth: []
 *      tags: [Members]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/members'
 *      responses:
 *          '200':
 *              description: member update successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/members'
 *          '401':
 *              description: Unauthorize, Invalid or expired token
 *          '500':
 *              description: Internal Server Error
 */

router.post('/', authMiddleware.isAuth, validationMiddleware.membersValidation, membersController.create);

/**
 * @swagger
 * /members/{id}:
 *  delete:
 *      summary: remove a member by id, Admin Token required
 *      security:
 *          - bearerAuth: []
 *      tags: [Members]
 *      parameters:
 *          - name: id
 *            in: path
 *            schema:
 *                type: string
 *                require: true
 *            description: member id
 *      responses:
 *          '200':
 *              description: member removed successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/members'
 *          '400':
 *              description: Not matching member
 *          '401':
 *              description: Unauthorize, Invalid or expired token
 *          '500':
 *              description: Internal Server Error
 */

router.delete('/:id', authMiddleware.isAuth, membersController.remove);

/**
 * @swagger
 * /members/{id}:
 *  put:
 *      summary: update a member by id, Admin Token required
 *      security:
 *          - bearerAuth: []
 *      tags: [Members]
 *      parameters:
 *          - name: id
 *            in: path
 *            schema:
 *                type: string
 *                require: true
 *            description: member id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#components/schemas/members'
 *      responses:
 *          '200':
 *              description: member update successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schemas/members'
 *          '400':
 *              description: Not matching member
 *          '401':
 *              description: Unauthorize, Invalid or expired token
 *          '500':
 *              description: Internal Server Error
 */

router.put('/:id', authMiddleware.isAuth, validationMiddleware.membersValidation, /*validationMiddleware.memberExist,*/ membersController.update);


module.exports = router;
