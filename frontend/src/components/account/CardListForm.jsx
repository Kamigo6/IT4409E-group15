import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as IconCreditCard2FrontFill } from "bootstrap-icons/icons/credit-card-2-front-fill.svg";
import { ReactComponent as IconCreditCard } from "bootstrap-icons/icons/credit-card.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const CardListForm = ({ customer }) => {
  const [showForm, setShowForm] = useState(false);
  const [cardDataInput, setCardDataInput] = useState({
    cardNumber: "",
    nameOnCard: "",
    expirationMonth: "",
    expirationYear: "",
    CVV: "",
  });
  const [existingCards, setExistingCards] = useState(customer.paymentMethods);

  const handleAddCard = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDataInput((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCards = [...existingCards, cardDataInput];
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:8000/customers/${customer._id}`, { paymentMethods: updatedCards }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExistingCards(updatedCards);
      setShowForm(false);
      setCardDataInput({
        cardNumber: "",
        nameOnCard: "",
        expirationMonth: "",
        expirationYear: "",
        CVV: "",
      });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDeleteCard = async (index) => {
    const updatedCards = existingCards.filter((_, i) => i !== index);
    try {
      const token = localStorage.getItem("token");
      axios.patch(`http://localhost:8000/customers/${customer._id}`, { paymentMethods: updatedCards }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExistingCards(updatedCards);
      setCardDataInput({
        cardNumber: "",
        nameOnCard: "",
        expirationMonth: "",
        expirationYear: "",
        CVV: "",
      });
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="card border-success">
      <h6 className="card-header">
        <IconCreditCard2FrontFill className="text-success" /> Saved Card
        <button className="btn btn-sm btn-primary float-end" onClick={handleAddCard}>
          <FontAwesomeIcon icon={faPlus} className="text-light" />
        </button>
      </h6>
      <ul className="list-group list-group-flush">
        {showForm ? (
          <li className="list-group-item">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="cardNumber"
                  value={cardDataInput.cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Name on Card</label>
                <input
                  type="text"
                  className="form-control"
                  name="nameOnCard"
                  value={cardDataInput.nameOnCard}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Expiration Month</label>
                  <input
                    type="text"
                    className="form-control"
                    name="expirationMonth"
                    value={cardDataInput.expirationMonth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col">
                  <label className="form-label">Expiration Year</label>
                  <input
                    type="text"
                    className="form-control"
                    name="expirationYear"
                    value={cardDataInput.expirationYear}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  className="form-control"
                  name="CVV"
                  value={cardDataInput.CVV}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">Add Card</button>
            </form>
          </li>
        ) : null}
        {existingCards.length === 0 ? <p className="ms-3 mt-3">You haven't adding any card</p> : existingCards.map((card, index) => (
          <li key={index} className="list-group-item">
            <IconCreditCard /> {card.cardNumber}{" "}
            <button type="button" className="btn btn-sm btn-danger ms-3" onClick={() => handleDeleteCard(index)}>
              <IconTrash />
            </button>
          </li>
        )
        )}
      </ul>
    </div>
  );
};

export default CardListForm;
