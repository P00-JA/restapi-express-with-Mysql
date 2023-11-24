const express = require("express");
const User = require("./models/User");
const sequelize = require("./database");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
const PORT = 3600;

app.use(express.json());

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API with SWAGGER",
      version: "1.0.0",
      description: "A sample api to demonstrate swagger with node.js",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ["./app.js"],
};

const swaggerSpec = swaggerJsdoc(options);

//swagger server
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//
/**
 * @swagger
 * /success:
 *  get:
 *     summary: its a success statement for the api working.
 *     description: a get request to check if API is working.
 *     responses:
 *       '200':    
 *         description: API working.
 */
app.get("/success", (req, res) => {
  res.status(200).send("Hi World" );
});
//sync program with database
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("All models are synchronized successfully");
  })
  .catch((error) => {
    console.log("error occurred during model synchronization");
  });


 /**
 * @swagger
 * /users:
 *   get:
 *    summary: view all users
 *    description: API to view all users in table.
 *    responses:
 *      '200':
 *        description: User updated successfully
 */ 
//get all users
app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

/**
 * @swagger
 * /users:
 *   post:
 *    summary: Adds a new user
 *    requestBody:
 *      content:
 *        application/json:
 *           schema: # Request body contents
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: user
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *    responses:
 *      '200':
 *        description: User added successfully
 */
//Add a user
app.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    console.log(req.body);
    const newUser = await User.create({ name, email });
    console.log(newUser);
    res.json(newUser);
  } catch (err) {
    console.log(err);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *    summary: update  a user by id
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer 
 *    requestBody:
 *      content:
 *        application/json:
 *           schema: # Request body contents
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: user
 *               email:
 *                 type: string
 *                 example: user@gmail.com
 *    responses:
 *      '200':
 *        description: User updated successfully
 */
app.put("/users/:id", async (req, res) => {
  const {name, email }=req.body;
  const user = await User.findByPk(req.params.id);
  if (user) {
    user.name = name;
    user.email = email;
    await user.save();
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *    summary: delete  a user by id
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer 
 *    responses:
 *      '200':
 *        description: User deleted successfully
 */
app.delete("/users/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.status(204).send("user deleted successfully");
  } else {
    res.status(404).send("user not found");
  }
});


/**
 * @swagger
 * /users/{id}:
 *   get:
 *    summary: found  a user by id
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer 
 *    responses:
 *      '200':
 *        description: User found successfully
 */
app.get("/users/:id", async (req, res) => {
  const userById = await User.findByPk(req.params.id);
  if (userById) {
    res.json(userById);
  } else {
    res.status(404).send("user not found");
  }
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
