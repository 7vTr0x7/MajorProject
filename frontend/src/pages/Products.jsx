import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [priceRange, setPriceRange] = useState(100);

  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const param = useParams();

  const fetchData = async (url) => {
    try {
      const res = await fetch(`http://localhost:4000/api/${url}`);

      if (!res.ok) {
        console.log("Failed to fetch");
      }

      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!param.query) {
      fetchData("products");
    } else if (param.query === "discount") {
      fetchData("products/product/discount/true");
    } else {
      fetchData(`products/product/${param.query}`);
    }
  }, [param.query]);

  const filterProductByPriceRange = (price) => {
    const filtered = products.filter(
      (prod) => prod?.price?.originalPrice <= price
    );
    setFilteredProducts(filtered);
  };

  const handlePriceRange = (e) => {
    const { name, value } = e.target;
    filterProductByPriceRange(value);
    setPriceRange(value);
  };

  const clearFiltersHandler = () => {
    setPriceRange(1000);
    setSelectedCategories([]);
  };

  const getSubCategories = () => {
    const subCategories = [];
    for (let i = 0; i < filteredProducts.length; i++) {
      if (!subCategories.includes(filteredProducts[i].category.subCategory)) {
        subCategories.push(filteredProducts[i].category.subCategory);
      }
    }
    setSubCategories(subCategories);
  };

  useEffect(() => {
    getSubCategories();
  }, [products]);

  const filterProductsByCheckbox = () => {
    let filtered = products;
    if (selectedCategories.length > 0) {
      filtered = products.filter((prod) =>
        selectedCategories.includes(prod.category.subCategory)
      );
    }
    setFilteredProducts(filtered);
  };

  const categoriesHandler = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
  };

  useEffect(() => {
    filterProductsByCheckbox();
  }, [selectedCategories]);

  return (
    <>
      <Header />
      <main>
        <div className="row">
          <div className="col-md-3 py-4 px-4">
            <div className="d-flex justify-content-between">
              <h5>Filter</h5>
              <button className="btn btn-light" onClick={clearFiltersHandler}>
                <b>Clear</b>
              </button>
            </div>
            <div className="py-4">
              <h5>Price</h5>
              <input
                type="range"
                name="min"
                className="form-range"
                min={1000}
                step={1}
                max={5000}
                value={priceRange}
                onChange={handlePriceRange}
              />
              <div className="d-flex justify-content-between">
                <label>{priceRange}</label>
                <label>{5000}</label>
              </div>
            </div>
            <div className="py-3">
              <h5>Category</h5>
              {subCategories.length > 0 &&
                subCategories.map((category) => (
                  <div key={category}>
                    <input
                      id={category}
                      name="subCategory"
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      value={category}
                      onChange={categoriesHandler}
                    />
                    <label className="px-2" htmlFor={category}>
                      {category}
                    </label>
                  </div>
                ))}
            </div>
          </div>
          <div className="col-md-9 bg-body-tertiary py-4 px-4 rounded">
            <p>
              <b>Showing All Products</b> ( showing{" "}
              {filteredProducts && filteredProducts.length} products )
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default Products;
