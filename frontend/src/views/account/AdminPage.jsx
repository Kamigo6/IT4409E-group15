import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

function AdminPage() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [name, setName] = useState('');
  const [categories, setCategories] = useState('');
  const [detail, setDetail] = useState('');
  const [imageUrls, setImageUrls] = useState('');
  const [price, setPrice] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  console.log(admin);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchCustomer = async () => {
      try {
        const response = await fetch('http://localhost:8000/customers/token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const customerData = await response.json();
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
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, products]);
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/products', {
        name,
        categories: categories.split(',').map((category) => category.trim()),
        detail,
        imageUrls: imageUrls.split(',').map((imageUrl) => imageUrl.trim()),
        price,
        isAvailable,
      });

      if (response.status === 201) {
        setName('');
        setCategories('');
        setDetail('');
        setImageUrls('');
        setPrice(0);
        setIsAvailable(true);
        fetchProducts();
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/products/${productId}`);

      if (response.status === 200) {
        fetchProducts();
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filterProducts = () => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filteredProducts);
  };

  const handleSearch = () => {
    // Implement search logic here
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Product Admin</h1>

      <div>
        <h2>Add Product</h2>
        <form onSubmit={handleAddProduct}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="categories">Categories (comma-separated):</label>
          <input
            type="text"
            id="categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            required
          />
          <label htmlFor="detail">Detail:</label>
          <textarea
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
          />
          <label htmlFor="imageUrls">Image URLs (comma-separated):</label>
          <input
            type="text"
            id="imageUrls"
            value={imageUrls}
            onChange={(e) => setImageUrls(e.target.value)}
            required
          />
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
          <label htmlFor="isAvailable">Is Available:</label>
          <input
            type="checkbox"
            id="isAvailable"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
          />
          <button type="submit">Add Product</button>
        </form>
      </div>

      <div>
        <h2>Search Products</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Categories</th>
            <th>Price</th>
            <th>Is Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.categories.join(', ')}</td>
              <td>{product.price}</td>
              <td>{product.isAvailable ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleDeleteProduct(product._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }).map(
            (item, index) => (
              <li key={index}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default AdminPage;
