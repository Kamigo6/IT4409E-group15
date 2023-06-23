import React from "react";
import { useState } from "react";
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";
import axios from 'axios';
import { Link } from "react-router-dom";

const Search = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState();
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

      console.log(products)
      setResults(products);

    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleChange = (value) => {
    console.log(value);
    setInput(value);
    getProducts(value);
  };

  return (
    <form action="#" className="search">
      <div className="input-group">
        <input
          id="search"
          name="search"
          type="text"
          className="form-control"
          placeholder="Search"
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
      {results.map((product) => {
        return (
          <Link to={`/product/${product._id}`}>
            <div>
              {product.name}
            </div>
          </Link>

        );
      })}
    </form>
  );
};
export default Search;
