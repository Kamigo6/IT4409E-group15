import React from "react";

export default function FilterClearButton({ clearFilters }) {
  return (
      <div className="card mb-3 fw-bold text-uppercase">
        <button type="reset" className="btn btn-sm btn-light" onClick={() => clearFilters()}>
          Clear All Filters
        </button>
      </div>

  );
};