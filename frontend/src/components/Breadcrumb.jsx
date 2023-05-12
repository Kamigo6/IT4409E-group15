import React from "react";
import { Link } from "react-router-dom";
const Breadcrumb = () => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb rounded-0">
        <li className="breadcrumb-item">
          <Link to="/" title="Home">
            Home
          </Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/" title="Fiction">
            Fiction
          </Link>
        </li>
      </ol>
    </nav>
  );
};
export default Breadcrumb;
