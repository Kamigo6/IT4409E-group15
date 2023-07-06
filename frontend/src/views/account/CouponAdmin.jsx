import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CouponAdmin.css';

function CouponAdmin() {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState('');
  const [value, setValue] = useState(0);
  const [unit, setUnit] = useState('');
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for showing/hiding the popup form

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8000/coupons', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCoupons(response.data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const handleAddCoupon = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:8000/coupons',
        {
          code,
          value,
          unit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setCode('');
        setValue(0);
        setUnit('');
        fetchCoupons();
        toast.success('Coupon added successfully!');
      } else {
        console.error('Failed to add coupon');
        toast.error('Failed to add coupon');
      }
    } catch (error) {
      console.error('Error adding coupon:', error);
    }
  };

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon);
    setCode(coupon.code);
    setValue(coupon.value);
    setUnit(coupon.unit);
    setShowPopup(true); // Show the popup form when editing
  };

  const handleUpdateCoupon = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.patch(
        `http://localhost:8000/coupons/${editingCoupon._id}`,
        {
          code,
          value,
          unit,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setCode('');
        setValue(0);
        setUnit('');
        setEditingCoupon(null);
        fetchCoupons();
        toast.success('Coupon updated successfully!');
      } else {
        console.error('Failed to update coupon');
        toast.error('Failed to update coupon');
      }
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`http://localhost:8000/coupons/${couponId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        fetchCoupons();
        toast.success('Coupon deleted successfully!');
      } else {
        console.error('Failed to delete coupon');
        toast.error('Failed to delete coupon');
         }
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  const handleTogglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="coupon-admin-container">
      <div className="column right">
        <h2>Add Coupon</h2>
        {!editingCoupon && (
          <form onSubmit={handleAddCoupon}>
            <label htmlFor="code"><b>Code</b></label>
            <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
            <label htmlFor="value"><b>Value</b></label>
            <input type="number" id="value" value={value} onChange={(e) => setValue(parseFloat(e.target.value))} required />
            <label htmlFor="unit"><b>Unit</b></label>
            <input type="text" id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} required />
            <div className="submit-button-container">
              <button type="submit" className="submit-button">Add Coupon</button>
            </div>
          </form>
        )}
      </div>

      <div className="column">
        <h2>Coupons</h2>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Value</th>
              <th>Unit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td>{coupon.code}</td>
                <td>{coupon.value}</td>
                <td>{coupon.unit}</td>
                <td>
                  <button onClick={() => handleEditCoupon(coupon)} className="edit-button">Edit</button>
                  <button onClick={() => handleDeleteCoupon(coupon._id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup form */}
      {showPopup && (
        <div className="popup-form">
          <div className="popup-form-content">
            <h3>Edit Coupon</h3>
            <form onSubmit={handleUpdateCoupon}>
              <label htmlFor="code"><b>Code</b></label>
              <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
              <label htmlFor="value"><b>Value</b></label>
              <input type="number" id="value" value={value} onChange={(e) => setValue(parseFloat(e.target.value))} required />
              <label htmlFor="unit"><b>Unit</b></label>
              <input type="text" id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} required />
              <div className="popup-form-buttons">
                <button type="submit">Update Coupon</button>
                <button type="button" onClick={handleTogglePopup}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default CouponAdmin;
