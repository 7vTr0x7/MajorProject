import React from "react";

const ProductList = ({ products }) => {
  return (
    <div>
      <div className="row py-4">
        {products.map((prod) => (
          <>
            <div className="col-md-6 ">
              <div className="card  mt-2 rounded-0" style={{ height: "250px" }}>
                <div className="row">
                  <div className="col-md-4 ">
                    <div className="text-center">
                      <img
                        src={prod.productImageUrl}
                        alt={prod.title}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <p className="m-0 pt-3 pb-2 fw-semibold fs-5">
                      {prod.title}
                    </p>
                    {prod.price.discountAvailable ? (
                      <>
                        <span className="fw-bold fs-5">
                          {`$${
                            prod.price.originalPrice -
                            prod.price.originalPrice *
                              (prod.price.discountPercent / 100)
                          }`}
                        </span>
                        <span
                          className="fs-6 px-3"
                          style={{ textDecoration: "line-through" }}>
                          {`$${prod.price.originalPrice}`}
                        </span>
                        <p className="m-0 py-2 fw-semibold fs-5">
                          {`${prod.price.discountPercent}% Off`}
                        </p>
                      </>
                    ) : (
                      <span className="fw-bold fs-5">
                        {`$${prod.price.originalPrice}`}
                      </span>
                    )}
                    <div
                      className=" position-absolute bottom-0 "
                      style={{ width: "60%" }}>
                      <div className="d-grid gap-2 m-2">
                        <button
                          className="btn btn-outline-primary"
                          type="button">
                          Add to cart
                        </button>
                        <button className="btn btn-outline-info" type="button">
                          Save to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
