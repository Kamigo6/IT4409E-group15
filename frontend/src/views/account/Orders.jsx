import React, { Component } from "react";
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

class OrdersView extends Component {
  state = {
    cusID: "",
    orders: [],
    product: []
  };

  convertDate(dateStr) {

    const date = new Date(dateStr);

    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    console.log(formattedDate); // Output: "23/06/21"
  }
  constructor(props) {
    super(props);
    this.state.cusID = "6494069e4525816a3e4deb43";
    // console.log(this.state.cusID);
  }
  componentDidMount() {
    this.getOrders();
  }
  getOrders = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get("http://localhost:8000/orders",
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
      const orders = response.data.filter((order) => {
        return order.customerId == this.state.cusID;
      })
      console.log(orders);
      this.setState({ orders });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  render() {
    return (
      <div className="container mb-3">
        <h4 className="my-3">Orders</h4>
        <div className="w-75 mx-auto mb-2">
          {this.state.orders.map((order) => {
            return (
              <div className="card list-group">
                <div className="card-header">
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
                  {order.products.map((product) => {
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
                          <div className="card-header">
                            <div className="small">
                              <span className="border bg-secondary rounded-left px-2 text-white">
                                Product ID
                              </span>
                              <span className="border bg-white rounded-right px-2 me-2">
                                {product._id}
                              </span>
                            </div>
                          </div>
                          <div className="card-body">
                            <h6>
                              <Link to={`/product/${product.productId._id}`} className="text-decoration-none">
                                {product.productId.name}
                              </Link>
                            </h6>
                            <div className="small">
                              <span className="text-muted me-2">Price:</span>
                              <span className="me-3">{`$${product.productId.price}`}</span>

                            </div>
                            <div className="mt-2"></div>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="card-footer d-flex justify-content-between">
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
                  {/* <div>
                    <span className="me-2">Invoice:</span>
                    <span className="text-success">
                      <Link to="/invoice">
                        <FontAwesomeIcon
                          icon={faFileInvoice}
                          className="me-1"
                        />
                        Download
                      </Link>
                    </span>
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default OrdersView;
