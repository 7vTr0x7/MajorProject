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
      <main className=" container py-4">
        <div className="row">
          {categories.length > 0 &&
            categories.map((category) => (
              <div key={category._id} className="col-md-3 text-center">
                <button className="btn btn-light">{category.name}</button>
              </div>
            ))}
        </div>
        <div className="py-4">
          <img
            src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch_GEO_EMEA_FMT_WHH?wid=1280&hei=492&fmt=p-jpg&qlt=80&.v=cHJOTXEwTU92OEtKVDV2cVB1R2FTSjlERndlRTljaUdZeHJGM3dlLzR2K0VvSjFQM0pLN0VsK2pmbVJmK1hUZDhiZjRKRUJ6ZU96N3VHVCtXdS9WdVUzdWN4ZENIZEJCc01VOW1QK3BzTGMwY0RTUkhheWNvR1RXWFJ2NkRSYlBYRHd6VEFkSzNvUlZ2U29jZWRzYWxnPT0=&traceId=1"
            alt="product"
            className="img-fluid"
          />
        </div>
        <div className="row py-4">
          <div className="col-md-6 text-center">
            <button className="btn btn-light">All Products</button>
          </div>
          <div className="col-md-6 text-center">
            <button className="btn btn-light">Products With Discount</button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

//http://localhost:4000/api/categories
