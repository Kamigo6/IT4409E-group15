import React, { lazy, useEffect, useState, useSearchParams } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart, faShoppingCart, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CardFeaturedProduct = lazy(() => import("../../components/card/CardFeaturedProduct"));
const CardServices = lazy(() => import("../../components/card/CardServices"));
const RatingsReviews = lazy(() => import("../../components/others/RatingsReviews"));
const ShippingReturns = lazy(() => import("../../components/others/ShippingReturns"));
const SizeChart = lazy(() => import("../../components/others/SizeChart"));
const ProductDetailView = () => {
  const [product, setProduct] = useState(null);
  const [value, setValue] = useState(1);
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const [content, setContent] = useState("");

  const handleRatingChange = (event) => {
    console.log(rating);
    setRating(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };


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


    getProduct(id);
    getRatings(id);
  }, [])
  useEffect(() => {

  }, [ratings])
  const getRatings = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/ratings`);
      const ratings = response.data.filter((rating) => { return (rating.productId === id) });
      setRatings(ratings);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const getCustomerData = async (token) => {
    if (token) {
      const response = await axios.get("http://localhost:8000/customers/token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      return null;
    }
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const customer = await getCustomerData(token);

      if (customer.cart.some(item => item.productId._id == id)) {
        toast.success("Product is already in the cart!");

        return 0;
      }

      if (customer) {
        const updatedCart = [...customer.cart, { productId: id, quantity: value }];
        await axios.patch(`http://localhost:8000/customers/${customer._id}`, { cart: updatedCart }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Product added to Cart successfully!");
      }
    } catch (error) {
      console.error("Error adding product to Cart:", error);
      toast.error("Error adding product to Cart:", error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const customer = await getCustomerData(token);
      if (customer) {
        const updatedWishlist = [...customer.wishList, { productId: id }];
        await axios.patch(`http://localhost:8000/customers/${customer._id}`, { wishList: updatedWishlist }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Product added to Wish List successfully!");
      }
    } catch (error) {
      console.error("Error adding product to Wish List:", error);
      toast.error("Error adding product to Wish List:", error);
    }
  };

  const handleMinusClick = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const handlePlusClick = () => {
    setValue(value + 1);
  };

  const handleRatingSubmit = async () => {
    getRatings(id);
    const token = localStorage.getItem("token");
    const customer = await getCustomerData(token);
    const newRating = {
      customerId: customer._id.toString(),
      productId: id.toString(),
      content: content,
      star: parseInt(rating),
      likes: 0,
      dislikes: 0
    };

    console.log(newRating);
    try {
      await axios.post("http://localhost:8000/ratings", newRating, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error adding order:", error);
    }

    setRating(0);
    setContent("");
  };

  return (
    <div className="container-fluid mt-3">
      <ToastContainer autoClose={2000} />
      <div className="row">
        <div className="col-md-8">
          <div className="row mb-3">
            <div className="col-md-5 text-center">
              <img
                src={product && product.imageUrls[0]}
                className="img-fluid"
                alt="Book"
                style={{ width: '300px', height: '450px' }}
              />
            </div>
            <div className="col-md-7">
              <h1 className="h2 d-inline me-2">
                {product && product.name}
              </h1>
              <dl className="row small mb-3">
                <dt className="col-sm-3">Availability</dt>
                {product && product.isAvailable && <dd className="col-sm-9 text-success strong">In Stock</dd>}
                {product && !product.isAvailable && <dd className="col-sm-9 text-danger">Out of Stock</dd>}
                <dt className="col-sm-3">Publisher</dt>
                <dd className="col-sm-9">{product && product.publisher}</dd>
                <dt className="col-sm-3">Author</dt>
                <dd className="col-sm-9">{product && product.author}</dd>
              </dl>

              <div className="mb-3">
                <span className="fw-bold h5 me-2">{product && (product.price - product.discount.value).toFixed(2)}</span>
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
                      onClick={handleMinusClick}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input
                      type="text"
                      className="form-control"
                      value={value}
                      readOnly
                    />
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onClick={handlePlusClick}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                {product && product.isAvailable &&
                  <button
                    type="button"
                    className="btn btn-sm btn-primary me-2"
                    title="Add to cart"
                    onClick={handleAddToCart}
                  >
                    <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                  </button>
                }
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  title="Add to wishlist"
                  onClick={handleAddToWishlist}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
              <div>
                {product && product.imageUrls.map((url, index) => {
                  return (<img
                    key={index}
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
                  <h4>Rate the Product</h4>
                  <div className="row mb-3 gx-1">
                    <div className="col-1">
                      <input type="number" value={rating} required className="form-control" min="0" max="5" onChange={handleRatingChange} />
                    </div>
                    <div className="col-8">
                      <input type="text" value={content} required className="form-control" onChange={handleContentChange} />
                    </div>
                    <div className="col">

                      <button className="btn btn-info" onClick={handleRatingSubmit}>Submit Rating</button>
                    </div>
                  </div>
                  {ratings && ratings.map((rating, index) => {
                    return (
                      <RatingsReviews key={index} rating={rating} />
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
