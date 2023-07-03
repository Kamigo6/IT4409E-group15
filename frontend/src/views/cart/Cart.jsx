import React, { useState, useEffect, lazy } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
const CouponApplyForm = lazy(() =>
  import("../../components/others/CouponApplyForm")
);

const CartView = () => {
  const [couponCode, setCouponCode] = useState("");
  const [customer, setCustomer] = useState(null);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);


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
      const totalPrice = calculateTotalPrice();
      setTotalPrice(totalPrice);
    } else {
      setTotalPrice(0);
    }
  }, [cartData]);


  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of cartData) {
      total += item.productId.price * item.quantity;
    }
    return total.toFixed(2);
  };

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


  const onSubmitApplyCouponCode = async (values) => {
    alert(JSON.stringify(values));
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
                          <var className="price">{(item.productId.price * item.quantity).toFixed(2)}</var>
                          <small className="d-block text-muted">
                            {item.productId.price} each
                          </small>
                        </td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-secondary me-2">
                            <IconHeartFill className="i-va" />
                          </button>
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
                <Link to="/checkout" className="btn btn-primary float-end">
                  Make Purchase <IconChevronRight className="i-va" />
                </Link>
                <Link to="/" className="btn btn-secondary">
                  <IconChevronLeft className="i-va" /> Continue shopping
                </Link>
              </div>
            </div>
            <div className="alert alert-success mt-3">
              <p className="m-0">
                <IconTruck className="i-va me-2" /> Free Delivery within 1-2 weeks
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
                  <dt className="col-6">Total:</dt>
                  <dd className="col-6 text-end">${totalPrice}</dd>

                  <dt className="col-6 text-success">Discount:</dt>
                  <dd className="col-6 text-success text-end">-$58</dd>
                  <dt className="col-6 text-success">
                    Coupon:{" "}
                    <span className="small text-muted">EXAMPLECODE</span>{" "}
                  </dt>
                  <dd className="col-6 text-success text-end">-$68</dd>
                </dl>
                <dl className="row">
                  <dt className="col-6">Total price:</dt>
                  <dd className="col-6 text-end  h6">
                    <strong>${totalPrice}</strong>
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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartView;
