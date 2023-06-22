import React from "react";

export default function FilterClear({ clearFilter }) {
  return (
    <div className="card mb-3">
      <div className="card-body fw-bold text-uppercase">
        Filter by{" "}
        <button type="reset" className="btn btn-sm btn-light" onClick={() => clearFilter()}>
          <span aria-hidden="true">&times;</span> Clear All
        </button>
      </div>
    </div>
  );
};

