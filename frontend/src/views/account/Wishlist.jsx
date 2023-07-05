import React, { useEffect, useState, lazy } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const CardProductWishList = lazy(() => import("../../components/card/CardProductWishList"));

const WishlistView = () => {
  const token = localStorage.getItem('token');
  const [customerId, setCustomerId] = useState(null);
  const [wishListData, setWishListData] = useState([]);
  const [containerHeight, setContainerHeight] = useState(700);

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const response = await axios.get('http://localhost:8000/customers/token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const customer = response.data;
        
        // Filter out duplicate products based on their IDs
        const uniqueWishlistData = customer.wishList.reduce((uniqueProducts, product) => {
          const isDuplicate = uniqueProducts.some((uniqueProduct) => uniqueProduct.productId._id === product.productId._id);
          if (!isDuplicate) {
            uniqueProducts.push(product);
          }
          return uniqueProducts;
        }, []);
        
        setWishListData(uniqueWishlistData);
        setCustomerId(customer._id);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getCustomer();
  }, []);

  useEffect(() => {
    if (wishListData.length > 6) {
      const newHeight = Math.ceil(wishListData.length / 2) * 250;
      setContainerHeight(newHeight);
    } else {
      setContainerHeight(700); // Kích thước ban đầu khi chỉ còn 6 sản phẩm
    }
  }, [wishListData]);

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
    <div className="container" style={{ height: `${containerHeight}px`, overflow: "hidden" }}>
            <b><h2 className="my-3">Wishlists</h2></b>
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
