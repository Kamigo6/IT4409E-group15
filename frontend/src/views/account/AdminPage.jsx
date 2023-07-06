import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import OrderAdmin from './OrderAdmin';
import ProductAdmin from './ProductAdmin';
import CouponAdmin from './CouponAdmin';

function AdminPage() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchCustomer = async () => {
      try {
        const response = await axios.get('http://localhost:8000/customers/token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const customerData = response.data;
          if (!customerData?.isAdmin) {
            navigate('/');
            return null;
          }
          setAdmin(customerData);
        } else {
          console.error('Failed to fetch customer information');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchCustomer();
  }, []);


  return (
    <div>
      <h1>Product Admin</h1>
      <ProductAdmin />
      <OrderAdmin />
      <CouponAdmin />
    </div>
  );
}

export default AdminPage;
