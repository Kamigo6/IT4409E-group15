import React, { Component } from "react";
import { useLocation } from 'react-router-dom';
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { ReactComponent as IconReceipt } from "bootstrap-icons/icons/receipt.svg";
import { ReactComponent as IconCreditCard2Front } from "bootstrap-icons/icons/credit-card-2-front.svg";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";

const CheckoutView = () => {
  let location = useLocation();
  console.log(location.state);
  const cart = location.state.cart;
  const customer = location.state.customer;
  const totalPrice = location.state.totalPrice;
  const totalDiscount = location.state.totalDiscount;
  const coupon = location.state.coupon;
  return (
    <React.Fragment>
      <div className="border-top p-4 text-white mb-3" style={{ background: "DodgerBlue" }}>
        <h1 className="display-6">Checkout</h1>
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
                      defaultValue={customer.shippingInformation[0].firstName + " " + customer.shippingInformation[0].lastName}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Addresss"
                      defaultValue={customer.shippingInformation[0].address}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      defaultValue={customer.shippingInformation[0].city}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="District"
                      defaultValue={customer.shippingInformation[0].district}
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
                <div className="row g-3 mb-3 border-bottom">
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        id="credit"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        defaultChecked
                        required
                      />
                      <label className="form-check-label" htmlFor="credit">
                        Credit card
                        <img
                          src="../../images/payment/cards.webp"
                          alt="..."
                          className="ms-3"
                          height={26}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-check">
                      <input
                        id="paypal"
                        name="paymentMethod"
                        type="radio"
                        className="form-check-input"
                        required
                      />
                      <label className="form-check-label" htmlFor="paypal">
                        PayPal
                        <img
                          src="../../images/payment/paypal_64.webp"
                          alt="..."
                          className="ms-3"
                          height={26}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name on card"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Card number"
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Expiration month"
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Expiration year"
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="CVV"
                    />
                  </div>
                </div>
              </div>
              <div className="card-footer border-info d-grid">
                <button type="button" className="btn btn-info">
                  Pay Now <strong>${totalPrice}</strong>
                </button>
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
                    <h6 className="my-0">Total Discount</h6>
                  </div>
                  <span className="text-success">-${totalDiscount}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between bg-light">
                  <div className="text-success">
                    <h6 className="my-0">Coupon code</h6>
                    <small>EXAMPLECODE</small>
                  </div>
                  <span className="text-success">−${coupon.value}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${totalPrice - totalDiscount - coupon.value}</strong>
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
