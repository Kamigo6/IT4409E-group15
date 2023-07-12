import React, { useEffect, useState } from "react";

import { ReactComponent as IconClock } from "bootstrap-icons/icons/clock.svg";
import { ReactComponent as IconBellFill } from "bootstrap-icons/icons/bell-fill.svg";
import { ReactComponent as IconCartCheckFill } from "bootstrap-icons/icons/cart-check-fill.svg";
import { ReactComponent as IconCartxFill } from "bootstrap-icons/icons/cart-x-fill.svg";
import { ReactComponent as IconCartDash } from "bootstrap-icons/icons/cart-dash-fill.svg";

const NotificationView = () => {
  const token = localStorage.getItem('token');
  const [notifications, setnotifications] = useState([]);
  const notTitle = {
    "orderPlaced": "Order Placed",
    "orderCancelled": "Order Cancelled",
    "orderPending": "Order Pending",
    "other": "Deal Alert"
  }
  const getNotifications = async () => {
    try {
      const response = await fetch('http://localhost:8000/customers/token', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const customerData = await response.json();
        setnotifications(customerData.notifications);
      } else {
        console.error('Failed to fetch customer information');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getNotifications();
    console.log(notifications);
  }, []);

  return (
    <div className="container mb-3">
      <h4 className="my-3">Notification</h4>

      <div className="list-group">
        {notifications.reverse().map((notification) => {
          switch (notification.type) {
            case "orderPlaced":
              return (
                <div className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between text-success">
                    <h5 className="mb-1">
                      <IconCartCheckFill className="i-va" /> {notTitle[notification.type]}!
                    </h5>
                    <span className="small text-muted">
                      <IconClock /> {notification.notifiedAt.substring(0, 10)}
                    </span>
                  </div>
                  <p className="mb-1">
                    {notification.content}
                  </p>
                </div>);
            case "orderCancelled":
              return (
                <div className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between text-danger">
                    <h5 className="mb-1">
                      <IconCartxFill className="i-va" /> {notTitle[notification.type]}!
                    </h5>
                    <span className="small text-muted">
                      <IconClock /> {notification.notifiedAt.substring(0, 10)}
                    </span>
                  </div>
                  <p className="mb-1">
                    {notification.content}
                  </p>
                </div>);
            case "orderPending":
              return (
                <div className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between text-warning">
                    <h5 className="mb-1">
                      <IconCartDash className="i-va" /> {notTitle[notification.type]}!
                    </h5>
                    <span className="small text-muted">
                      <IconClock /> {notification.notifiedAt.substring(0, 10)}
                    </span>
                  </div>
                  <p className="mb-1">
                    {notification.content}
                  </p>
                </div>);
            default:
              return (
                <div className="list-group-item list-group-item-action">
                  <div className="d-flex w-100 justify-content-between text-primary">
                    <h5 className="mb-1">
                      <IconBellFill className="i-va" /> {notTitle[notification.type]}!
                    </h5>
                    <span className="small text-muted">
                      <IconClock /> {notification.notifiedAt.substring(0, 10)}
                    </span>
                  </div>
                  <p className="mb-1">
                    {notification.content}
                  </p>
                </div>);
          }
        })}
      </div>
    </div>
  );
}

export default NotificationView;