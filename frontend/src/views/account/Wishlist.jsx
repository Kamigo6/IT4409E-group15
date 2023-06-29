import React, { useEffect, useState, lazy } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const CardProductWishList = lazy(() => import("../../components/card/CardProductWishList"));

const WishlistView = () => {
  const token = localStorage.getItem('token');
  const [customerId, setCustomerId] = useState(null);
  const [wishListData, setWishListData] = useState([]);

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const response = await axios.get('http://localhost:8000/customers/token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const customer = response.data
        setWishListData(customer.wishList);
        setCustomerId(customer._id);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getCustomer();
  }, []);

  const handleRemoveProductWishList = async (productId) => {
    try {
      const updatedWishlist = wishListData.filter((product) => product.productId._id !== productId);
      console.log(updatedWishlist);
      const response = await axios.patch(`http://localhost:8000/customers/${customerId}`,
        { wishList: updatedWishlist },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.status === 200) {
        setWishListData(updatedWishlist);
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  return (
    <div className="container mb-3">
      <h4 className="my-3">Wishlists</h4>
      <div className="row g-3">
        {wishListData.map((product, index) => (
          <div className="col-md-6" key={index}>
            <CardProductWishList product={product.productId} handleRemove={handleRemoveProductWishList} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistView;
