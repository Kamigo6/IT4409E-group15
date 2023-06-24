import React from "react";

const FilterPrice = ({ handleChangePriceFilter }) => {
  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterPrice"
        aria-expanded="true"
        aria-controls="filterPrice"
      >
        Price
      </div>
      <div className="card-body show" id="filterStar">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault5"
            onClick={() => handleChangePriceFilter("low")}
          />
          <label
            className="form-check-label"
            htmlFor="flexRadioDefault5"
            aria-label="Star"
          >
            $00.00 - $10.00
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault4"
            onClick={() => handleChangePriceFilter("low-medium")}
          />
          <label
            className="form-check-label"
            htmlFor="flexRadioDefault4"
            aria-label="Star"
          >
            $10.00 - $20.00
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault3"
            onClick={() => handleChangePriceFilter("medium")}
          />
          <label
            className="form-check-label"
            htmlFor="flexRadioDefault3"
            aria-label="Star"
          >
            $20.00 - $30.00
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            onClick={() => handleChangePriceFilter("high")}
          />
          <label
            className="form-check-label"
            htmlFor="flexRadioDefault2"
            aria-label="Star"
          >
            Greater or equal to $30.00
          </label>
        </div>

      </div>

    </div>
  );
};

export default FilterPrice;
