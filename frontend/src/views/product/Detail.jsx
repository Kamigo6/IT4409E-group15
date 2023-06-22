import React, { Component, lazy } from "react";
import withRouter from "../../components/withRouter";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faHeart,
  faShoppingCart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { data } from "../../data";
import axios from 'axios';

const CardFeaturedProduct = lazy(() =>
  import("../../components/card/CardFeaturedProduct")
);
const CardServices = lazy(() => import("../../components/card/CardServices"));
const Details = lazy(() => import("../../components/others/Details"));
const RatingsReviews = lazy(() =>
  import("../../components/others/RatingsReviews")
);
const QuestionAnswer = lazy(() =>
  import("../../components/others/QuestionAnswer")
);
const ShippingReturns = lazy(() =>
  import("../../components/others/ShippingReturns")
);
const SizeChart = lazy(() => import("../../components/others/SizeChart"));
class ProductDetailView extends Component {
  state = {
    ratings: [],
    category: "",
    products: [],
    featredProducts: [],
    id: "",
  };

  constructor(props) {
    super();
    this.state.id = props.params.id;
  }
  componentDidMount() {
    this.getProducts();
  }

  getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/products");
      const products = response.data.filter((product) => {
        return product._id == this.state.id;
      });
      const ratings = response.data.filter((rating) => {
        return rating.productId == products[0]._id;
      });

      const featredProducts = response.data.filter((product) => {
        return products[0].categories.includes(product.categories[0]);
      });

      console.log(featredProducts)
      this.setState({ products, ratings, category: products[0].category, featredProducts });

    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };




  render() {
    return (

      <div className="container-fluid mt-3">
        {this.state.products.map((product) => {
          return (
            <div className="row">
              <div className="col-md-8">
                <div className="row mb-3">
                  <div className="col-md-5 text-center">

                    <img src={product.imageUrls[0]} className="img-fluid" alt="Book" />


                  </div>
                  <div className="col-md-7">
                    <h1 className="h5 d-inline me-2">
                      {product.name}
                    </h1>

                    <div className="mb-3">
                      {/* <IconStarFill className="text-warning me-1" />
                  <IconStarFill className="text-warning me-1" />
                  <IconStarFill className="text-warning me-1" />
                  <IconStarFill className="text-warning me-1" />
                  <IconStarFill className="text-secondary me-1" />|{" "} */}
                      <span className="text-muted small">
                        {product.ratings.length} ratings
                      </span>
                    </div>
                    <dl className="row small mb-3">
                      <dt className="col-sm-3">Availability</dt>
                      {product.isAvailable && <dd className="col-sm-9">"In Stock"</dd>}
                      {!product.isAvailable && <dd className="col-sm-9">"Out of Stock"</dd>}
                      <dt className="col-sm-3">Supplier</dt>
                      <dd className="col-sm-9">{product.supplier}</dd>
                    </dl>

                    <div className="mb-3">
                      <span className="fw-bold h5 me-2">{product.price - product.discount.value}</span>
                      <del className="small text-muted me-2">{product.price}</del>
                      <span className="rounded p-1 bg-warning  me-2 small">
                        ${product.discount.value}
                      </span>
                    </div>
                    <div className="mb-3">
                      <div className="d-inline float-start me-2">
                        <div className="input-group input-group-sm mw-140">
                          <button
                            className="btn btn-primary text-white"
                            type="button"
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue="1"
                          />
                          <button
                            className="btn btn-primary text-white"
                            type="button"
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-sm btn-primary me-2"
                        title="Add to cart"
                      >
                        <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-warning me-2"
                        title="Buy now"
                      >
                        <FontAwesomeIcon icon={faShoppingCart} /> Buy now
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        title="Add to wishlist"
                      >
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                    </div>
                    <div>
                      <p className="fw-bold mb-2 small">
                        Product Highlights
                      </p>
                      <ul className="small">
                        <li>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </li>
                        <li>Etiam ullamcorper nibh eget faucibus dictum.</li>
                        <li>Cras consequat felis ut vulputate porttitor.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <nav>
                      <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a
                          className="nav-link active"
                          id="nav-details-tab"
                          data-bs-toggle="tab"
                          href="#nav-details"
                          role="tab"
                          aria-controls="nav-details"
                          aria-selected="true"
                        >
                          Details
                        </a>
                        <a
                          className="nav-link"
                          id="nav-randr-tab"
                          data-bs-toggle="tab"
                          href="#nav-randr"
                          role="tab"
                          aria-controls="nav-randr"
                          aria-selected="false"
                        >
                          Ratings & Reviews
                        </a>
                        <a
                          className="nav-link"
                          id="nav-ship-returns-tab"
                          data-bs-toggle="tab"
                          href="#nav-ship-returns"
                          role="tab"
                          aria-controls="nav-ship-returns"
                          aria-selected="false"
                        >
                          Shipping & Returns
                        </a>

                      </div>
                    </nav>

                    <div className="tab-content p-3 small" id="nav-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="nav-details"
                        role="tabpanel"
                        aria-labelledby="nav-details-tab"
                      >
                        {/* <Details /> */}
                        {product.detail}
                      </div>

                      <div
                        className="tab-pane fade"
                        id="nav-randr"
                        role="tabpanel"
                        aria-labelledby="nav-randr-tab"
                      >
                        {Array.from({ length: 5 }, (_, key) => (
                          <RatingsReviews key={key} />
                        ))}
                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-ship-returns"
                        role="tabpanel"
                        aria-labelledby="nav-ship-returns-tab"
                      >
                        <ShippingReturns />
                      </div>
                      <div
                        className="tab-pane fade"
                        id="nav-size-chart"
                        role="tabpanel"
                        aria-labelledby="nav-size-chart-tab"
                      >
                        <SizeChart />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <CardFeaturedProduct data={this.state.featredProducts} />
                <CardServices />
              </div>
            </div>
          )
        })}
      </div>
    );
  }
}

export default withRouter(ProductDetailView);
