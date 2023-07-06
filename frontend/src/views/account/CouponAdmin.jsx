import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CouponAdmin() {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState('');
  const [value, setValue] = useState(0);
  const [unit, setUnit] = useState('');
  const [editingCoupon, setEditingCoupon] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8000/coupons',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
      const response = await axios.post('http://localhost:8000/coupons', {
        code,
        value,
        unit,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        setCode('');
        setValue(0);
        setUnit('');
        fetchCoupons();
      } else {
        console.error('Failed to add coupon');
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
  };

  const handleUpdateCoupon = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.patch(`http://localhost:8000/coupons/${editingCoupon._id}`, {
        code,
        value,
        unit,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setCode('');
        setValue(0);
        setUnit('');
        setEditingCoupon(null);
        fetchCoupons();
      } else {
        console.error('Failed to update coupon');
      }
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`http://localhost:8000/coupons/${couponId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 204) {
        fetchCoupons();
      } else {
        console.error('Failed to delete coupon');
      }
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  return (
    <div>
      <h2>Coupon Admin</h2>

      <div>
        <h3>Add Coupon</h3>
       {!editingCoupon &&  <form onSubmit={handleAddCoupon}>
          <label htmlFor="code">Code:</label>
          <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
          <label htmlFor="value">Value:</label>
          <input type="number" id="value" value={value} onChange={(e) => setValue(parseFloat(e.target.value))} required />
          <label htmlFor="unit">Unit:</label>
          <input type="text" id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} required />
          <button type="submit">Add Coupon</button>
        </form>}
      </div>

      <div>
        <h3>Coupons</h3>
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
                  <button onClick={() => handleEditCoupon(coupon)}>Edit</button>
                  <button onClick={() => handleDeleteCoupon(coupon._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingCoupon && (
        <div>
          <h3>Edit Coupon</h3>
          <form onSubmit={handleUpdateCoupon}>
            <label htmlFor="code">Code:</label>
            <input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
            <label htmlFor="value">Value:</label>
            <input type="number" id="value" value={value} onChange={(e) => setValue(parseFloat(e.target.value))} required />
            <label htmlFor="unit">Unit:</label>
            <input type="text" id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} required />
            <button type="submit">Update Coupon</button>
            <button onClick={() => setEditingCoupon(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CouponAdmin;
