const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth');
const testimonialsMiddleware = require('../middlewares/testimonials');
const testimonialsController = require('../controllers/testimonials');
const paginationMiddleware = require('../middlewares/pagination');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     testimonials:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: auto-generated id
 *           nullable: false
 *         name:
 *           type: string
 *           nullable: false
 *         image:
 *           type: string
 *           nullable: true
 *         content:
 *           type: text
 *           nullable: false
 *       example:
 *        id: 1
 *        name: Testimonial 1
 *        image: https://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg
 *        content:
 *          Soy Licenciada en Relaciones Institucionales y trabajo vinculando
 *          a la fundación con otras ongs, y con diferentes instituciones
 *          tanto privadas como estatales. Colaboro con la formación de
 *          grupos de voluntarios y en las acciones de desarrollo de fondos.
 * tags:
 *   name: Testimonials
 *   description: Testimonials endpoints DOCs
 */

/**
 * @swagger
 * /testimonials:
 *   get:
 *     summary: Return all testimonials, Admin Token required
 *     security:
 *       - bearerAuth: []
 *     tags: [Testimonials]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Pagination page query
 *     responses:
 *       '200':
 *         description: A JSON array of testimonials with name, image and content
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/testimonials'
 *       '401':
 *         description: Unauthorized. Invalid or expired token
 */
router.get('/', authMiddleware.isAuth, paginationMiddleware.pageValidation, testimonialsController.getAll);

/**
 * @swagger
 * /testimonials/{id}:
 *   get:
 *     summary: Return a testimonial by id, Admin Token required
 *     security:
 *       - bearerAuth: []
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric id of the testimonial to get
 *     responses:
 *       '200':
 *         description: A JSON object of one testimonial with name, image and content
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/testimonials'
 *       '401':
 *         description: Unauthorized. Invalid or expired token
 *       '500':
 *         description: Error Internal Server Error
 */
router.get('/:id', authMiddleware.isAdmin, testimonialsController.getById);

/**
 * @swagger
 * /testimonials:
 *   post:
 *     summary: Create testimonial, Admin Token required
 *     security:
 *       - bearerAuth: []
 *     tags: [Testimonials]
 *     requestBody:
 *       description: name (required), image and content (required)
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               image:
 *                 type: string
 *               content:
 *                 type: text
 *                 required: true
 *             example:
 *               name: Testimonial 4
 *               image: https://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg
 *               content: Soy Licenciada en Relaciones Institucionales y trabajo vinculando
 *                 a la fundación con otras ongs, y con diferentes instituciones
 *                 tanto privadas como estatales. Colaboro con la formación de
 *                 grupos de voluntarios y en las acciones de desarrollo de fondos.
 *     responses:
 *       '200':
 *         description: A JSON object of one testimonial with name, image and content
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/testimonials'
 *       '401':
 *         description: Unauthorized. Invalid or expired token
 *       '500':
 *         description: Error Internal Server Error
 */
router.post('/', authMiddleware.isAdmin, testimonialsMiddleware.inputValidation, testimonialsController.create);

/**
 * @swagger
 * /testimonials/{id}:
 *   put:
 *     summary: Edit testimonial, Admin Token required
 *     security:
 *       - bearerAuth: []
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       description: name (required), image and content (required)
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               image:
 *                 type: string
 *               content:
 *                 type: text
 *                 required: true
 *             example:
 *               name: Testimonial 3
 *               image: https://cdn2.hubspot.net/hubfs/4759614/ayudas-para-ong.jpg
 *               content: Soy Licenciada en Relaciones Institucionales y trabajo vinculando
 *                 a la fundación con otras ongs, y con diferentes instituciones
 *                 tanto privadas como estatales. Colaboro con la formación de
 *                 grupos de voluntarios y en las acciones de desarrollo de fondos.
 *     responses:
 *       '200':
 *         description: A JSON object of one testimonial with id, name, image and content
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/testimonials'
 *       '401':
 *         description: Unauthorized. Invalid or expired token
 *       '500':
 *         description: Error Internal Server Error
 */
router.put('/:id', authMiddleware.isAdmin, testimonialsController.update);

/**
 * @swagger
 * /testimonials/{id}:
 *   delete:
 *     summary: Edit testimonial, Admin Token required
 *     security:
 *       - bearerAuth: []
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       '200':
 *         description: message Testimonial has been removed
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/testimonials'
 *       '401':
 *         description: Unauthorized. Invalid or expired token
 *       '500':
 *         description: Error Internal Server Error
 */
router.delete('/:id', authMiddleware.isAdmin, testimonialsController.remove);

module.exports = router;
