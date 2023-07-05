import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./CardProductGrid.css";

const CardProductGrid = ({ product }) => {
  const [notification, setNotification] = useState(null);

  const getCustomerData = async (token) => {
    if (token) {
      const response = await axios.get("http://localhost:8000/customers/token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      setNotification("Not authenticated!");
      return null;
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const customer = await getCustomerData(token);
      if (customer) {
        const updatedCart = [...customer.cart, { productId: productId, quantity: 1 }];
        await axios.patch(`http://localhost:8000/customers/${customer._id}`, { cart: updatedCart }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Product added to Cart successfully!");
      }
    } catch (error) {
      console.error("Error adding product to Cart:", error);
      toast.error("Error adding product to Cart:", error);
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const customer = await getCustomerData(token);
      if (customer) {
        const updatedWishlist = [...customer.wishList, { productId: productId }];
        await axios.patch(`http://localhost:8000/customers/${customer._id}`, { wishList: updatedWishlist }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Product added to Wish List successfully!");
      }
    } catch (error) {
      console.error("Error adding product to Wish List:", error);
      toast.error("Error adding product to Wish List:", error);
    }
  };

  return (
    <div className="card">
  <ToastContainer autoClose={2000} />
  {notification && <div className="alert alert-success">{notification}</div>}
  <div className="card-img-container">
    <Link to={`/product/${product._id}`} className="text-decoration-none">
      <img src={product.imageUrls[0]} className="card-img-top" alt="Product" />
    </Link>
  </div>
  <div className="card-body">
    <h6 className="card-subtitle mb-2">
      <Link to={`/product/${product._id}`} className="text-decoration-none">
        {product.name}
      </Link>
    </h6>
        <div className="my-2">
          <span className="fw-bold h5">${product.price}</span>
          {product.discount.value > 0 && (
            <del className="small text-muted ms-2">
              ${(product.price + product.discount.value).toFixed(2)}
            </del>
          )}
          {product.discount.value > 0 && (
            <span className={`rounded p-1 bg-warning ms-2 small`}>
              -${product.discount.value}
            </span>
          )}
        </div>
        <div className="d-flex align-items-center mb-2">
          <div className="rating-stars me-2">
            {Array.from({ length: 5 }, (_, key) => (
              <FontAwesomeIcon
                icon={faStar}
                className={product.ratings && key < product.ratings.length ? "text-warning me-1" : "text-secondary me-1"}
                key={key}
              />
            ))}
          </div>
          <span className="text-muted small">{product.rating}</span>
        </div>
        <div className="btn-group d-flex" role="group">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            title="Add to cart"
            onClick={() => handleAddToCart(product._id)}
          >
            <FontAwesomeIcon icon={faCartPlus} />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            title="Add to wishlist"
            onClick={() => handleAddToWishlist(product._id)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardProductGrid;
