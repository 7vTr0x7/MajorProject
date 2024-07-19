const express = require("express");
const app = express();
app.use(express.json());

const { initializeDatabase } = require("./db/db.connect");

const Product = require("./models/product.models");

initializeDatabase();

const readAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.log(error);
  }
};

app.get("/products", async (req, res) => {
  try {
    const products = await readAllProducts();
    if (products.length > 0) {
      res.json({ products: products });
    } else {
      res.status(404).json({ error: "Products not Found" });
    }
  } catch (error) {
    console.log(`Failed to get products: ${error}`);
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});
