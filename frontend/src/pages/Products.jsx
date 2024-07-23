import React from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

const Products = () => {
  const param = useParams();
  console.log(param.query ? "data" : "empty");

  return (
    <>
      <Header />
    </>
  );
};

export default Products;
