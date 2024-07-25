const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

const { initializeDatabase } = require("./db/db.connect");

const Product = require("./models/product.models");
const Categories = require("./models/categories.models");

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

initializeDatabase();

const readAllProducts = async () => {
  try {
    const products = await Product.find({});
    return products;
  } catch (error) {
    console.log(error);
  }
};

app.get("/api/products", async (req, res) => {
  try {
    const products = await readAllProducts();
    if (products.length > 0) {
      res.json(products);
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
    const savedProd = await newProd.save();
    return savedProd;
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/products", async (req, res) => {
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

app.delete("/api/products/:id", async (req, res) => {
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

app.get("/api/products/:id", async (req, res) => {
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

const readAllCategories = async () => {
  try {
    const categories = await Categories.find();
    return categories;
  } catch (error) {
    console.log(error);
  }
};

app.get("/api/categories", async (req, res) => {
  try {
    const categories = await readAllCategories();
    if (categories) {
      res.json(categories);
    } else {
      res.status(404).json({ error: "categories not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get categories: ${error}` });
  }
});

const readCategoryById = async (id) => {
  try {
    const categories = await Categories.findById(id);
    return categories;
  } catch (error) {
    console.log(error);
  }
};

app.get("/api/categories/:id", async (req, res) => {
  try {
    const category = await readCategoryById(req.params.id);
    if (category) {
      res.json({ category: category });
    } else {
      res.status(404).json({ error: "category not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get category: ${error}` });
  }
});

const addCategories = async (category) => {
  try {
    const newCategory = await Categories(category);
    const savedCategory = await newCategory.save();
    return savedCategory;
  } catch (error) {
    console.log(error);
  }
};

app.post("/api/categories", async (req, res) => {
  try {
    const category = await addCategories(req.body);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: "category not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to create category: ${error}` });
  }
});

const readProductsByCategory = async (category) => {
  try {
    const products = await Product.find({ "category.mainCategory": category });
    return products;
  } catch (error) {
    console.log(error);
  }
};

app.get("/api/products/product/:category", async (req, res) => {
  try {
    const products = await readProductsByCategory(req.params.category);
    if (products.length > 0) {
      res.json(products);
    } else {
      res.status(404).json({ error: "Products not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get Products: ${error}` });
  }
});

const readProductsByDiscount = async () => {
  try {
    const products = await Product.find({ "price.discountAvailable": true });
    return products;
  } catch (error) {
    console.log(error);
  }
};

app.get("/api/products/product/discount/true", async (req, res) => {
  try {
    const products = await readProductsByDiscount();
    if (products) {
      res.json(products);
    } else {
      res.status(404).json({ error: "Products not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get Products: ${error}` });
  }
});

const updateProduct = async (id, data) => {
  try {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    return product;
  } catch (error) {
    console.log(error);
  }
};

app.post("./api/products/product/:id", async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req, body);
    if (product) {
      res, json(product);
    } else {
      res.status(404).json({ error: "Product not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to update Product: ${error}` });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server Running on Port: ${PORT}`);
});
