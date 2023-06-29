import React, { useState } from "react";
import axios from "axios";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ShippingInformationForm = ({ customer }) => {
  const [showForm, setShowForm] = useState(false);
  const [shippingInfoInput, setShippingInfoInput] = useState({
    firstName: "",
    lastName: "",
    address: "",
    district: "",
    city: "",
  });
  const [shippingInformation, setShippingInformation] = useState(
    customer.shippingInformation
  );

  const handleAddShippingInfo = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfoInput((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedShippingInfo = [...shippingInformation, shippingInfoInput];
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:8000/customers/${customer._id}`,
        { shippingInformation: updatedShippingInfo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShippingInformation(updatedShippingInfo);
      setShowForm(false);
      setShippingInfoInput({
        firstName: "",
        lastName: "",
        address: "",
        district: "",
        city: "",
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDeleteShippingInfo = async (index) => {
    const updatedShippingInfo = shippingInformation.filter((_, i) => i !== index);
    try {
      const token = localStorage.getItem("token");
      axios.patch(
        `http://localhost:8000/customers/${customer._id}`,
        { shippingInformation: updatedShippingInfo },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShippingInformation(updatedShippingInfo);
      setShippingInfoInput({
        firstName: "",
        lastName: "",
        address: "",
        district: "",
        city: "",
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="card border-success">
      <h6 className="card-header">
        Shipping Information
        <button
          className="btn btn-sm btn-primary float-end"
          onClick={handleAddShippingInfo}
        >
          <FontAwesomeIcon icon={faPlus} className="text-light" />
        </button>
      </h6>
      <ul className="list-group list-group-flush">
        {showForm ? (
          <li className="list-group-item">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={shippingInfoInput.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={shippingInfoInput.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={shippingInfoInput.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">District</label>
                  <input
                    type="text"
                    className="form-control"
                    name="district"
                    value={shippingInfoInput.district}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={shippingInfoInput.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="submit-button">
                Add Shipping Info
              </button>
            </form>
          </li>
        ) : null}
        {shippingInformation.length === 0 ? (
          <p className="ms-3 mt-3">You haven't added any shipping information</p>
        ) : (
          shippingInformation.map((info, index) => (
            <li key={index} className="list-group-item">
              {info.firstName} {info.lastName}, {info.address}, {info.district},{" "}
              {info.city}
              <button
                type="button"
                className="btn btn-sm btn-danger ms-3"
                onClick={() => handleDeleteShippingInfo(index)}
              >
                <IconTrash />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ShippingInformationForm;
