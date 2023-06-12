/**
 * @swagger
 * components:
 *   schemas:
 *     UserRegister:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *           readOnly: true
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *
 *       example:
 *         username: "Ret Alm"
 *         password: "password"
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user
 *           readOnly: true
 *         username:
 *           type: string
 *           description: The username of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *
 *       example:
 *         username: "Ret Alm"
 *         password: "password"
 *
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       201:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRegister'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const app = express();

// Parsear las solicitudes JSON entrantes
app.use(bodyParser.json());

// Arrays y objetos para almacenar los datos de los usuarios
const users = require("../utils/users");
let last_id = 5;

// Ruta GET para obtener la lista de usuarios
router.get("/", (req, res) => {
  res.json(users);
});

// Ruta POST para registrar un nuevo usuario
router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const newUser = {
    id: last_id,
    username,
    password,
  };
  last_id++;
  users.push(newUser);
  res.status(200).json({ user: newUser }); // Send user information in response
});

// Ruta POST para iniciar sesión de un usuario
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    res.status(200).json({ user }); // Send user information in response
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
