import React, { useState, useEffect, lazy } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CouponApplyForm = lazy(() => import("../../components/others/CouponApplyForm"));

const CartView = () => {
  const [coupon, setCoupon] = useState({ value: 0 });
  const [customer, setCustomer] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const data = {
    cart: cartData,
    customer: customer,
    totalPrice: totalPrice,
    totalDiscount: totalDiscount,
    coupon: coupon

  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:8000/customers/token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data.cart);
          setCartData(response.data.cart);
          setCustomer(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (cartData.length > 0) {
      let total = 0;
      let dis = 0;
      for (const item of cartData) {
        total += (item.productId.price - item.productId.discount.value) * item.quantity;
        dis = dis + item.productId.discount.value * item.quantity;
      }
      setTotalPrice(total);
      setTotalDiscount(dis);
    } else {
      setTotalPrice(0);
    }
  }, [cartData]);

  const patchCartData = async (updatedCartData) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.patch(`http://localhost:8000/customers/${customer._id}`, { cart: updatedCartData }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        console.log("No token in localstorage");
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  const handleMinusQuantity = (index) => {
    setCartData((prevCartData) => {
      const updatedCartData = [...prevCartData];
      if (updatedCartData[index].quantity > 1) {
        updatedCartData[index] = {
          ...updatedCartData[index],
          quantity: updatedCartData[index].quantity - 1
        };
      }
      patchCartData(updatedCartData);
      return updatedCartData;
    });
  };

  const handlePlusQuantity = (index) => {
    setCartData((prevCartData) => {
      const updatedCartData = [...prevCartData];
      updatedCartData[index] = {
        ...updatedCartData[index],
        quantity: updatedCartData[index].quantity + 1
      };
      patchCartData(updatedCartData);
      return updatedCartData;
    });
  };

  const handleQuantityChangeByInput = (event, index) => {
    const newQuantity = parseInt(event.target.value);
    if (isNaN(newQuantity) || newQuantity <= 0 || !Number.isInteger(newQuantity)) {
      return;
    }

    setCartData((prevCartData) => {
      const updatedCartData = [...prevCartData];
      updatedCartData[index].quantity = newQuantity;
      patchCartData(updatedCartData);
      return updatedCartData;
    });
  };

  const handleDeleteItem = (index) => {
    setCartData((prevCartData) => {
      const updatedCartData = [...prevCartData];
      updatedCartData.splice(index, 1);
      patchCartData(updatedCartData);
      return updatedCartData;
    });
  };

  const handleMakePurchase = (e) => {
    if (cartData.length === 0) {
      e.preventDefault();
      toast.error("There are no products in the cart!");
    }
  };

  const handleWrongCoupon = () => {
    toast.error("Invalid coupon code or cannot be applied!");
  };

  const onSubmitApplyCouponCode = async (values) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(`http://localhost:8000/coupons/code/${values.coupon}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCoupon(response.data);
        toast.success("Coupon applied successfully!");
      } catch (error) {
        console.error("Error fetching data:", error);
        setCoupon({ value: 0 });
        handleWrongCoupon();
      }
    }
  };

  return (
    <React.Fragment>
      <div className="border-top p-4 text-white mb-3 " style={{ background: "DodgerBlue" }}>
        <h1 className="display-8">Shopping Cart</h1>
      </div>
      <div className="container mb -6">
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col" className="text-center"><b>Product</b></th>
                      <th scope="col" width={120} className="text-center">
                        <b>Quantity</b>
                      </th>
                      <th scope="col" width={150}>
                        <b>Price</b>
                      </th>
                      <th scope="col" className="text-end" width={130}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="row">
                            <div className="col-3 d-none d-md-block">
                              <img
                                src={item.productId.imageUrls[0]}
                                width="80"
                                alt="Product"
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="input-group input-group-sm mw-140">
                            <button
                              className="btn btn-primary text-white"
                              type="button"
                              onClick={() => handleMinusQuantity(index)}
                            >
                              <FontAwesomeIcon icon={faMinus} />
                            </button>
                            <input
                              type="text"
                              className="form-control"
                              value={item.quantity}
                              onChange={(event) => handleQuantityChangeByInput(event, index)}
                            />
                            <button
                              className="btn btn-primary text-white"
                              type="button"
                              onClick={() => handlePlusQuantity(index)}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          </div>
                        </td>
                        <td>
                          <var className="price">${((item.productId.price - item.productId.discount.value) * item.quantity).toFixed(2)}</var>
                          <small className="d-block text-muted">
                            ${(item.productId.price - item.productId.discount.value).toFixed(2)} <del className="text-danger">{item.productId.price.toFixed(2)}</del> each
                          </small>
                        </td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteItem(index)}>
                            <IconTrash className="i-va" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-footer">
                <Link to="/checkout" state={data}

                  className="btn btn-primary float-end" onClick={(e) => {
                    return handleMakePurchase(e)

                  }}>
                  Make Purchase <IconChevronRight className="i-va" />
                </Link>
                <Link to="/" className="btn btn-secondary">
                  <IconChevronLeft className="i-va" /> Continue shopping
                </Link>
              </div>
            </div>
            <div className="alert alert-success mt-3">
              <p className="m-0">
                <IconTruck className="i-va me-2" /> Delivery within 1-2 days
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <CouponApplyForm onSubmit={onSubmitApplyCouponCode} />
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <dl className="row border-bottom">
                  <dt className="col-6">Subtotal:</dt>
                  <dd className="col-6 text-end">${totalPrice.toFixed(2)}</dd>
                  <dt className="col-6 text-success">
                    Coupon:{" "}
                    <span className="small text-muted">{coupon.code}</span>{" "}
                  </dt>
                  <dd className="col-6 text-success text-end">-${coupon.value}</dd>
                </dl>
                <dl className="row">
                  <dt className="col-6">Total price:</dt>
                  <dd className="col-6 text-end  h6">
                    <strong>${(totalPrice - coupon.value).toFixed(2)}</strong>
                  </dd>
                </dl>
                <hr />
                <p className="text-center">
                  <img
                    src="../../images/payment/payments.webp"
                    alt="..."
                    height={26}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light border-top p-4">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
            We accept various payment methods and ensure the security of your payment information. Prices displayed are in the designated currency and may be subject to taxes and fees. Payment processing is prompt and handled securely.
          </p>
          <p>
            Refunds are available based on eligibility criteria outlined in the policy. Refund requests must be made within a specified timeframe. Approved refunds are processed through the original payment method. Please note that processing times for refunds may vary.
          </p>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </React.Fragment>
  );
};

export default CartView;