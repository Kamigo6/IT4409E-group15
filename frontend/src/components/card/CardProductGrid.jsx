import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./CardProductGrid.css"; 

const CardProductGrid = (props) => {
  const product = props.data;
  return (
    <div className="card">
      <img src={product.imageUrls[0]} className="card-img-top" alt="..." />


      <div className="card-body">
        <h6 className="card-subtitle mb-2">
          <Link to="/" className="text-decoration-none">
            {product.name}
          </Link>
        </h6>
        <div className="my-2">
          <span className="fw-bold h5">${product.price}</span>

          <span className="ms-2">
            {Array.from({ length: product.star }, (_, key) => (
              <IconStarFill className="text-warning me-1" key={key} />
            ))}
          </span>
        </div>
        <div className="btn-group  d-flex" role="group">
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
  );
};

export default CardProductGrid;
