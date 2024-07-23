import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const param = useParams();

  const fetchData = async (url) => {
    try {
      const res = await fetch(`http://localhost:4000/api/${url}`);

      if (!res.ok) {
        console.log("Failed to fetch");
      }

      const data = await res.json();
      console.log(data);
      setProducts(data);
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

  return (
    <>
      <Header />
    </>
  );
};

export default Products;
