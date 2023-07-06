import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderAdmin.css';

function OrderAdmin() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [statusFilter, orders]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const filterOrders = () => {
    const filteredOrders = orders.filter(order =>
      order.status.toLowerCase().includes(statusFilter.toLowerCase())
    );
    setFilteredOrders(filteredOrders);
  };

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:8000/orders/${orderId}`,
        {
          status: newStatus
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      if (response.status === 200) {
        fetchOrders();
      } else {
        console.error('Failed to change order status');
      }
    } catch (error) {
      console.error('Error changing order status:', error);
    }
  };
  

  return (
    <div className="order-admin-container">
      <div>
        <h3>Filter by Status</h3>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Delivery Info</th>
            <th>Delivery Fee</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {filteredOrders.map(order => (
    <tr key={order._id}>
      <td>{order._id}</td>
      <td className={`status-cell ${order.status}`}>
        {order.status}
      </td>
      <td>
        {order.delivery.name} at {order.delivery.shippingAddress.address}, {order.delivery.shippingAddress.district}, {order.delivery.shippingAddress.city}<br />
      </td>
      <td>{order.delivery.fee.toFixed(2)}</td>
      <td>${order.totalPrice.toFixed(2)}</td>
      <td>
        {order.status === 'pending' && (
          <button onClick={() => handleChangeStatus(order._id, 'completed')}>
            Mark as Completed
          </button>
        )}
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}

export default OrderAdmin;
