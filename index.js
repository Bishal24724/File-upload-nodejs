import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./config/sequelize.js";
import Product from "./models/product.js";
import productRoutes from "./routes/productRoutes.js";



dotenv.config();

const app = express();
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (e.g., images, CSS)
app.use(express.static('public'));

// Routes
app.use('/products', productRoutes); // Use the correct variable name for routes

// Start the server
app.listen(8000, async () => {
  console.log("Server is running on port 8000");
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Ensure tables are created
    console.log("Database connected");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
