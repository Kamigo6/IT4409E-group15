import React from "react";
import { Link } from "react-router-dom";

const FilterCategory = (props) => {
  return (
    <div className="card mb-3 accordion">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterCategory"
        aria-expanded="true"
        aria-controls="filterCategory"
      >
        Categories
      </div>
      <ul
        className="list-group list-group-flush show"
        id="filterCategory"
      >
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            Business & Finance
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            Fiction
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            Health & Fitness
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            History & Archaeology
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            Art & Photography
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            Romance
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/" className="text-decoration-none stretched-link">
            Food & Drink
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FilterCategory;
