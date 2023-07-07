import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const CardFeaturedProduct = ({ cat }) => {
  const [products, setProducts] = useState([])
  const getProducts = async (cat) => {

    try {
      let response
      if (cat === null) response = await axios.get("http://localhost:8000/products")
      else response = await axios.get(`http://localhost:8000/products/category/${cat}`)
      const products = response.data

      setProducts(products.slice(0, 5));
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    getProducts(cat);
  }, [])

  return (
    <div className="card mb-3">
      <div className="card-header fw-bold text-uppercase">
        Featured Products
      </div>
      <div className="card-body">
        {products && products.map((product, idx) => (
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
                  {products && product.name}
                </Link>
              </h6>
              <span className="fw-bold h5">${(product.price - product.discount.value).toFixed(2)}</span>
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
