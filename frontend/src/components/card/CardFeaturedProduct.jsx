import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";

const CardFeaturedProduct = (props) => {
  const products = props.data;
  return (
    <div className="card mb-3">
      <div className="card-header fw-bold text-uppercase">
        Featured Products
      </div>
      <div className="card-body">
        {products.map((product, idx) => (
          <div
            className={`row ${idx + 1 === products.length ? "" : "mb-3"}`}
            key={idx}
          >
            <div className="col-md-4">
              <img src={product.imageUrls[0]} className="img-fluid" alt="..." />
            </div>
            <div className="col-md-8">
              <h6 className="text-capitalize mb-1">
                <Link to={`/product/${product._id}`} className="text-decoration-none">
                  {product.name}
                </Link>
              </h6>
              {/* <div className="mb-2">
                {Array.from({ length: product.star }, (_, key) => (
                  <IconStarFill className="text-warning me-1" key={key} />
                ))}
              </div> */}
              <span className="fw-bold h5">${product.price - product.discount.value}</span>
              {product.price > 0 && (
                <del className="small text-muted ms-2">
                  ${product.price}
                </del>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardFeaturedProduct;
