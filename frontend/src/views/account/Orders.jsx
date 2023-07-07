import React, { lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
  faHistory,
  faTimesCircle,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";

const OrdersView = () => {
  const token = localStorage.getItem('token');
  const [customerId, setCustomerId] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getCustomer = async () => {
      try {
        const response = await axios.get('http://localhost:8000/customers/token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const customer = response.data;
        setCustomerId(customer._id);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getCustomer();

  }, [])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

        let ordersFetch = response.data.filter((order) => {
          return order.customerId == customerId;
        })
        setOrders(ordersFetch);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getOrders();
  }, [customerId])

  return (
    <div className="container mb-3">
      <h4 className="my-3">Orders</h4>
      <div className="w-75 mx-auto mb-2">
        {orders.reverse().map((order) => {
          return (
            <div className="card list-group m-4 border-secondary ">
              <div className="card-header border-secondary">
                <div className="small">
                  <span className="border bg-secondary rounded-left px-2 text-white">
                    Order ID
                  </span>
                  <span className="border bg-white rounded-right px-2 me-2">
                    {order._id}
                  </span>
                  <span className="border bg-secondary rounded-left px-2 text-white">
                    Date
                  </span>
                  <span className="border bg-white rounded-right px-2">
                    {order.createdDate.substring(0, 10)}
                  </span>
                </div>
              </div>
              <div className="card-body">
                {order.products.map((product, key) => {
                  return (
                    <div className="card row g-0 list-group-item m-2">
                      <div className="col-md-2 text-center m-1">
                        <img
                          src={product.productId.imageUrls[0]}
                          className="img-fluid"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-10">
                        <div className="card-body">
                          <h6>
                            <Link to={`/product/${product.productId._id}`} className="text-decoration-none">
                              {product.productId.name}
                            </Link>
                          </h6>
                          <div className="small">
                            <span className="text-muted me-2">Price:</span>
                            <span className="me-3">{`$${(product.productId.price - product.productId.discount.value).toFixed(2)}`}</span>
                            <del className="me-3 text-muted">{`$${product.productId.price.toFixed(2)}`}</del>
                            <span className="text-muted me-2">Quantity:</span>
                            <span className="me-3">{`${product.quantity}`}</span>
                          </div>
                          <div className="mt-2"></div>
                        </div>

                      </div>
                    </div>
                  );
                })}
                <div className="me-2">Shipping Fee: ${order.delivery.fee.toFixed(2)}</div>
                <div className="me-2">Coupon: -${order.coupon !== null ? order.coupon.value : 0}</div>
              </div>
              <div className="card-footer border-secondary d-flex justify-content-between">
                <div>
                  <span className="me-2">Status:</span>
                  {order.status == "completed" && (
                    <span className="text-success">
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="me-1"
                      />
                      Completed
                    </span>
                  )}
                  {order.status == "canceled" && (
                    <span className="text-danger">
                      <FontAwesomeIcon icon={faTimesCircle} className="me-1" />
                      Cancelled
                    </span>
                  )}
                  {order.status == "pending" && (
                    <span className="text-warning">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="me-1" />
                      Pending
                    </span>
                  )}
                </div>
                <div>
                  <span className="me-2">Total Price:</span>
                  <span className="me-2 text-success">${order.totalPrice.toFixed(2)}</span>
                </div>
                <div>
                  <span className="me-2">Invoice:</span>
                  <span className="text-success">
                    <Link to={`/invoice/${order._id}`}>
                      <FontAwesomeIcon
                        icon={faFileInvoice}
                        className="me-1"
                      />
                      Download
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

}

export default OrdersView;
