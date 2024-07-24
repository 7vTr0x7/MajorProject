import React from "react";

const ProductList = ({ products }) => {
  return (
    <div>
      <div className="row py-4">
        {products.map((prod) => (
          <>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-4">
                  <img
                    src={prod.productImageUrl}
                    alt={prod.title}
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-8"></div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
