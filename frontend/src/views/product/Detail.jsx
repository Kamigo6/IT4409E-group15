import React, { lazy, useEffect, useState, useSearchParams } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart, faShoppingCart, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const CardFeaturedProduct = lazy(() => import("../../components/card/CardFeaturedProduct"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const Details = lazy(() => import("../../components/others/Details"));
const RatingsReviews = lazy(() => import("../../components/others/RatingsReviews"));
const QuestionAnswer = lazy(() => import("../../components/others/QuestionAnswer"));
const ShippingReturns = lazy(() => import("../../components/others/ShippingReturns"));
const SizeChart = lazy(() => import("../../components/others/SizeChart"));
const ProductDetailView = () => {
  const [featredProducts, setFeatredProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [ratings, setRatings] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/products/${id}`);
        const product = response.data;
        setProduct(product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    console.log(id);
    getProduct(id);

  }, [])
  return (

    <div className="container-fluid mt-3">

      <div className="row">
        <div className="col-md-8">
          <div className="row mb-3">
            <div className="col-md-5 text-center">

              <img src={product && product.imageUrls[0]} className="img-fluid" alt="Book" />


            </div>
            <div className="col-md-7">
              <h1 className="h5 d-inline me-2">
                {product && product.name}
              </h1>
              <dl className="row small mb-3">
                <dt className="col-sm-3">Availability</dt>
                {product && product.isAvailable && <dd className="col-sm-9 text-success">In Stock</dd>}
                {product && !product.isAvailable && <dd className="col-sm-9 text-danger">Out of Stock</dd>}
                <dt className="col-sm-3">Supplier</dt>
                <dd className="col-sm-9">{product && product.supplier}</dd>
              </dl>

              <div className="mb-3">
                <span className="fw-bold h5 me-2">{product && (product.price - product.discount.value)}</span>
                <del className="small text-muted me-2">{product && product.price}</del>
                <span className="rounded p-1 bg-warning  me-2 small">
                  ${product && product.discount.value}
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
                {product && product.imageUrls.map((url) => {
                  return (<img
                    src={url}
                    className="border border-secondary me-2" width="100"
                    alt="..."
                  />);
                })}
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
                  {product && product.detail}
                </div>

                <div
                  className="tab-pane fade"
                  id="nav-randr"
                  role="tabpanel"
                  aria-labelledby="nav-randr-tab"
                >
                  {product && product.ratings.map((rating) => {
                    return (
                      <RatingsReviews rating={rating} />
                    )
                  })}
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
          <CardFeaturedProduct cat={product && product.categories[0]} />
          <CardServices />
        </div>
      </div>
    </div>
  );
}


export default ProductDetailView;
