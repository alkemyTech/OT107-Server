const express = require("express");

const router = express.Router();

const newsController = require("../controllers/news");
const commentsController = require("../controllers/comments");
const authMiddleware = require("../middlewares/auth");
const newsMiddleware = require("../middlewares/news");
const paginateMiddleware = require('../middlewares/pagination');

/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  schemas:
 *      news:
 *        type: object
 *        required:
 *            -name
 *            -content
 *            -image
 *            -categoryId
 *        properties:
 *          id:
 *            type: integer
 *            description: auto-generate id
 *          name:
 *            type: string
 *            description: The novelty header
 *          content:
 *            type: string
 *            description: The novelty content
 *          image:
 *            type: string
 *            description: The novelty image
 *          categoryId:
 *            type: string
 *            description: The id of the new's category
 *        example:
 *          id: 2
 *          name: SOMOS MAS ABRE SU NUEVA LANDING PAGE
 *          content: Presentamos la nueva landing page hecha por el equipo de alkemy
 *          image: https://pbs.twimg.com/profile_images/835135487207690240/An3qhCfv_400x400.jpg
 *          categoryId: 1
 */

/**
 * @swagger
 * tags:
 *  name: News
 *  description: News endpoints DOCs
 */

/**
 * @swagger
 * /news/{noveltyId}/comments:
 *  get:
 *    summary: return comments by novelty id
 *    security:
 *        - bearerAuth: []
 *    parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: novelty id
 *          schema:
 *            type: integer
 *            format: int64
 *            minimun: 1
 *    tags: [Comments]
 *    responses:
 *      '200':
 *        description: Success
 *        content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                    $ref:'#components/schemas/news'
 *      '400':
 *          description: invalid token
 *      '401':
 *          description: access denied
 */

router
  .route("/:id/comments")
  .get(authMiddleware.isAuth, commentsController.getByNovelty);

/**
 * @swagger
 * /news/:
 *  get:
 *    summary: return all news
 *    security:
 *      - bearerAuth: [admin]
 *    tags: [News]
 *    responses:
 *          '200':
 *              description: Success
 *              content:
 *                application/json:
 *                  schema:
 *                  type: array
 *                  items:
 *                    $ref:'#components/schemas/news'
 *          '400':
 *              description: invalid token
 *          '401':
 *              description: access denied
 */

router.get("/", authMiddleware.isAdmin, paginateMiddleware.pageValidation, newsController.getAll);

/**
 * @swagger
 * /news/:
 *  post:
 *     summary: Create a novelty
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 schema:
 *                     $ref: '#components/schemas/news'
 *     tags: [News]
 *     responses:
 *          '200':
 *              description: Success
 *              content:
 *                application/json:
 *                  schema:
 *                  type: array
 *                  items:
 *                    $ref:'#components/schemas/news'
 *          '400':
 *              description: invalid token
 *          '401':
 *              description: access denied
 */
router.post(
  "/",
  authMiddleware.isAdmin,
  newsMiddleware.newsInputValidation,
  newsController.create
);
/**
 * @swagger
 * /news/{id}:
 *  get:
 *     summary: Get a novelty by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: novelty id
 *          schema:
 *            type: integer
 *            format: int64
 *            minimun: 1
 *     tags: [News]
 *     responses:
 *          '200':
 *              description: Success
 *              content:
 *                application/json:
 *                  schema:
 *                  type: array
 *                  items:
 *                    $ref:'#components/schemas/news'
 *          '400':
 *              description: invalid token
 *          '401':
 *              description: access denied
 */
router.route("/:id").get(authMiddleware.isAdmin, newsController.getById);
/**
 * @swagger
 * /news/{id}:
 *  put:
 *    summary: Update novelty by id
 *    security:
 *     - bearerAuth: []
 *    parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: novelty id
 *         schema:
 *           type: integer
 *           format: int64
 *           minimun: 1
 *    requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                    $ref: '#components/schemas/news'
 *    tags: [News]
 *    responses:
 *          '200':
 *              description: Success
 *              content:
 *                application/json:
 *                  schema:
 *                  type: array
 *                  items:
 *                    $ref:'#components/schemas/news'
 *          '400':
 *              description: invalid token
 *          '401':
 *              description: access denied
 */
router
  .route("/:id")
  .put(
    authMiddleware.isAdmin,
    newsMiddleware.newsInputValidation,
    newsController.update
  );
/**
 * @swagger
 * /news/{id}:
 *  delete:
 *     summary: Delete a novelty by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: novelty id
 *          schema:
 *            type: integer
 *            format: int64
 *            minimun: 1
 *     tags: [News]
 *     responses:
 *          '204':
 *              description: Success
 *              content:
 *                application/json:
 *                  schema:
 *                  type: array
 *                  items:
 *                    $ref:'#components/schemas/news'
 *          '400':
 *              description: invalid token
 *          '401':
 *              description: access denied
 */
router.route("/:id").delete(authMiddleware.isAdmin, newsController.remove);


module.exports = router;
