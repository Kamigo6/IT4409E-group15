import React, { lazy, useEffect, useState, useSearchParams } from "react";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconCheckCircleFill } from "bootstrap-icons/icons/check-circle-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const RatingsReviews = ({ rating }) => {
  const [customer, setCustomer] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else if (!isDisliked) {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleDislikeClick = () => {
    if (isDisliked) {
      setDislikes(dislikes - 1);
      setIsDisliked(false);
    } else if (!isLiked) {
      setDislikes(dislikes + 1);
      setIsDisliked(true);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');

    const getCustomer = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/customers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const customer = response.data;
        setCustomer(customer);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getCustomer(rating.customerId);
    console.log(rating.customerId);
    setLikes(rating.likes);
    setDislikes(rating.dislikes)
  }, [])

  return (
    <div className="border-bottom mb-3">
      <div className="mb-2">
        <span>
          {Array.from({ length: rating.star }, (_, key) => (
            <IconStarFill className="text-warning me-1" key={key} />
          ))}
          {Array.from({ length: 5 - rating.star }, (_, key) => (
            <IconStarFill className="text-muted me-1" key={key} />
          ))}
        </span>
        <span className="text-muted">
          <IconCheckCircleFill className="text-success me-1" />
          {customer ? customer.username : "Undefined user"} | Reviewed on{" "}
          <i className="fw-bold">{new Date(rating.createdAt).toLocaleDateString()}</i>
        </span>
      </div>
      <p>
        {rating.content}
      </p>
      <div className="mb-2">
        <button className="btn btn-sm btn-outline-success me-2" onClick={handleLikeClick}>
          <FontAwesomeIcon icon={faThumbsUp} /> {likes}
        </button>
        <button className="btn btn-sm btn-outline-danger me-2" onClick={handleDislikeClick}>
          <FontAwesomeIcon icon={faThumbsDown} /> {dislikes}
        </button>
      </div>
    </div>

  );
};

export default RatingsReviews;
