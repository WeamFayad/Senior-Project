// Express
const express = require("express");
const app = express();
const cors = require("cors");

// DB connection
const { connectToMongoDb } = require("./configs/mongoDb.configs");

// Middlewares
const { authMiddleware } = require("./middlewares/auth.middleware");
const { userRoleMiddleware } = require("./middlewares/user_role.middleware");
const { adminRoleMiddleware } = require("./middlewares/admin_role.middleware");

// To receive JSON
app.use(express.json());

app.use(express.static('public'));
// Dotenv dependencies
require("dotenv").config();

// File upload dependencies
const fileUpload = require("express-fileupload");
const path = require("path");
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));

// CORS fix
app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Auth Routes
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

// User Routes
const userRoutes = require("./routes/user.routes");
app.use("/user", authMiddleware, userRoleMiddleware, userRoutes);

// Product Routes
const productRoutes = require("./routes/product.routes");
app.use("/products", authMiddleware, userRoleMiddleware, productRoutes);


// Order routes
const orderRoutes = require("./routes/order.routes");
app.use("/orders", authMiddleware, userRoleMiddleware, orderRoutes);

// Invoke connection to DB and Port
app.listen(8000, () => {
  console.log("listening");
  connectToMongoDb();
});
