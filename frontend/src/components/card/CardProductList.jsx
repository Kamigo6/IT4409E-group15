import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardProductList = ({ product }) => {
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
    <div className="card" style={{ height: "300px" }}>
      <ToastContainer autoClose={2000} />
      {notification && <div className="alert alert-success">{notification}</div>}
      <div className="row g-0">
        <div className="col-md-3 text-center">
          <Link to={`/product/${product._id}`}>
            <div
              className="image-container"
              style={{
                backgroundImage: `url(${product.imageUrls[0]})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "295px",
                width: "100%",
              }}
            />
          </Link>
        </div>

        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle me-2 d-inline">
              <Link to={`/product/${product._id}`} className="text-decoration-none">
                {product.name}
              </Link>
            </h6>

            <div>
              {Array.from({ length: 5 }, (_, key) => (
                <IconStarFill
                  className={product.ratings && key < product.ratings.length ? "text-warning me-1" : "text-secondary me-1"}
                  key={key}
                />
              ))}
            </div>

            {product.detail && (
              <p className="small mt-2">{product.detail}</p>
            )}
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <div className="mb-2">
              <span className="fw-bold h5">${product.price - product.discount.value}</span>
              {product.discount.value > 0 && (
                <del className="small text-muted ms-2">
                  ${(product.price).toFixed(2)}
                </del>
              )}
              {product.discount.value > 0 && (
                <span className={`rounded p-1 bg-warning ms-2 small`}>
                  -${product.discount.value}
                </span>
              )}
            </div>
            {product.isAvailable && (
              <p className="text-success small mb-2">
                <IconTruckFill /> Available
              </p>
            )}

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
      </div>
    </div>
  );
};

export default CardProductList;
