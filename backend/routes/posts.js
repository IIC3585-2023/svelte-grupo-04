/**
 * @swagger
 * components:
 *   schemas:
 *     PostPost:
 *       type: object
 *       required:
 *         - username
 *         - pgn
 *         - puzzle
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the post
 *           readOnly: true
 *         username:
 *           type: string
 *           description: The username the post
 *         pgn:
 *           type: string
 *           description: The pgn of the post
 *         puzzle:
 *           type: object
 *           description: The post solution
 *           properties:
 *             solution:
 *               type: array
 *               items:
 *                 type: string
 *           required:
 *             - solution
 *
 *       example:
 *         username: Ret Alm
 *         pgn: "d4 Nf6 Nf3 g6 Nc3 d6 e4 c5 Be3 cxd4 Bxd4 Nc6 Be3 Qa5 Bd2 Bg7 Be2 O-O O-O Qb6 Rb1 Bg4"
 *         puzzle:
 *           solution: ["e1e7", "f4f6", "e7f6"]
 *     PostGet:
 *       type: object
 *       required:
 *         - username
 *         - pgn
 *         - puzzle
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the post
 *           readOnly: true
 *         username:
 *           type: string
 *           description: The username the post
 *         pgn:
 *           type: string
 *           description: The pgn of the post
 *         puzzle:
 *           type: object
 *           description: The post solution
 *           properties:
 *             solution:
 *               type: array
 *               items:
 *                 type: string
 *           required:
 *             - solution
 *
 *       example:
 *         id: 1
 *         username: Ret Alm
 *         pgn: "d4 Nf6 Nf3 g6 Nc3 d6 e4 c5 Be3 cxd4 Bxd4 Nc6 Be3 Qa5 Bd2 Bg7 Be2 O-O O-O Qb6 Rb1 Bg4"
 *         puzzle:
 *           solution: ["e1e7", "f4f6", "e7f6"]
 *
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts managing API
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostPost'
 *     responses:
 *       200:
 *         description: The created post.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostPost'
 *       500:
 *         description: Some server error
 *
 *   get:
 *     summary: List of all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: The list of the posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PostGet'
 *       500:
 *         description: Some server error
 */

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const app = express();

// Parsear las solicitudes JSON entrantes
app.use(bodyParser.json());

// Arrays y objects para almacenar los datos
const posts = require("../util/posts");
let last_id = 5;

// Ruta GET para recibir los posts
router.get("/", (req, res) => {
  res.json(puzzles);
});

// Ruta POST para hacer un post de un puzzle
router.post("/", (req, res) => {
  const puzzle = req.body;
  const new_puzzle = Object.assign({ id: last_id }, puzzle);
  last_id = last_id + 1;
  puzzles.push(new_puzzle);
  res.sendStatus(200);
});

module.exports = router;
