import React, { lazy, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faBars } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
const Paging = lazy(() => import("../../components/Paging"));
const Pagination = lazy(() => import("../../components/Pagination"));
const Breadcrumb = lazy(() => import("../../components/Breadcrumb"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterClearButton = lazy(() => import("../../components/filter/Clear"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const CardProductGrid = lazy(() => import("../../components/card/CardProductGrid"));
const CardProductList = lazy(() => import("../../components/card/CardProductList"));

const categoryNameMap = {
  "business-finance": "Business & Finance",
  "fiction": "Fiction",
  "health-fitness": "Health & Fitness",
  "history-archaeology": "History & Archaeology",
  "art-photography": "Art & Photography",
  "romance": "Romace",
  "food-drink": "Food & Drink",
  "all": "All"
};

const productNumberPerPage = 2;

const ProductListView = ({ catName }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [priceFilterMode, setPriceFilterMode] = useState("all");
  const [rank, setRank] = useState("latest");
  const [view, setView] = useState("list");
  const [customer, setCustomer] = useState(null);

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
          setCustomer(customerData);
        } else {
          console.error('Failed to fetch customer information');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCustomer();
  }, []);

  useEffect(() => {
    initializeProducts();
  }, []);

  const initializeProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/products");
      setProducts(response.data);
      setFilteredProducts(response.data);
      setTotalItems(response.data.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    if (catName === "all") {
      setFilteredProducts(products);
    }
    else {
      console.log(catName);
      setFilteredProducts(products.filter(product => product.categories.includes(catName)));
    }
  }, [catName]);

  useEffect(() => {
    if (priceFilterMode === "all") {
      setFilteredProducts(products);
    }
    else if (priceFilterMode === "low") {
      setFilteredProducts(products.filter(product => product.price < 10));
    } else if (priceFilterMode === "low-medium") {
      setFilteredProducts(products.filter(product => product.price >= 10 && product.price <= 20));
    } else if (priceFilterMode === "medium") {
      setFilteredProducts(products.filter(product => product.price >= 20 && product.price <= 30));
    } else if (priceFilterMode === "high") {
      setFilteredProducts(products.filter(product => product.price >= 30));
    }
  }, [priceFilterMode]);

  const clearFilters = () => {
    setPriceFilterMode("all");
  };

  const handleChangePriceFilter = (mode) => {
    setPriceFilterMode(mode);
  };

  const sortBy = (event) => {
    setRank(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onChangeView = (view) => {
    setView(view);
  };

  return (
    <React.Fragment>
      <div
        className="p-5 bg-primary bs-cover"
        style={{
          backgroundImage: "https://blog-cdn.reedsy.com/directories/admin/featured_image/579/what-is-literary-fiction-28dfaa.jpg",
        }}
      >
        <div className="container text-center">
          <span className="display-5 px-3 bg-white rounded shadow">
            {categoryNameMap[catName]}
          </span>
        </div>
      </div>
      <Breadcrumb catName={categoryNameMap[catName]} />
      <div className="container-fluid mb-3">
        <div className="row">
          <div className="col-md-3">
            <FilterCategory />
            <FilterPrice handleChangePriceFilter={handleChangePriceFilter} />
            <FilterClearButton clearFilters={clearFilters} />
            <CardServices />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-7">
                <span className="align-middle fw-bold">
                  {totalItems} results for{" "}
                  <span className="text-warning">{categoryNameMap[catName]}</span>
                </span>
              </div>
              <div className="col-5 d-flex justify-content-end">
                <select
                  id="rank"
                  onChange={sortBy}
                  className="form-select mw-180 float-start"
                  aria-label="Default select"
                >
                  <option value={"latest"}>Latest items</option>
                  <option value={"price"}>Price low to high</option>
                  <option value={"r_price"}>Price high to low</option>
                </select>
                <div className="btn-group ms-3" role="group">
                  <button
                    aria-label="Grid"
                    type="button"
                    onClick={() => onChangeView("grid")}
                    className={`btn ${view === "grid" ? "btn-primary" : "btn-outline-primary"
                      }`}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </button>
                  <button
                    aria-label="List"
                    type="button"
                    onClick={() => onChangeView("list")}
                    className={`btn ${view === "list" ? "btn-primary" : "btn-outline-primary"
                      }`}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="row g-3">
              {view === "grid" &&
                filteredProducts.slice((currentPage - 1) * productNumberPerPage, currentPage * productNumberPerPage).map((product, idx) => (
                  <div key={idx} className="col-md-4">
                    <CardProductGrid product={product}/>
                  </div>
                ))}
              {view === "list" &&
                filteredProducts.slice((currentPage - 1) * productNumberPerPage, currentPage * productNumberPerPage).map((product, idx) => (
                  <div key={idx} className="col-md-12">
                    <CardProductList product={product}/>
                  </div>
                ))}
            </div>
            <hr />
            <Pagination
              filteredProducts={filteredProducts}
              pageLimit={productNumberPerPage}
              pageNeighbours={1}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              sizing=""
              alignment="justify-content-center"
            />

          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductListView;
