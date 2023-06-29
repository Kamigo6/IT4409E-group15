import React, { Component, lazy, useEffect, useState } from "react";
import axios from 'axios';

const CardProductList2 = lazy(() =>
  import("../../components/card/CardProductList2")
);

const WishlistView = () => {
  const token = localStorage.getItem('token');
  const [products, setProducts] = useState([]);
  const [productsId, setProductsId] = useState([]);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    getCustomer();
    // console.log(customer);
    getProducts();
    // console.log(products);
  });

  const getCustomer = async () => {
    try {

      const response = await fetch('http://localhost:8000/customers/token', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const customerData = await response.json();
        setCustomer(customerData);

        let array = [];
        customerData.wishList.forEach(element => {
          array.push(element.productId);
        });
        setProductsId(array);
      } else {
        console.error('Failed to fetch customer information');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/products");

      const products = response.data.filter((product) => {
        return productsId.includes(product._id);
      });
      setProducts(products);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="container mb-3">
      <h4 className="my-3">Wishlists</h4>
      <div className="row g-3">
        {products.map((product) => {
          return (
            <div className="col-md-6">
              <CardProductList2 data={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}


export default WishlistView;
