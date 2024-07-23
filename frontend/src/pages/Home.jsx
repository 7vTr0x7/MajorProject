import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const Home = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/categories");

      if (!res.ok) {
        console.log("Failed to Fetch");
      }

      const data = await res.json();
      console.log(data);
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <>
      <Header />
      <main className=" container py-4"></main>
    </>
  );
};

export default Home;

//http://localhost:4000/api/categories
