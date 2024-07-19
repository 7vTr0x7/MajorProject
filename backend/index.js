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
    res.status(500).json({ error: `Failed to get products: ${error}` });
  }
});

const createProduct = async (prod) => {
  try {
    const newProd = new Product(prod);
    const savedProd = newProd.save();
    return savedProd;
  } catch (error) {
    console.log(error);
  }
};

app.post("/products", async (req, res) => {
  try {
    const product = await createProduct(req.body);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to create product: ${error}` });
  }
});

const deleteProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    return product;
  } catch (error) {
    console.log(error);
  }
};

app.delete("/products/:id", async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to delete product: ${error}` });
  }
});

const readProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    return product;
  } catch (error) {
    console.log(error);
  }
};

app.get("/products/:id", async (req, res) => {
  try {
    const product = await readProductById(req.params.id);
    if (product) {
      res.json({ product: product });
    } else {
      res.status(404).json({ error: "Product not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get product: ${error}` });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});
