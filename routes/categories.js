const express = require('express');

const router = express.Router();

const categoriesController = require('../controllers/categories');
const authMiddleware = require('../middlewares/auth');
const categoriesMiddleware = require('../middlewares/categories');
const paginateMiddleware = require('../middlewares/pagination');


/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          schemas: bearer
 *          bearerFormat: JWT
 * schemas:
 *      categories:
 *          type: object
 *          require:
 *              -name
 *              -description
 *              -image
 *          properties:
 *              id:
 *                  type: integer
 *                  description: auto-generate id
 *              name:
 *                  type: string
 *                  description: category name
 *              description:
 *                  type: string
 *                  description: category description
 *              image:
 *                  type: string
 *                  description: category image
 *          example:
 *              id: 1
 *              name: category 1
 *              image: https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png
 *
 */
/**
 * @swagger
 * tags:
 *  name: Categories
 *  description: Categories endpoints DOCs
 */

/**
 * @swagger
 * /categories:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: return categories list
 *      tags: [Categories]
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema: 
 *                         type: array
 *                         items:
 *                            $ref: '#components/schemas/categories'
 *          400:
 *              description: invalid token
 *          401:
 *              description: access denied
 */

router.get('/', authMiddleware.isAuth, paginateMiddleware.pageValidation, categoriesController.getAll);
/**
 * @swagger
 * /categories/{categoryId}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      summary: return category by id
 *      parameters:
 *         - name: categoryId
 *           in: path
 *           required: true
 *           description: category id
 *           schema:
 *             type: integer
 *             format: int64
 *             minimum: 1
 *      tags: [Categories]
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema: 
 *                         type: array
 *                         items:
 *                            $ref: '#components/schemas/categories'
 *          400:
 *              description: invalid token
 *          401:
 *              description: access denied
 */

router.get('/:id', authMiddleware.isAdmin, categoriesController.getById);
/**
 * @swagger
 * /categories/{categoryId}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      summary: delete category by id
 *      parameters:
 *         - name: categoryId
 *           in: path
 *           required: true
 *           description: category id
 *           schema:
 *             type: integer
 *             format: int64
 *             minimum: 1
 *      tags: [Categories]
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema: 
 *                         type: array
 *                         items:
 *                            $ref: '#components/schemas/categories'
 *          400:
 *              description: invalid token
 *          401:
 *              description: access denied

 */
router.delete('/:id', authMiddleware.isAdmin, categoriesController.remove);
/**
 * @swagger
 * /categories/{categoryId}:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      summary: edit category by id
 *      parameters:
 *         - name: categoryId
 *           in: path
 *           required: true
 *           description: category id
 *           schema:
 *             type: integer
 *             format: int64
 *             minimum: 1
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              image:
 *                type: string
 *      tags: [Categories]
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema: 
 *                         type: array
 *                         items:
 *                            $ref: '#components/schemas/categories'
 *          400:
 *              description: invalid token
 *          401:
 *              description: access denied
 */
router.put('/:id', authMiddleware.isAdmin, categoriesController.update);
/**
 * @swagger
 * /categories:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      summary: create a new category
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              image:
 *                type: string
 *      tags: [Categories]
 *      responses:
 *          200:
 *              description: success
 *              content:
 *                  application/json:
 *                      schema: 
 *                         type: array
 *                         items:
 *                            $ref: '#components/schemas/categories'
 *          400:
 *              description: invalid token
 *          401:
 *              description: access denied
 */
router.post('/', authMiddleware.isAdmin, categoriesMiddleware.categoriesInputValidation, categoriesController.create);

module.exports = router;
