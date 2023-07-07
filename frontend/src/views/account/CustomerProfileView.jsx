import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CustomerProfile.css';


const CustomerProfile = () => {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchCustomer = async () => {
      try {
        const response = await fetch('http://localhost:8000/customers/token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.ok) {
          const customerData = await response.json();
          setCustomer(customerData);
        } else {
          console.error('Failed to fetch customer information');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCustomer();
  }, []);

  if (!customer) {
    return <div>Loading...</div>;
  }

  const {
    username,
    isAdmin,
    firstName,
    lastName,
    avatarImageUrl,
    mobileNumber,
    email,
    birthday,
    location,
    shippingInformation,
    paymentMethods
  } = customer;

  return (
    <div className="container">
      <h3 className="mb-4">
      <br></br>
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-vcard" viewBox="0 0 16 16">
          <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z" />
          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z" />
        </svg>   Customer Profile
      </h3>
      <div className="row">
      <div className="col-md-4">
    <br />
    <img src={avatarImageUrl} alt="Avatar" className="avatar-img img-fluid rounded fit-image" />
</div>

        <div className="col-md-8">
          <form>
            <div className="form-group">
              <label className="username-label"><b>Username</b></label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-person-circle"></i>
                  </span>
                </div>
                <input type="text" value={username} className="form-control" readOnly />
              </div>
            </div>
            <div className="form-group">
              <label className="username-label"><b>Birthday</b></label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-calendar3"></i>
                  </span>
                </div>
                <input type="text" value={birthday} className="form-control" readOnly />
              </div>
            </div>
            <div className="form-group">
              <label className="username-label"><b>First Name</b></label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-person-fill"></i>
                  </span>
                </div>
                <input type="text" value={firstName} className="form-control" readOnly />
              </div>
            </div>
            <div className="form-group">
              <label className="username-label"><b>Last Name</b></label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-person-fill"></i>
                  </span>
                </div>
                <input type="text" value={lastName} className="form-control" readOnly />
              </div>
            </div>
            <div className="form-group">
              <label className="username-label"><b>Mobile Number</b></label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="bi bi-telephone-fill"></i>
                  </span>
                </div>
                <input type="text" value={mobileNumber} className="form-control" readOnly />
              </div>
            </div>
            <div className="form-group mb-4">
              <label className="username-label"><b>Email</b></label>
              <div className="input-group">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="bi bi-envelope-fill"></i>
                  </span>
                </div>
                <input type="text" value={email} className="form-control" readOnly />
              </div>
            </div>
            <div className="form-group d-flex justify-content-between">
              <Link to="/account/profile/edit" state={customer}>
                <button type="button" className="edit-profile-btn btn btn-secondary">
                  Edit Profile
                </button>
              </Link>
              {isAdmin && (
                <Link to="/admin" state={customer}>
                <button type="button" className="admin-panel-btn btn btn-danger">
                  Go to Administrator panel
                </button>
                </Link>
              )}
            </div>
          </form>
        </div>
      </div>
      <h3 className="mt-4 mb-4">
        <i className="bi bi-geo-alt-fill"></i> Location
      </h3>
      <div className="form-group">
        <label className="username-label"><b>Address</b></label>
        <div className="input-group">
          <div className="input-group-append">
            <span className="input-group-text">
              <i className="bi bi-house-fill"></i>
            </span>
          </div>
          <input type="text" value={location.address} className="form-control" readOnly />
        </div>
      </div>
      <div className="form-group">
        <label className="username-label"><b>District</b></label>
        <div className="input-group">
          <div className="input-group-append">
            <span className="input-group-text">
              <i className="bi bi-geo-fill"></i>
            </span>
          </div>
          <input type="text" value={location.district} className="form-control" readOnly />
        </div>
      </div>
      <div className="form-group">
        <label className="username-label"><b>City</b></label>
        <div className="input-group">
          <div className="input-group-append">
            <span className="input-group-text">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="25" fill="currentColor" class="bi bi-buildings-fill" viewBox="0 0 16 16">
                <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V.5ZM2 11h1v1H2v-1Zm2 0h1v1H4v-1Zm-1 2v1H2v-1h1Zm1 0h1v1H4v-1Zm9-10v1h-1V3h1ZM8 5h1v1H8V5Zm1 2v1H8V7h1ZM8 9h1v1H8V9Zm2 0h1v1h-1V9Zm-1 2v1H8v-1h1Zm1 0h1v1h-1v-1Zm3-2v1h-1V9h1Zm-1 2h1v1h-1v-1Zm-2-4h1v1h-1V7Zm3 0v1h-1V7h1Zm-2-2v1h-1V5h1Zm1 0h1v1h-1V5Z" />
              </svg>
            </span>
          </div>
          <input type="text" value={location.city} className="form-control" readOnly />
        </div>
      </div>
      {isAdmin && <h3 className="mt-4 mb-4">
        <i className="bi bi-truck"></i> Shipping Information
      </h3>}
      {isAdmin && <div className="section">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">Shipping</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>District</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {shippingInformation.map((info, index) => (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td>{info.firstName}</td>
                <td>{info.lastName}</td>
                <td>{info.address}</td>
                <td>{info.district}</td>
                <td>{info.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}

      {isAdmin && <h3 className="mt-4 mb-4">
        <i className="bi bi-credit-card"></i> Payment Methods
      </h3>}
      {isAdmin && <div className="section">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center">Payment Method</th>
              <th>Card Number</th>
              <th>Name on Card</th>
              <th>Expiration Month</th>
              <th>Expiration Year</th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.map((method, index) => (
              <tr key={index}>
                <td className="text-center">{index + 1}</td>
                <td>{method.cardNumber}</td>
                <td>{method.nameOnCard}</td>
                <td>{method.expirationMonth}</td>
                <td>{method.expirationYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}

    </div>
  );
};

export default CustomerProfile;
