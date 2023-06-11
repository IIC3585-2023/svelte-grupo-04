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
 *         - description
 *         - tags
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
 *         description:
 *           type: string
 *           description: The description of the post
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         likes:
 *           type: integer
 *           description: The number of likes the post has
 *
 *       example:
 *         username: Ret Alm
 *         pgn: "d4 Nf6 Nf3 g6 Nc3 d6 e4 c5 Be3 cxd4 Bxd4 Nc6 Be3 Qa5 Bd2 Bg7 Be2 O-O O-O Qb6 Rb1 Bg4"
 *         puzzle:
 *           solution: ["e1e7", "f4f6", "e7f6"]
 *         description: "description"
 *         tags: ["Long", "tag1"]
 *
 *     PostGet:
 *       type: object
 *       required:
 *         - username
 *         - pgn
 *         - puzzle
 *         - description
 *         - tags
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
 *         description:
 *           type: string
 *           description: The description of the post
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         likes:
 *           type: integer
 *           description: The number of likes the post has
 *
 *       example:
 *         id: 1
 *         username: Ret Alm
 *         pgn: "d4 Nf6 Nf3 g6 Nc3 d6 e4 c5 Be3 cxd4 Bxd4 Nc6 Be3 Qa5 Bd2 Bg7 Be2 O-O O-O Qb6 Rb1 Bg4"
 *         puzzle:
 *           solution: ["e1e7", "f4f6", "e7f6"]
 *         description: "description"
 *         tags: ["Long", "tag1"]
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
 *
 * /posts/{id}/like:
 *   post:
 *     summary: Give a like to a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the post to like
 *     responses:
 *       200:
 *         description: The post was liked successfully
 *       404:
 *         description: The post with the specified ID was not found
 *
 * /posts/{id}/unlike:
 *   post:
 *     summary: Remove a like from a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the post to unlike
 *     responses:
 *       200:
 *         description: The like was removed successfully
 *       404:
 *         description: The post with the specified ID was not found or it has no likes
 */

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

// Parsear las solicitudes JSON entrantes
app.use(bodyParser.json());

// Arrays y objects para almacenar los datos
const puzzles = require("../utils/posts");
let last_id =
  puzzles.reduce((max, post) => (post.id > max ? post.id : max), 0) + 1;

const filePath = path.join(__dirname, "../utils/posts.js");

// Function to save the posts array to the file
function savePostsToFile() {
  const content = `module.exports = ${JSON.stringify(puzzles, null, 2)};\n`;

  fs.writeFile(filePath, content, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("Posts saved to file.");
    }
  });
}

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
  savePostsToFile();
  res.sendStatus(200);
});

// Ruta POST para dar like a un post
router.post("/:id/like", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = puzzles.find((puzzle) => puzzle.id === postId);
  if (post) {
    post.likes = post.likes ? post.likes + 1 : 1;
    savePostsToFile();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// Ruta POST para remover like de un post
router.post("/:id/unlike", (req, res) => {
  const postId = parseInt(req.params.id);
  const post = puzzles.find((puzzle) => puzzle.id === postId);
  if (post && post.likes && post.likes > 0) {
    post.likes--;
    savePostsToFile();
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
