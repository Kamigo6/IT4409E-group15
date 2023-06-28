import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";

const CardProductList = (props) => {
  const products = props.data;
  return (
    <div className="card">
      <div className="row g-0">
        <div className="col-md-3 text-center">
          <Link to={`/product/${products._id}`} >
            <img src={products.imageUrls[0]} className="img-fluid" alt="Book" />
          </Link>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle me-2 d-inline">
              <Link to={`/product/${products._id}`} className="text-decoration-none">
                {products.name}
              </Link>
            </h6>

            <div>
              {Array.from({ length: 5 }, (_, key) => (
                <IconStarFill
                  className={products.ratings && key < products.ratings.length ? "text-warning me-1" : "text-secondary me-1"}
                  key={key}
                />
              ))}
            </div>

            {products.detail && (
              <p className="small mt-2">{products.detail}</p>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <div className="mb-2">
              <span className="fw-bold h5">${products.price}</span>
              {products.discount.value > 0 && (
                <del className="small text-muted ms-2">
                  ${products.price + products.discount.value}
                </del>
              )}
              {products.discount.value > 0 && (
                <span className={`rounded p-1 bg-warning ms-2 small`}>
                  -${products.discount.value}
                </span>
              )}
            </div>
            {products.isAvailable && (
              <p className="text-success small mb-2">
                <IconTruckFill /> Available
              </p>
            )}

            <div className="btn-group d-flex" role="group">
              <button
                type="button"
                className="btn btn-sm btn-primary"
                title="Add to cart"
              >
                <FontAwesomeIcon icon={faCartPlus} />
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                title="Add to wishlist"
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProductList;
