import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import OrderAdmin from './OrderAdmin';
import ProductAdmin from './ProductAdmin';
import CouponAdmin from './CouponAdmin';

import './AdminPage.css'; // Import file CSS đã tạo

function AdminPage() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('product'); // Mặc định hiển thị ProductAdmin

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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="admin-page"> {/* Thêm class 'admin-page' */}
      <nav>
        <ul>
          <li
            className={activeTab === 'product' ? 'active' : ''}
            onClick={() => handleTabChange('product')}
          >
            PRODUCT
          </li>
          <li
            className={activeTab === 'order' ? 'active' : ''}
            onClick={() => handleTabChange('order')}
          >
            ORDER
          </li>
          <li
            className={activeTab === 'coupon' ? 'active' : ''}
            onClick={() => handleTabChange('coupon')}
          >
            COUPON
          </li>
        </ul>
      </nav>
      <div>
        {activeTab === 'product' && <ProductAdmin />}
        {activeTab === 'order' && <OrderAdmin />}
        {activeTab === 'coupon' && <CouponAdmin />}
      </div>
    </div>
  );
}

export default AdminPage;
