/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { lazy, useEffect, useState, useSearchParams } from "react";
import { useParams } from "react-router-dom";
import withRouter from "../../components/withRouter";
import axios from 'axios';
import { ReactComponent as IconPrinter } from "bootstrap-icons/icons/printer.svg";
import { ReactComponent as IconDownload } from "bootstrap-icons/icons/download.svg";

const Invoice = () => {
  const token = localStorage.getItem('token');
  const [order, setOrder] = useState([]);
  const { id } = useParams();
  var originalPrice, coupon, shippingFee, totalPrice = 0;
  useEffect(() => {
    const getOrders = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        // console.log(response.data);
        let orderFetch = response.data;
        setOrder(orderFetch);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getOrders(id);
    // console.log(order);
  }, [])

  const computePrice = () => {
    totalPrice = order.totalPrice;
    coupon = 0;
    if (order.coupon !== null) coupon = order.coupon.value;
    originalPrice = totalPrice + coupon;
    shippingFee = order.delivery.fee;
  }

  return (
    <div className="container-fluid bg-secondary p-3">
      <div className="bg-white p-5">
        <div>
          <div className="row g-3 mb-3 pb-3 border-bottom">
            <div className="col-6">
              <img src="../../../images/logo.png" width="200"></img>
            </div>
            <div className="col-6 d-flex justify-content-end">
              <span className="display-4">Invoice</span>
            </div>
          </div>
          <div className="row mb-3 pb-3 border-bottom">
            <div className="col-6">
              <b className="me-1">Invoice Date:</b>{" "}
              {new Date(order.createdDate).toLocaleDateString()}
            </div>
            <div className="col-6 d-flex justify-content-end">
              <b className="me-1">Invoice No:</b> {order._id}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-6">
              <b className="border-bottom d-block">From</b>
              <address>
                <strong>HUST, Inc.</strong>
                <br />
                1 Dai Co Viet, Hai Ba Trung
                <br />
                Ha Noi, Viet Nam
                <br />
                <abbr title="Phone">P:</abbr> (123) 456-7890
              </address>
            </div>
            <div className="col-6 text-sm-end">
              <b className="border-bottom d-block">To</b>
              <address>
                <strong>{order.delivery && order.delivery.name}</strong>
                <br />
                {order.delivery && order.delivery.shippingAddress.address}
                <br />
                {order.delivery && `${order.delivery.shippingAddress.city}, ${order.delivery.shippingAddress.district}`}
              </address>
            </div>
          </div>
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead className="card-header">
                    <tr>
                      <td className="col-6">
                        <strong>Product</strong>
                      </td>
                      <td className="col-2 text-center">
                        <strong>Price</strong>
                      </td>
                      <td className="col-2 text-center">
                        <strong>QTY</strong>
                      </td>
                      <td className="col-2 text-end">
                        <strong>Amount</strong>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products && order.products.map((product) => {
                      return (
                        <tr>
                          <td className="col-6">{product.productId.name}</td>
                          <td className="col-2 text-center">${product.productId.price}</td>
                          <td className="col-2 text-center">{product.quantity}</td>
                          <td className="col-2 text-end">${product.productId.price * product.quantity}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot className="card-footer">
                    <tr>
                      <td colSpan="4" className="text-end">
                        <strong>Sub Total: </strong>
                        {order.delivery && computePrice()}
                        <div className="me-2">Original Price: </div>
                        <div className="me-2">Coupon: </div>
                      </td>

                      <td className="text-end">${totalPrice}
                        <div className="me-2">${originalPrice}</div>
                        <div className="me-2">-${coupon}</div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="4" className="text-end">
                        <strong>Tax:</strong>
                      </td>
                      <td className="text-end">${(totalPrice * 0.1).toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="4" className="text-end">
                        <strong>Shipping Fee:</strong>
                      </td>
                      <td className="text-end">${shippingFee}</td>
                    </tr>
                    <tr>
                      <td colSpan="4" className="text-end border-bottom-0">
                        <strong>Total:</strong>
                      </td>
                      <td className="text-end border-bottom-0">${(totalPrice * 1.1 + shippingFee).toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <p className="text-1">
              <strong>NOTE :</strong> This is computer generated receipt and
              does not require physical signature.
            </p>
            <div className="btn-group btn-group-sm d-print-none">
              <a
                // eslint-disable-next-line no-script-url
                href="javascript:window.print()"
                className="btn btn-light border text-black-50 shadow-none"
              >
                <IconPrinter /> Print
              </a>
              <a
                href="!#"
                className="btn btn-light border text-black-50 shadow-none"
              >
                <IconDownload /> Download
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Invoice);
