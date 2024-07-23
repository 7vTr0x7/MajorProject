import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

const Header = () => {
  return (
    <header className=" bg-body-tertiary">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <nav className="navbar">
              <h1 className="navbar-brand">MyCart</h1>
            </nav>
          </div>
          <div className="col-md-4 pt-2">
            <input type="text" placeholder="Search" className="form-control" />
          </div>
          <div className="col-md-4 ">
            <div className="float-end pt-1">
              <span style={{ fontSize: "25px", marginRight: "40px" }}>
                <FaRegHeart />
              </span>
              <span style={{ fontSize: "28px", marginRight: "20px" }}>
                <MdOutlineShoppingCart />
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
