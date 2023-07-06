import React, { useState } from "react";
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";
import axios from 'axios';
import { Link } from "react-router-dom";
import "./Search.css"; // Import CSS file for Search component

const Search = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const getProducts = async (value) => {
    try {
      const response = await axios.get("http://localhost:8000/products");
      const products = response.data.filter((product) => {
        return (
          value &&
          product &&
          product.name &&
          product.name.toLowerCase().includes(value.toLowerCase())
        );
      });

      setResults(products.slice(0, 5)); // Limit the results to 5 items
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    getProducts(value);
  };

  const handleResultClick = (productName) => {
    setInput(productName);
    setResults([]); // Clear the results when a result is clicked
  };

  return (
    <form action="#" className="search">
      <div className="input-group">
        <input
          id="search"
          name="search"
          type="text"
          className="form-control"
          placeholder="Search..."
          required
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
        <label className="visually-hidden" htmlFor="search"></label>
        <button
          className="btn btn-primary text-white"
          type="submit"
          aria-label="Search"
        >
          <IconSearch />
        </button>
      </div>
      <div className="search-results">
        {results.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="search-result"
            onClick={() => handleResultClick(product.name)}
          >
            {product.name}
          </Link>
        ))}
      </div>
    </form>
  );
};

export default Search;
