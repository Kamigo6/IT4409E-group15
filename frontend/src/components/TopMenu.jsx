import { Link } from "react-router-dom";

const TopMenu = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-0">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          BookStore15
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to="/account/signin">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/account/signup">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/">
                All
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/business-finance">
                Business & Finance
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/fiction">
                Fiction
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/health-fitness">
                Health & Fitness
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/history-archaeology">
                History & Archaeology
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/art-photography">
                Art & Photography
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/romance">
                Romance
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/food-drink">
                Food & Drink
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopMenu;
