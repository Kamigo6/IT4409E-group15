import React, { useState, useEffect, lazy } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { ReactComponent as IconCreditCard2Front } from "bootstrap-icons/icons/credit-card-2-front.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";

const CheckoutView = () => {
  let location = useLocation();
  const cart = location.state.cart;
  const customer = location.state.customer;
  const totalPrice = location.state.totalPrice;
  const coupon = location.state.coupon;
  console.log(coupon);
  const [order, setOrder] = useState({
    customerId: customer._id,
    products: cart.map((product, index) => ({
      productId: product.productId._id,
      quantity: product.quantity,
      key: index
    })),
    delivery: {
      name: customer.shippingInformation[0].firstName + " " + customer.shippingInformation[0].lastName,
      shippingAddress: {
        address: customer.shippingInformation[0].address,
        district: customer.shippingInformation[0].district,
        city: customer.shippingInformation[0].city
      },
      fee: 5.00
    },
    coupon: "",
    totalPrice: totalPrice - coupon.value + 5.00,
    status: "pending",
    createdDate: Date.now()
  });

  useEffect(() => {
    if (coupon && coupon.value !== 0) {
      const str = coupon._id.toString();
      setOrder(prevState => ({
        ...prevState,
        coupon: str
      }));
    } else {
      setOrder(prevState => ({
        ...prevState,
        coupon: null
      }));
    }
  }, []);
  const navigate = useNavigate();

  const handlePayment = async () => {

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:8000/orders/", order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


    } catch (error) {
      console.error("Error adding order:", error);

    }
    emptyCart();
    navigate("/"); // Navigate to the home page
  }
  const emptyCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.patch(`http://localhost:8000/customers/${customer._id}`, {
          cart: [], notifications: [...customer.notifications, {
            type: "orderPending",
            content: "Your Order is pending and waiting to be confirm!",
            notifiedAt: order.createdDate
          }]
        }, {
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
    const addNotification = async () => {

    }
  }
  return (
    <React.Fragment>
      <div className="border-top p-4 text-white mb-3" style={{ background: "DodgerBlue" }}>

        <h1 className="display-6"><b>Checkout</b></h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-header">
                <IconEnvelope className="i-va" /> Contact Info
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      aria-label="Email Address"
                      defaultValue={customer.email}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile no"
                      aria-label="Mobile no"
                      defaultValue={customer.mobileNumber}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-header">
                <IconTruck className="i-va" /> Shipping Infomation
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      defaultValue={order.delivery.name}
                      required
                      onChange={(e) => setOrder(prevState => ({
                        ...prevState,
                        delivery: {
                          ...prevState.delivery,
                          name: e.target.value
                        }
                      }))}
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Addresss"
                      defaultValue={order.delivery.shippingAddress.address}
                      onChange={(e) => setOrder(prevState => ({
                        ...prevState,
                        delivery: {
                          ...prevState.delivery,
                          shippingAddress: {
                            ...prevState.delivery.shippingAddress,
                            address: e.target.value
                          }

                        }
                      }))}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      defaultValue={order.delivery.shippingAddress.city}

                      onChange={(e) => setOrder(prevState => ({
                        ...prevState,
                        delivery: {
                          ...prevState.delivery,
                          shippingAddress: {
                            ...prevState.delivery.shippingAddress,
                            city: e.target.value
                          }
                        }
                      }))}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="District"
                      defaultValue={order.delivery.shippingAddress.district
                      }
                      onChange={(e) => setOrder(prevState => ({
                        ...prevState,
                        delivery: {
                          ...prevState.delivery,
                          shippingAddress: {
                            ...prevState.delivery.shippingAddress,
                            district: e.target.value
                          }
                        }
                      }))}
                      required
                    />
                  </div>

                </div>
              </div>
            </div>

            <div className="card mb-3 border-info">
              <div className="card-header bg-info">
                <IconCreditCard2Front className="i-va" /> Payment Method
              </div>
              <div className="card-body">

                <div className="mb-2">
                  Credit card support:
                  <img
                    src="../../images/payment/cards.webp"
                    alt="..."
                    className="ms-3"
                    height={26}
                  />
                </div>

                <StripeContainer
                  amount={order.totalPrice}
                  handlePayment={handlePayment}
                  cus_id={customer._id}
                />
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                <IconCart3 className="i-va" /> Cart{" "}
                <span className="badge bg-secondary float-end">{cart.length}</span>
              </div>
              <ul className="list-group list-group-flush">
                {cart.map((product) => {
                  return (
                    <li className="list-group-item d-flex justify-content-between lh-sm">
                      <div>
                        <h6 className="my-0">{product.productId.name}</h6>
                        <small className="text-muted">Quantity: {product.quantity}</small>
                      </div>
                      <span className="text-muted">${((product.productId.price - product.productId.discount.value) * product.quantity).toFixed(2)}</span>
                    </li>
                  )
                })}

                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">Shipping Fee</h6>
                  </div>
                  <span className="text-success">$5.00</span>
                </li>
                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">Coupon</h6>
                    <small>{coupon.code}</small>
                  </div>
                  <span className="text-success">−${coupon.value.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${(order.totalPrice).toFixed(2)}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CheckoutView;