import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProductAdmin.css';

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [name, setName] = useState('');
  const [publisher, setPublisher] = useState('');
  const [author, setAuthor] = useState('');
  const [categories, setCategories] = useState('');
  const [detail, setDetail] = useState('');
  const [imageUrls, setImageUrls] = useState('');
  const [price, setPrice] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
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
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:8000/products',
        {
          name,
          publisher,
          author,
          categories: categories.split(',').map((category) => category.trim()),
          detail,
          imageUrls: imageUrls.split(',').map((imageUrl) => imageUrl.trim()),
          price,
          isAvailable,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success('Product added successfully!');
        clearForm();
        fetchProducts();
      } else {
        console.error('Failed to add product');
        toast.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error adding product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`http://localhost:8000/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        toast.success('Product deleted successfully!');
        fetchProducts();
      } else {
        console.error('Failed to delete product');
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product');
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
    setFilteredProducts(filteredProducts);
  };

  const clearForm = () => {
    setName('');
    setPublisher('');
    setAuthor('');
    setCategories('');
    setDetail('');
    setImageUrls('');
    setPrice(0);
    setIsAvailable(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="product-admin-container">
      <div className="column" style={{height: '750px' }}>
        <h2>Add Product</h2>
        <form onSubmit={handleAddProduct}>
          <label htmlFor="name"><b>Name</b></label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="publisher"><b>Publisher</b></label>
          <input
            type="text"
            id="publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            required
          />
          <label htmlFor="author"><b>Author</b></label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <label htmlFor="categories"><b>Categories (comma-separated)</b></label>
          <input
            type="text"
            id="categories"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            required
          />
          <label htmlFor="detail"><b>Detail</b></label>
          <textarea
            id="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
          ></textarea>
          <label htmlFor="imageUrls"><b>Image URLs (comma-separated)</b></label>
          <input
            type="text"
            id="imageUrls"
            value={imageUrls}
            onChange={(e) => setImageUrls(e.target.value)}
            required
          />
          <label htmlFor="price"><b>Price</b></label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
          <div className="radio-buttons">
            <label><b>Is Available</b></label>
            <div className="radio-button">
              &emsp;&ensp;&emsp;&ensp;
              <input
                type="radio"
                name="isAvailable"
                value="yes"
                checked={isAvailable === true}
                onChange={() => setIsAvailable(true)}
              />
              <label htmlFor="isAvailableYes">Yes</label>
            </div>
            &emsp;&ensp;&emsp;&ensp;&emsp;&ensp;&emsp;&ensp;
            <div className="radio-button">
              <input
                type="radio"
                name="isAvailable"
                value="no"
                checked={isAvailable === false}
                onChange={() => setIsAvailable(false)}
              />
              <label htmlFor="isAvailableNo">No</label>
            </div>
          </div>
          <div className="submit-button-container">
            <button type="submit" className="submit-button">Add product</button>
          </div>
        </form>
      </div>
      <div className="column" style={{ width: '850px', height: '800px' }}>
        <div className="row">
          <div className="columna">
            <h2>Product List</h2>
          </div>
          <div className="columna">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>
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
                  <button onClick={() => handleDeleteProduct(product._id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <ul className="pagination1">
            {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }).map(
              (item, index) => (
                <li key={index} style={{ backgroundColor: 'f0f0f0', paddingBottom: '10px' }}>
                  <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default ProductAdmin;
